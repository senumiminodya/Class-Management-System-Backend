# 🏫 Class Management System - Backend

This is the backend of the Class Management System, providing a robust and scalable API to manage users, courses, assignments, and notifications.

## 🚀 Features

- 🔐 **Authentication & Authorization**: Secure user authentication with JWT.
- 👩‍🏫 **Role-Based Access Control**: Different access levels for students, teachers, and administrators.
- 📚 **Course Management**: Create, update, and delete courses.
- 📝 **Assignments**: Manage assignments, submissions, and grading.
- 📅 **Attendance Tracking**: Monitor student attendance with real-time updates.
- 🔔 **Notifications**: Send alerts and reminders to students and teachers.
- 📊 **Reports & Analytics**: Generate reports for student performance and attendance.

## 🛠️ Technologies Used

- **Framework**: 🏗️ Node.js with Express.js
- **Database**: 🛢️ MongoDB (Mongoose ORM)
- **Authentication**: 🔑 JWT (JSON Web Token) & Bcrypt
- **API Documentation**: 📜 Swagger
- **File Uploads**: 📂 Multer
- **Logging**: 📖 Winston

## 📥 Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/Class-Management-System-Backend.git
   cd Class-Management-System-Backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the required environment variables:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```

4. **Run the Server**:
   ```bash
   npm start
   ```
   - The API will be available at `http://localhost:5000`

## 📌 API Endpoints

| Method | Endpoint             | Description                      |
|--------|----------------------|----------------------------------|
| POST   | `/api/auth/register` | Register a new user             |
| POST   | `/api/auth/login`    | Login and receive a JWT token   |
| GET    | `/api/courses`       | Retrieve all courses            |
| POST   | `/api/courses`       | Create a new course (Admin)     |
| GET    | `/api/students`      | Get all students (Admin)        |
| POST   | `/api/assignments`   | Create an assignment (Teacher)  |
| GET    | `/api/reports`       | Generate performance reports    |

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
