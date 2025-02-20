const { test, expect } = require('@playwright/test');
const { generateUser } = require('../utils/test-data');

test.describe('Contact List Comprehensive API Tests', () => {
  // Test data storage
  let token;
  let userId;
  let contactIds = [];

  test.beforeAll(async ({ request }) => {
    // Register a new user for all tests
    const userData = {
      firstName: "Test",
      lastName: "User",
      email: `test.user.${Date.now()}@example.com`,
      password: "Test123!"
    };
    
    const response = await request.post('/users', {
      data: userData
    });
    
    const registrationData = await response.json();
    token = registrationData.token;
    userId = registrationData.user._id;
  });

  test('User Profile Management Flow', async ({ request }) => {
    // Update user profile
    const updatedUserData = {
      firstName: "Updated",
      lastName: "User",
      email: `updated.user.${Date.now()}@example.com`
    };

    const updateResponse = await request.patch('/users/me', {
      data: updatedUserData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const updatedUser = await updateResponse.json();
    expect(updateResponse.ok()).toBeTruthy();
    expect(updatedUser.firstName).toBe(updatedUserData.firstName);
    expect(updatedUser.lastName).toBe(updatedUserData.lastName);

    // Get user profile to verify changes
    const profileResponse = await request.get('/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const profile = await profileResponse.json();
    expect(profileResponse.ok()).toBeTruthy();
    expect(profile.firstName).toBe(updatedUserData.firstName);
  });

  test('Contact Management Workflow', async ({ request }) => {
    // Create multiple contacts
    const contacts = [
      {
        firstName: "Business",
        lastName: "Contact",
        email: "business@example.com",
        phone: "1234567890",
      },
      {
        firstName: "Family",
        lastName: "Member",
        email: "family@example.com",
        phone: "9876543210",
      }
    ];

    for (const contactData of contacts) {
      const createResponse = await request.post('/contacts', {
        data: contactData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      expect(createResponse.ok()).toBeTruthy();
      const contact = await createResponse.json();
      contactIds.push(contact._id);
    }

    // Get all contacts and verify count
    const listResponse = await request.get('/contacts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const contactsList = await listResponse.json();
    console.log(contactsList);
    expect(contactsList.length).toBeGreaterThanOrEqual(contacts.length);
  });

  test('Contact Information Update Flow', async ({ request }) => {
    // Update first contact with additional details
    const updatedContactData = {
      street1: "123 Business St",
      city: "Tech City",
      stateProvince: "TC",
      postalCode: "12345",
      country: "USA",
      birthdate: "1990-01-01"
    };

    const updateResponse = await request.patch(`/contacts/${contactIds[0]}`, {
      data: updatedContactData,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    expect(updateResponse.ok()).toBeTruthy();
    const updatedContact = await updateResponse.json();
    expect(updatedContact.city).toBe(updatedContactData.city);

    // Verify updated contact details
    const verifyResponse = await request.get(`/contacts/${contactIds[0]}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const verifiedContact = await verifyResponse.json();
    expect(verifiedContact.street1).toBe(updatedContactData.street1);
    expect(verifiedContact.postalCode).toBe(updatedContactData.postalCode);
  });

  test('Contact Organization and Cleanup Flow', async ({ request }) => {
    // Create a contact for deletion
    const tempContact = {
      firstName: "Temporary",
      lastName: "Contact",
      email: "temp@example.com",
      phone: "5555555555"
    };

    const createResponse = await request.post('/contacts', {
      data: tempContact,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const createdTempContact = await createResponse.json();

    // Delete the temporary contact
    const deleteResponse = await request.delete(`/contacts/${createdTempContact._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    expect(deleteResponse.ok()).toBeTruthy();

    // Verify contact list is updated
    const listResponse = await request.get('/contacts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const contactsList = await listResponse.json();
    const deletedContact = contactsList.find(c => c._id === createdTempContact._id);
    expect(deletedContact).toBeUndefined();
  });

  test('User Session Management Flow', async ({ request }) => {
    // Store the current user's email before logout
    const profileResponse = await request.get('/users/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    expect(profileResponse.ok()).toBeTruthy();
    const userProfile = await profileResponse.json();
    const userEmail = userProfile.email;

    // Perform logout
    const logoutResponse = await request.post('/users/logout', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    expect(logoutResponse.ok()).toBeTruthy();

    // Verify token invalidation by attempting to access contacts
    const verifyResponse = await request.get('/contacts', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    expect(verifyResponse.status()).toBe(401);

    // Login again using the stored email
    const loginData = {
        email: userEmail,
        password: "Test123!"
    };

    const loginResponse = await request.post('/users/login', {
        data: loginData
    });

    expect(loginResponse.ok()).toBeTruthy();
    const newSession = await loginResponse.json();
    expect(newSession.token).toBeDefined();

    });
});
