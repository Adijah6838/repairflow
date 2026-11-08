# RepairFlow - Smart Device Repair & Service Management Platform

RepairFlow is a modern, responsive SaaS application built to streamline device repair operations. It provides dedicated portals for Administrators, Technicians, and Customers, replacing outdated manual spreadsheets with an interactive dashboard experience.

## 🚀 Demo Credentials
To explore the different role-based interfaces, use the following demo accounts on the login screen:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@repairflow.test` | `demo123` |
| **Technician** | `technician@repairflow.test` | `demo123` |
| **Customer** | `customer@repairflow.test` | `demo123` |

*(Tip: The login screen also has quick-fill buttons for these accounts).*

## ✨ Key Features

- **Admin Dashboard**: Real-time analytics, revenue trends, device category breakdowns (via Recharts), and full CRUD management for repairs, technicians, and invoices.
- **Technician Workspace**: A drag-and-drop Kanban board (Received, Diagnosing, Repairing, Completed) with state persistence.
- **Customer Portal**: Submit new repair requests with full Zod validation, view repair history, and track real-time progress.
- **Repair Tracking**: An interactive 7-step visual timeline showing the live status of a device.
- **Payment Interface**: Generate printable A4 invoices and track paid/outstanding revenue.
- **Global UI**: Professional SaaS design, Light/Dark mode with LocalStorage persistence, responsive layout with a collapsible sidebar, and an interactive Notification Center.

## 💻 Tech Stack

- **Core**: React 19, TypeScript, Vite
- **State Management**: Zustand (with LocalStorage persistence)
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Forms & Validation**: React Hook Form, Zod
- **Icons**: Lucide React
- **Testing**: Vitest, React Testing Library

## 🛠️ Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Adijah6838/repairflow.git