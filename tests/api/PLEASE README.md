Dear Hiring Manager,

Since I am type of person that cannot leave half-heartedly some work and lack of time, I didnt wrote tests for api tests.
So I will try to describe what i would test if I had time.


## Individual Endpoint Test Cases

### Health Check and Basic Operations
1. `GET /api/health-check`
   - Expected: 200 OK
   - Validates system availability

2. `GET /api/users`
   - Expected: 200 OK
   - Verifies return of users array
   
3. `GET /api/users/{id}`
   - Expected: 200 OK with user data
   - Expected: 404 Not Found for invalid IDs

4. `POST /api/users`
   - Expected: 201 Created
   - Validates response structure and data persistence

5. `PUT /api/users/{id}`
   - Expected: 200 OK
   - Verifies successful data update

6. `DELETE /api/users/{id}`
   - Expected: 204 No Content
   - Confirms subsequent 404 Not Found

### Security and Error Handling
7. Authentication Protected Endpoints
   - Expected: 401 Unauthorized for missing tokens
   
8. Pagination Implementation
   - Validates default parameters
   - Tests page navigation functionality

9. Invalid Endpoint Access
   - Expected: 404 Not Found

10. Invalid Method Requests
    - Expected: 405 Method Not Allowed

11. Rate Limiting
    - Expected: 429 Too Many Requests after threshold


## User Flow Test Scenarios

### 1. Basic User Authentication Flow
```
POST /users → POST /login → POST /logout
```
Validates complete user registration and authentication cycle

### 2. User Registration with Contact Creation
```
POST /users → POST /login → POST /contacts → POST /logout
```
Tests user registration followed by contact management

### 3. Contact Management Flow
```
POST /login → POST /contacts → PUT /contacts
```
Verifies contact creation and update functionality

### 4. Contact Deletion Flow
```
POST /login → POST /contacts → DELETE /contacts
```
Ensures proper contact removal process

### 5. Complete User Journey
```
POST /users → POST /login → POST /contacts → PUT /contacts → POST /logout
```
