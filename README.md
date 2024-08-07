# Task Management System - RESTful APIs

This project provides a simple RESTful API for managing tasks, using Express.js and PostgreSQL. It includes endpoints for creating, retrieving, updating, and deleting tasks, as well as authentication using JWT tokens.

## Table of Contents

- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
  - [Obtain JWT Token](#obtain-jwt-token)
  - [Create a New Task](#create-a-new-task)
  - [Retrieve All Tasks](#retrieve-all-tasks)
  - [Retrieve a Task by ID](#retrieve-a-task-by-id)
  - [Update a Task](#update-a-task)
  - [Delete a Task](#delete-a-task)
- [Authentication](#authentication)
- [Setup Instructions](#setup-instructions)
  - [Running with Docker Compose](#running-with-docker-compose)
  - [Testing](#testing)
  - [Additional Setup](#additional-setup)

## Database Schema

### Tasks Table

- **ID**: `SERIAL` (Primary Key)
- **Title**: `VARCHAR` (String, up to 255 characters)
- **Description**: `TEXT` (Detailed description of the task)
- **Status**: `VARCHAR` (Sring, up to 20 and check value in Pending, In Progress, Completed)
- **Created_At**: `TIMESTAMP` (Date and time when the task was created)
- **Updated_At**: `TIMESTAMP` (Date and time when the task was last updated)

**Design Decisions**:
- **ID**: Using `SERIAL` for auto-incrementing primary key.
- **Status**: String is used for predefined status values to maintain data integrity.
- **Timestamps**: `Created_At` and `Updated_At` provide a history of task creation and modification.

## API Endpoints

**Note**: Postman APIs collection is also include in the repository with name `Task Management System-RESTful API.postman_collection.json`

### Obtain JWT Token

- **Endpoint**: `POST /auth/token`
- **Request Body**:
  ```json
  {}
  ```
- **Response**:
  - **Status Code**: `200 OK`
  - **Response Body**:
    ```json
    {
        "token": "jwt-token"
    }
    ```

### Create a New Task

- **Endpoint**: `POST /tasks`
- **Request Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "Pending"
  }
  ```
- **Response**:
  - **Status Code**: `201 Created`
  - **Response Body**:
    ```json
    {
      "success": true,
      "data": {
        "id": "id-of-the-task",
        "title": "Task Title",
        "description": "Task Description",
        "status": "Pending",
        "created_at": "2024-08-06T12:34:56Z",
        "updated_at": "2024-08-06T12:34:56Z"
      }
    }
    ```

### Retrieve All Tasks

- **Endpoint**: `GET /tasks`
- **Query Parameters**:
  - **page**: `integer` (Page number for pagination, starting from 1. Default is 1.)
  - **limit**: `integer` (Number of tasks per page. Default is 10.)
- **Example Request**:
  - `GET /tasks?page=1&limit=10`
- **Response**:
  - **Status Code**: `200 OK`
  - **Response Body**:
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "id-of-the-task",
          "title": "Task Title",
          "description": "Task Description",
          "status": "Pending",
          "created_at": "2024-08-06T12:34:56Z",
          "updated_at": "2024-08-06T12:34:56Z"
        }
      ],
      "totalCount": 50
    }
    ```
- **Notes**:
  - If `page` is set to 0 and `limit` is set to 0, the response will include all tasks without pagination.
  

### Retrieve a Task by ID

- **Endpoint**: `GET /tasks/:id`
- **Response**:
  - **Status Code**: `200 OK`
  - **Response Body**:
    ```json
    {
      "success": true,
      "data": {
        "id": "id-of-the-task",
        "title": "Task Title",
        "description": "Task Description",
        "status": "Pending",
        "created_at": "2024-08-06T12:34:56Z",
        "updated_at": "2024-08-06T12:34:56Z"
      }
    }
    ```

### Update a Task

- **Endpoint**: `PUT /tasks/:id`
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "status": "In Progress"
  }
  ```
- **Response**:
  - **Status Code**: `200 OK`
  - **Response Body**:
    ```json
    {
      "success": true,
      "data": {
        "id": "id-of-the-task",
        "title": "Updated Title",
        "description": "Updated Description",
        "status": "In Progress",
        "created_at": "2024-08-06T12:34:56Z",
        "updated_at": "2024-08-06T12:45:00Z"
      }
    }
    ```

### Delete a Task

- **Endpoint**: `DELETE /tasks/:id`
- **Response**:
  - **Status Code**: `204 No Content`

## Authentication

All endpoints except `/auth/token` require a JWT token. Include the token in the `Authorization` header as a Bearer token.

**Example Header**:
```
Authorization: Bearer <jwt-token>
```

## Error Response
**Example Response**:
```json
{
  "success": false,
  "message": "Error message here"
}
```

### Common Errors:

  - `400 Bad Request`: Invalid input data.
  - `401 Unauthorized`: Missing or invalid JWT token.
  - `404 Not Found`: Resource not found.
  - `500 Internal` Server Error: Server-side error.


## Setup Instructions

### Prerequisites
- Docker and Docker Compose installed
- Node.js and npm installed

### Environment Setup
1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Set up environment variables:** Create a .env file in the root directory with the following content:
    ```bash
    PORT=5000
    PG_PORT=5432
    PG_HOST=db  #if not using docker-compose then set 'localhost'
    PG_USER=postgres
    PG_PASSWORD=yourpassword
    PG_DATABASE=tasks_db
    JWT_SECRET=your_jwt_secret
    ```

### Running with Docker Compose

1. **Build and Run Containers**:
   ```bash
   docker-compose up --build
   ```

2. **Access the Application**:
   - The application will be available at `http://localhost:5000`.


### Running locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the Application**:
    ```bash
    npm start
    ```
   - The application will be available at `http://localhost:5000`.
   

### Testing

- **Setup**
  - Set `PG_HOST=localhost`
  - Build PostgreSQL docker image
    ```bash
    cd db
    docker build -t db .
    ```
  - RUn PostgreSQL container image
    ```bash
    docker run -d -p 5432:5432 db
    ```

1. **Run Tests**:
   ```bash
   npm test
   ```

2. **Ensure Tests are Passing**:
   - Verify that all tests pass to confirm the functionality of the API.

### Additional Setup

- **Database Configuration**:
  - Make sure the PostgreSQL database is configured properly.
  - If running app without docker for database then first run the init.sql file from the db folder.
  - Ensure the environment variables for database connection are set correctly.
