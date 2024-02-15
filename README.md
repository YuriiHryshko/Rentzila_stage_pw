## Summary of Repo

This repository contains automated tests using the Playwright.

[Tested website](https://stage.rentzila.com.ua/)

## Requirements

Before running the tests, you need to have the following software and dependencies installed:

- Node.js
- Allure Report

## Steps to Install
1. Clone this repository to your local machine:
    ```
    git clone https://github.com/YuriiHryshko/Rentzila_stage_pw.git
    ```
2. Navigate to the project folder:
    ```
    cd Rentzila_stage_pw
    ```
3. Install the required dependencies:
    ```
    npm install
    ```
4. Change name .env.example on .env and add variables

## Steps to Run Tests

Running all tests in headless mode:
```
npm run test:all
```
Running all tests in headed mode:
```
npm run test:all:headed
```
## Steps to Create the Report
1. Generate the Allure report:
    ```
    npm run report:create
    ```
2. Open the generated Allure report in the browser:
    ```
    npm run report:open
    ```