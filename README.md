
MERN Blogging Application - Backend
Welcome to the backend of our MERN (MongoDB, Express.js, React.js, Node.js) Blogging Application! This backend server is built using Express.js and Node.js, leveraging the power of MongoDB for data storage. We have integrated Zod for data validation to ensure the security and integrity of our application. The server will be hosted on port 5000.

Features
RESTful API: The backend provides a RESTful API for performing CRUD operations on blog posts and user data.
Zod Validation: Data received by the API endpoints is validated using Zod schemas to maintain data integrity.
MongoDB Integration: MongoDB is used as the database to store blog posts and user information.
Token-based Authentication: JWT (JSON Web Tokens) are used for user authentication and authorization.
Installation
To set up the backend server locally, follow these steps:

Clone the repository:
git clone https://github.com/ShubhamGupta24/BlogWebsite.git

Navigate to the project directory:
cd Backend

Install dependencies:
npm install

Set up environment variables:

Create a .env file in the root directory.
Add the following variables:
PORT=5000
MONGODB_URI=mongodb+srv://heyshubham24:Shubham2409@cluster0.cwjosgd.mongodb.net/BlogWebsite?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=BlogWebsiteJwtSecretKey

Start the server:
npm start

Technologies Used
Express.js: Backend framework for building RESTful APIs.
Node.js: JavaScript runtime environment for running server-side code.
MongoDB: NoSQL database used for storing blog posts and user data.
Zod: Library for data validation.
JWT (JSON Web Tokens): Used for user authentication and authorization.
Contributing
We welcome contributions from the community. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

License
This project is licensed under the MIT License.

Acknowledgements
Special thanks to the creators of Express.js, Node.js, MongoDB, Zod, and JWT for providing powerful tools for building robust backend systems.
Thanks to the open-source community for their invaluable contributions.

