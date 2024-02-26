# WEB2-FINAL

This Node.js project is designed to demonstrate the ability to build and deploy a full-stack web application. It includes user and item management functionalities, with a backend server, database models, and API routes for creating, reading, updating, and deleting (CRUD) data.

## Installation

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory and install the dependencies: npm i path multer nodemailer bcrypt body-parser mongoose express dotenv

## Registration Form

Access the registration form at http://localhost:3000/register.html . Fill out the required fields and submit the form.

## Login Form

Access the login form at http://localhost:3000/login.html . Enter your registered email and password to log in.

## API Keys:

Make sure to obtain API keys for the following services:

OpenWeatherMap API: OpenWeatherMap API

Environmental API: waqi.info

Financial API: exchangerate-api

## Configure Nodemailer

Add the following Nodemailer configuration to your server.js. For security reasons, use environment variables for sensitive information like email and password. 

To use Postman for sending GET, POST, PUT, and DELETE requests, follow these general steps for each type of request. These operations are commonly used to test APIs.

### 1. **GET Request**

To fetch data from the server:

1. Open Postman.
2. Enter the URL of the API endpoint you want to GET data from. For example, `http://localhost:3000/api/item` to get items.
3. Select the `GET` method from the dropdown next to the URL bar.
4. Press the `Send` button.
5. The response will be shown in the lower part of the window.

### 2. POST Request

To create a new item:

1. Change the method to `POST`.
2. Enter the URL for creating a new item, e.g., `http://localhost:3000/api/item`.
3. In the `Body` tab below the URL bar, select `form-data` for file uploads or `raw` and then JSON (application/json) if you're sending JSON data.
4. Enter the data you want to send. For `form-data`, you can add key-value pairs, selecting `File` for file fields, or `Text` for text fields. For JSON, type the JSON object directly into the editor.
5. Press `Send`.
6. You'll see the result in the response section below.

### 3. PUT Request

To update an existing item:

1. Change the method to `PUT`.
2. Enter the URL for updating an item, including the item's ID, e.g., `http://localhost:3000/api/item/`.
3. Set up the body similarly to the POST request, depending on whether you're sending form data or JSON.
4. Press `Send`.
5. Review the response to see the outcome of your update operation.

### 4. **DELETE Request**

To delete an existing item:

1. Change the method to `DELETE`.
2. Enter the URL for deleting an item, including the item's ID, e.g., `http://localhost:3000/api/item/`.
3. You typically don't need to send a body with DELETE requests.
4. Press `Send`.
5. Check the response to confirm the deletion.

