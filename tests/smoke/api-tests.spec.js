const { test, expect } = require('@playwright/test');

test.describe('API Smoke Tests @smoke', () => {
  let token;
  let userEmail;

  test('should register a new user successfully', async ({ request }) => {
    const userData = {
      firstName: "Test",
      lastName: "User",
      email: `test${Date.now()}@example.com`,
      password: "Test123!"
    };
    
    const response = await request.post('/users', {
      data: userData
    });
    
    expect(response.ok()).toBeTruthy();
    const registrationData = await response.json();
    expect(registrationData.token).toBeDefined();
    expect(registrationData.user.email).toBe(userData.email);
    
    userEmail = userData.email;
  });

  test('should login user successfully', async ({ request }) => {
    const loginData = {
      email: userEmail,
      password: "Test123!"
    };
    
    const response = await request.post('/users/login', {
      data: loginData
    });
    
    expect(response.ok()).toBeTruthy();
    const loginResponse = await response.json();
    console.log(loginResponse);
    expect(loginResponse.token).toBeDefined();
    
    token = loginResponse.token;
  });

  test('should create a new contact', async ({ request }) => {
    const contactData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "1234567890"
    };
    
    const response = await request.post('/contacts', {
      data: contactData,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    expect(response.ok()).toBeTruthy();
    const contact = await response.json();
    console.log(contact);
    expect(contact.firstName).toBe(contactData.firstName);
    expect(contact.email).toBe(contactData.email);
  });

  test('should retrieve all contacts', async ({ request }) => {
    const response = await request.get('/contacts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    expect(response.ok()).toBeTruthy();
    const contacts = await response.json();
    console.log(contacts);
    expect(Array.isArray(contacts)).toBeTruthy();
    expect(contacts.length).toBeGreaterThan(0);
  });

  test('should logout user successfully', async ({ request }) => {
    const response = await request.post('/users/logout', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    expect(response.ok()).toBeTruthy();
    console.log(response);

    // Verify logout by attempting to access contacts
    const verifyResponse = await request.get('/contacts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    expect(verifyResponse.status()).toBe(401);
  });
});