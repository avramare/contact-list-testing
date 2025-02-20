# Contact List Application Test Automation

This repository contains automated tests for the Contact List application using Playwright with JavaScript. The framework includes both UI and API tests with a focus on smoke testing critical functionality.

## Prerequisites

- Node.js 16 or higher
- npm (Node Package Manager)
- Git

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd contact-list-tests
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run only smoke tests:
```bash
npm run test:smoke
```

### Run tests with UI mode:
```bash
npm run test:ui
```

### Run tests in specific browser:
```bash
npx playwright test --browser=chromium
npx playwright test --browser=firefox
npx playwright test --browser=webkit
```

## Test Reports

After running tests, you can find the HTML report in the `playwright-report` directory. Open `playwright-report/index.html` in your browser to view detailed test results.

## Smoke Test Suite

The smoke test suite covers the following critical functionality:

1. User Authentication:
   - User registration
   - User login
   - User logout

2. Contact Management:
   - Creating a new contact
   - Viewing contact details

3. API Health:
   - Contact creation via API
   - Contact retrieval via API

## Best Practices Implemented

1. Page Object Model structure for better maintainability
2. Test data generation using faker.js
3. Reusable authentication fixtures
4. Separate configurations for different environments
5. Comprehensive reporting
6. API and UI test separation
7. Clear test organization with smoke test tagging

## Contributing

1. Create a new branch for your changes
2. Make your changes and commit them
3. Push to your branch
4. Create a Pull Request
