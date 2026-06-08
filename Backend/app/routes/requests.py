from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload

from app.database.db import get_db
from app.models.request import Request, RequestStatus
from app.models.user import User, UserRole
from app.routes.auth import get_current_user
from app.schemas.request import (
    RequestAction,
    RequestAnalytics,
    RequestCreate,
    RequestListResponse,
    RequestResponse,
    RequestUpdate,
)

router = APIRouter(prefix="/requests", tags=["Requests"])


def require_roles(current_user: User, allowed_roles: list[UserRole]) -> None:
    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to perform this action",
        )


def get_request_or_404(db: Session, request_id: int) -> Request:
    request = (
        db.query(Request)
        .options(joinedload(Request.requester))
        .filter(Request.id == request_id)
        .first()
    )
    if request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Request not found",
        )
    return request


def ensure_request_access(request: Request, current_user: User) -> None:
    if current_user.role == UserRole.ADMIN:
        return

    if current_user.role == UserRole.MANAGER and request.status == RequestStatus.PENDING:
        return

    if current_user.role == UserRole.EMPLOYEE and request.requester_id == current_user.id:
        return

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="You do not have access to this request",
    )


def build_admin_analytics(db: Session) -> RequestAnalytics:
    total_requests = db.query(Request).count()
    pending_requests = db.query(Request).filter(Request.status == RequestStatus.PENDING).count()
    approved_requests = db.query(Request).filter(Request.status == RequestStatus.APPROVED).count()
    rejected_requests = db.query(Request).filter(Request.status == RequestStatus.REJECTED).count()

    return RequestAnalytics(
        total_requests=total_requests,
        pending_requests=pending_requests,
        approved_requests=approved_requests,
        rejected_requests=rejected_requests,
    )


@router.post("", response_model=RequestResponse, status_code=status.HTTP_201_CREATED)
def create_request(
    payload: RequestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_roles(current_user, [UserRole.EMPLOYEE])

    request = Request(
        title=payload.title,
        description=payload.description,
        request_type=payload.request_type,
        priority=payload.priority,
        requester_id=current_user.id,
    )
    db.add(request)
    db.commit()
    db.refresh(request)
    return get_request_or_404(db, request.id)


@router.get("", response_model=RequestListResponse)
def list_requests(
    include_analytics: bool = Query(default=False),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(Request).options(joinedload(Request.requester))

    analytics = None
    if current_user.role == UserRole.EMPLOYEE:
        query = query.filter(Request.requester_id == current_user.id)
    elif current_user.role == UserRole.MANAGER:
        query = query.filter(Request.status == RequestStatus.PENDING)
    elif current_user.role == UserRole.ADMIN and include_analytics:
        analytics = build_admin_analytics(db)

    items = query.order_by(Request.created_at.desc()).all()
    return RequestListResponse(items=items, analytics=analytics)


@router.get("/analytics", response_model=RequestAnalytics)
def request_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_roles(current_user, [UserRole.ADMIN])
    return build_admin_analytics(db)


@router.get("/{request_id}", response_model=RequestResponse)
def get_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    request = get_request_or_404(db, request_id)
    ensure_request_access(request, current_user)
    return request


@router.put("/{request_id}", response_model=RequestResponse)
def update_request(
    request_id: int,
    payload: RequestUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    request = get_request_or_404(db, request_id)

    if current_user.role == UserRole.ADMIN:
        pass
    elif current_user.role == UserRole.EMPLOYEE and request.requester_id == current_user.id:
        if request.status != RequestStatus.PENDING:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only pending requests can be updated",
            )
        if payload.status is not None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Employees cannot change request status directly",
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to update this request",
        )

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(request, field, value)

    db.commit()
    db.refresh(request)
    return get_request_or_404(db, request.id)


@router.delete("/{request_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    request = get_request_or_404(db, request_id)

    if current_user.role == UserRole.ADMIN:
        pass
    elif current_user.role == UserRole.EMPLOYEE and request.requester_id == current_user.id:
        if request.status != RequestStatus.PENDING:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only pending requests can be deleted",
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete this request",
        )

    db.delete(request)
    db.commit()


@router.post("/{request_id}/approve", response_model=RequestResponse)
def approve_request(
    request_id: int,
    payload: RequestAction,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_roles(current_user, [UserRole.MANAGER, UserRole.ADMIN])
    request = get_request_or_404(db, request_id)

    if request.status != RequestStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only pending requests can be approved",
        )

    request.status = RequestStatus.APPROVED
    db.commit()
    db.refresh(request)
    return get_request_or_404(db, request.id)


@router.post("/{request_id}/reject", response_model=RequestResponse)
def reject_request(
    request_id: int,
    payload: RequestAction,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_roles(current_user, [UserRole.MANAGER, UserRole.ADMIN])
    request = get_request_or_404(db, request_id)

    if request.status != RequestStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only pending requests can be rejected",
        )

    request.status = RequestStatus.REJECTED
    db.commit()
    db.refresh(request)
    return get_request_or_404(db, request.id)
