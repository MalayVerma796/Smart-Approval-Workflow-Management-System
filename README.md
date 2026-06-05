# Smart Approval Workflow Management System

## Overview

The Smart Approval Workflow Management System is a full-stack enterprise web application designed to automate and streamline organizational approval processes. The platform enables employees to submit requests, managers to review and approve them, and administrators to monitor workflows through a centralized dashboard.

Built using React, FastAPI, and Oracle Database, the system provides secure role-based access control, request tracking, approval management, notifications, and analytics.


---

## Problem Statement

Many organizations still rely on emails, spreadsheets, and manual paperwork for approval processes such as:

- Purchase Requests
- Asset Requests
- Travel Requests
- Leave Applications
- Reimbursements

These traditional methods often result in:

- Delayed approvals
- Lack of transparency
- Difficulty tracking request status
- Poor reporting and analytics
- Inefficient communication

The Smart Approval Workflow Management System addresses these challenges by digitizing the complete approval lifecycle.

---

## Key Features

### Employee Portal

- Secure Login
- Create New Requests
- Upload Supporting Documents
- View Request History
- Track Approval Status
- Receive Notifications

### Manager Portal

- Review Pending Requests
- Approve or Reject Requests
- Add Approval Comments
- View Team Requests
- Monitor Approval History

### Admin Portal

- Manage Users and Roles
- Configure Approval Workflows
- View Analytics Dashboard
- Monitor System Activity
- Generate Reports

---

## Workflow Process

```text
Employee
   │
   ▼
Submit Request
   │
   ▼
Manager Review
   │
 ┌─┴─┐
 │   │
 ▼   ▼
Approve Reject
 │
 ▼
Final Approval
 │
 ▼
Completed
```

---

## System Modules

### Authentication & Authorization

- JWT-based Authentication
- Role-Based Access Control (RBAC)
- Secure Password Hashing

### Request Management

- Create Requests
- Edit Requests
- View Request History
- Upload Attachments
- Status Tracking

### Approval Engine

- Multi-Level Approval Workflow
- Approval Comments
- Request Escalation
- Approval Timeline

### Notification System

- Request Submission Alerts
- Approval Notifications
- Rejection Notifications
- Pending Approval Reminders

### Analytics Dashboard

- Total Requests
- Pending Requests
- Approved Requests
- Rejected Requests
- Approval Rate
- Department-wise Statistics

---

## Technology Stack

### Frontend

- React.js
- Tailwind CSS
- React Router
- Axios
- Recharts

### Backend

- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication

### Database

- Oracle Database

### Tools

- Git
- GitHub
- VS Code
- Postman

---

## Project Architecture

```text
Frontend (React)
       │
       ▼
REST API (FastAPI)
       │
       ▼
Business Logic Layer
       │
       ▼
Oracle Database
```

---

## Folder Structure

```text
Smart-Approval-Workflow-Management-System/
│
├── frontend/
│
├── backend/
│
├── docs/
│
└── README.md
```

---

## Future Enhancements

- Drag-and-Drop Workflow Builder
- Email Notifications
- PDF Report Generation
- Audit Logs
- Mobile Application
- AI-Based Request Summarization
- Approval Time Prediction
- Single Sign-On (SSO)

---

## Learning Outcomes

This project demonstrates:

- Full-Stack Web Development
- Oracle Database Integration
- REST API Development
- Authentication & Authorization
- Workflow Automation
- Database Design
- Dashboard Development
- Enterprise Application Architecture

---

## Installation

### Clone Repository

```bash
git clone https://github.com/<your-username>/Smart-Approval-Workflow-Management-System.git
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## Author

**Malay Verma**

B.Tech Computer Science Engineering  
SRM Institute of Science and Technology

---

## License

This project is developed for educational, internship, and enterprise workflow automation purposes.