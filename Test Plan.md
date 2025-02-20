### Test Plan for Contact List Application  
**Application URL:** https://thinking-tester-contact-list.herokuapp.com/  

---

#### **1. Introduction**  
This test plan outlines the strategy to validate the functionality, usability, and reliability of the Contact List web application. The focus is on ensuring all core features work as expected for end-users.

---

#### **2. Objectives**  
- Verify user registration, login, and logout functionality.  
- Validate CRUD (Create, Read, Update, Delete) operations for contacts.  
- Ensure UI responsiveness and intuitive navigation.  
- Confirm proper error handling and validation.  

---

#### **3. Scope**  
**In-Scope:**  
- User authentication (signup, login, logout).  
- Contact management (add, view, edit, delete).  
- Field validations and error messages.  
- UI navigation and responsiveness.  

**Out-of-Scope:**  
- Performance/load testing.  
- Cross-browser/device compatibility (unless specified). 

---

#### **4. Test Approach**  
- **Manual Testing:** Execute functional test cases for UI and user workflows.  
- **API Testing:** Use Postman to validate backend endpoints.  
- **Tools:** Browser DevTools for debugging, Postman, Playwright(JavaScript)   

---

#### **5. Test Data**  
- **Valid User:** Email: `test@example.com`, Password: `Password123!`  
- **Invalid Emails:** `test@`, `test.com`  
- **Sample Contact:**  
  ```  
  First Name: John  
  Last Name: Doe  
  Email: johndoe@test.com  
  Phone: +123-456-7890  
  ```

---

#### **7. Risks & Mitigations**  
- **Risk:** Heroku server downtime during testing.  
  **Mitigation:** Schedule tests during stable hours.  
- **Risk:** Unclear requirements (e.g., password rules).  
  **Mitigation:** Document assumptions and seek clarifications.  

---

#### **8. Deliverables**  
- Test cases/results in Excel/TestRail.  
- Defect report with severity (e.g., login failure = Critical).  
- Final summary report.  

---