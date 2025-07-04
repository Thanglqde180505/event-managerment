# Event Management System

## Project Structure
```
event_management
├── models
│   ├── userModel.js
│   ├── eventModel.js
│   └── registrationModel.js
├── controllers
│   ├── authController.js
│   ├── eventController.js
│   └── registrationController.js
├── routes
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   └── registrationRoutes.js
├── views
│   ├── login.ejs
│   ├── cancelRegistration.ejs
│   ├── index.ejs
│   ├── listRegistration.ejs
│   └── registerEvent.ejs
├── config
│   ├── db.js
├── package.json
└── .env
├── README.md
└── app.js
```

## Features
- User authentication and role-based access control
- Admin functionalities for managing event registration viewing and searching the list
- Student functionalities for register or unregister for events

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd project_name
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the application:
   ```
   npm start
   ```
5. Set up .env file:
example for .env:
```
MONGODB_URI=mongodb://localhost:27017/event_management
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

## Usage
- Start the application: npm start
- Direct to: http://localhost:3000/
- Press login or Access the login page at: http://localhost:3000/auth/login to authenticate users.
- Students can register events through the `/register/place` page.
- Students can unregister events through the `/register/cancel` page
- Admins can manage event registration through their respective interfaces at `register` page


## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.