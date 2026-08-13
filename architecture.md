# Salesforce CRUD Application - Architecture

## 1. Overview

This project is a web application that allows users to perform CRUD
(Create, Read, Update, Delete) operations on Salesforce standard objects
without using the native Salesforce interface.

The supported Salesforce objects are:

- Account
- Contact
- Lead
- Opportunity
- Case

The application uses React for the frontend, Node.js and Express for
the backend, and Salesforce REST API for data operations.

Authentication is handled using OAuth 2.0 through a Salesforce External
Client App.

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Build Tool | Vite |
| Backend | Node.js |
| Backend Framework | Express.js |
| HTTP Client | Axios |
| Authentication | OAuth 2.0 |
| Salesforce Integration | Salesforce REST API |
| Database | Salesforce |
| Version Control | Git / GitHub |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

---

## 3. High-Level Architecture

```text
                         ┌──────────────────────┐
                         │        User          │
                         └──────────┬───────────┘
                                    │
                                    │ HTTPS
                                    ▼
                         ┌──────────────────────┐
                         │    React Frontend    │
                         │      + Vite          │
                         │                      │
                         │ - Login              │
                         │ - Object Dropdown    │
                         │ - Record Table       │
                         │ - Create Form        │
                         │ - Edit Form          │
                         │ - View Modal         │
                         │ - Delete             │
                         │ - Infinite Scroll    │
                         └──────────┬───────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌──────────────────────┐
                         │   Node.js Backend    │
                         │      Express         │
                         │                      │
                         │ - OAuth Handler      │
                         │ - CRUD Routes        │
                         │ - Validation         │
                         │ - Salesforce Client  │
                         └──────────┬───────────┘
                                    │
                         OAuth 2.0  │ Access Token
                                    │
                                    ▼
                    ┌─────────────────────────────┐
                    │          Salesforce         │
                    │                             │
                    │  External Client App        │
                    │           │                 │
                    │           ▼                 │
                    │     Salesforce REST API     │
                    │           │                 │
                    │     ┌─────┴─────┐           │
                    │     │           │           │
                    │  Account    Contact         │
                    │  Lead       Opportunity     │
                    │  Case                       │
                    └─────────────────────────────┘
