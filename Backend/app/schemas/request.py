from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field

from app.models.request import RequestPriority, RequestStatus
from app.schemas.user import UserResponse


class RequestBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=150)
    description: str = Field(..., min_length=10)
    request_type: str = Field(..., min_length=2, max_length=100)
    priority: RequestPriority = RequestPriority.MEDIUM


class RequestCreate(RequestBase):
    pass


class RequestUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=150)
    description: Optional[str] = Field(None, min_length=10)
    request_type: Optional[str] = Field(None, min_length=2, max_length=100)
    priority: Optional[RequestPriority] = None
    status: Optional[RequestStatus] = None


class RequestResponse(RequestBase):
    id: int
    status: RequestStatus
    created_at: datetime
    updated_at: datetime
    requester_id: int
    requester: UserResponse

    model_config = ConfigDict(from_attributes=True)


class RequestAction(BaseModel):
    message: Optional[str] = Field(default=None, max_length=500)


class RequestAnalytics(BaseModel):
    total_requests: int
    pending_requests: int
    approved_requests: int
    rejected_requests: int


class RequestListResponse(BaseModel):
    items: List[RequestResponse]
    analytics: Optional[RequestAnalytics] = None
