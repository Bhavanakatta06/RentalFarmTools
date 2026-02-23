# Rental Farm Tools

A full-stack web application for renting and managing agricultural equipment.  
Built with **React (TypeScript, Vite, TailwindCSS)** on the frontend and **Spring Boot (Java)** on the backend, with **MySQL** for persistence.

## 🚀 Features
- 🔐 User authentication with JWT
- 📋 Add, edit, delete, and browse tools
- 🖼️ Image upload support
- 📊 Dashboard for owners
- 🔎 Search and filter tools by category, condition, and price
- 📱 Responsive UI with TailwindCSS

## 🛠️ Tech Stack
**Frontend**
- React + TypeScript
- Vite
- TailwindCSS
- Axios (API calls)
- React Router

**Backend**
- Spring Boot
- Spring Security (JWT authentication)
- JPA/Hibernate
- MySQL

## ⚙️ Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/Bhavanakatta06/RentalFarmTools.git
cd RentalFarmTools
```
2. Backend Setup
```bash
cd backend
```
Configure application.properties:
```
spring.datasource.url=jdbc:mysql://localhost:3306/rentalfarmtools
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
jwt.secret=your_secret_key
```
Run the backend:
```
mvn spring-boot:run
```
3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
Frontend will start at http://localhost:5173.
```

📂 Project Structure
Code
RentalFarmTools/
│
├── backend/        # Spring Boot backend
│   ├── src/main/java/... 
│   └── src/main/resources/application.properties
│
├── frontend/       # React + Vite frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md


🧪 Development Notes
Tools are cached in context but fetched from backend if not available.
JWT authentication ensures secure access to protected routes.
Owner-only actions (edit/delete) are restricted via backend + frontend checks.

📌 Next Steps
Add CI/CD pipeline (GitHub Actions → AWS).
Deploy backend to AWS EC2.
Deploy frontend to AWS Amplify or S3 + CloudFront.

👩‍💻 Author
Bhavana Katta  
Final-year B.Tech in Computer Science Engineering
Passionate about building robust full-stack applications 
