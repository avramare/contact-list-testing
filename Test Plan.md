# Contact List Application Test Plan

## 1. UI Test Cases

### Authentication Flow
1. User Registration
   - Navigate to signup page
   - Fill in required fields (firstName, lastName, email, password)
   - Submit form and verify successful registration
   - Verify redirect to contacts page

2. User Login
   - Navigate to login page
   - Enter credentials
   - Submit form and verify successful login
   - Verify redirect to contacts page

3. User Logout
   - Click logout button
   - Verify redirect to login page
   - Verify session termination

### Contact Management Flow
1. Add New Contact
   - Click "Add a New Contact" button
   - Fill in contact details (firstName, lastName, email, phone)
   - Submit form and verify contact appears in list
   - Verify all entered data is displayed correctly

2. Update Existing Contact
   - Click on existing contact
   - Modify contact details
   - Save changes and verify updates are reflected
   - Verify contact list is updated

3. Delete Contact
   - Select contact to delete
   - Click delete button
   - Confirm deletion
   - Verify contact is removed from list

## 2. API Test Cases

### Authentication Endpoints
1. POST /users
   - Register new user with valid data
   - Verify JWT token is returned
   - Verify user data is stored correctly

2. POST /users/login
   - Login with valid credentials
   - Verify JWT token is returned
   - Verify session is created

3. POST /users/logout
   - Send logout request with valid token
   - Verify session is terminated
   - Verify token is invalidated

### Contact Endpoints
1. POST /contacts
   - Create new contact with valid data
   - Verify contact is created
   - Verify response contains correct contact data

2. GET /contacts
   - Retrieve all contacts
   - Verify response format
   - Verify contact count matches expected

3. GET /contacts/:id
   - Retrieve specific contact
   - Verify contact data matches expected

4. PUT /contacts/:id
   - Update contact with valid data
   - Verify changes are persisted
   - Verify response reflects updates

5. DELETE /contacts/:id
   - Delete existing contact
   - Verify contact is removed
   - Verify response status

## 3. Smoke Test Cases

### UI Smoke Test
1. User Registration
2. User Login
3. Add New Contact
4. View Contact Details
5. Logout

### API Smoke Test
1. User Registration (POST /users)
2. User Login (POST /users/login)
3. Create Contact (POST /contacts)
4. Get All Contacts (GET /contacts)
5. Logout (POST /users/logout)

## 4. Positive & Negative Test Cases

### Positive Test Cases
1. Register with valid user data
2. Login with correct credentials
3. Create contact with valid information
4. Update contact with valid data
5. Delete existing contact

### Negative Test Cases
1. Register with invalid email format
2. Login with incorrect password
3. Create contact with missing required fields
4. Update contact with invalid phone number
5. Delete non-existent contact
6. Access protected endpoints without authentication
7. Submit forms with special characters
8. Submit forms with extremely long input
9. Submit forms with SQL injection attempts
10. Submit requests with invalid JWT tokens

## 5. Known Bugs

1. Input Validation Issue
   - Description: Email validation allows invalid formats
   - Steps to reproduce:
     1. Navigate to Add Contact form
     2. Enter invalid email format (e.g., "test@test")
     3. Submit form
   - Expected: Form should reject invalid email format
   - Actual: Form accepts invalid email format

2. Authorization Bypass
   - Description: API endpoints accessible without proper token expiration check
   - Steps to reproduce:
     1. Login to get valid token
     2. Logout
     3. Use old token to make API requests
   - Expected: Requests should be rejected
   - Actual: Some requests still processed with expired token
