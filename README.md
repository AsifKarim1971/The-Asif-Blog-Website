# Web322 Assignment

Student Name: Md Asif Karim

Student Number: 116316233

Student Email: makarim5@myseneca.ca

Date Created: 2024-09-19

---

GITHUB URL: https://github.com/AsifKarim1971/web322_assignment

VERCEL URL: https://web322-assignment-ivory.vercel.app/

https://web322-assignment-git-main-md-asif-karims-projects-662fec7a.vercel.app/

https://web322-assignment-jd28uu68b-md-asif-karims-projects-662fec7a.vercel.app/

---

### Technology Stack

**Frontend**: html, css, javaScript
**Backend**: Node.js, Express.js, multer
**Database**: claudinary, postgreSQL, neon.tech

### steps to use the app

First, download the file from the git repository.

Second, install the necessary dependancies 
        `npm install npm install express multer cloudinary streamifier ejs express-ejs-layout`
        `npm install pg dotenv`

Third, to start the server type 
        `node index.js`

Fourth, now open your browser and visit 
        `localhost:4000`

### Notes

By submitting this as my assignment, I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this assignment has been copied manually or electronically from any other source (including web sites) or distributed to other students.


Setup Instructions

Clone the repository:

git clone [repository URL]

Install dependencies:

npm install

Configure environment variables:
Create a .env file in the root directory and include the following:

PGHOST='************'

PGDATABASE='********'

PGUSER='**********'

PGPASSWORD='*******'

PGPORT='5432'


Neon.tech Integration

This project uses Neon.tech for hosting the PostgreSQL database.

Steps to Configure Database Credentials

Sign up or log in to Neon.tech

Create a new project to host your PostgreSQL database.

Obtain the Database Connection String

Navigate to your project on Neon.tech.

Locate the connection string in the project settings (usually in the format postgresql://...).

Update the .env File

Add the connection string to your .env file:

DATABASE_URL=postgresql://username:password@hostname:port/database_name

Test the Connection

Run the server to verify the database connection:

node index.js
