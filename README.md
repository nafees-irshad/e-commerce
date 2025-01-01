# E-Commerce Backend

This project is a backend system for an e-commerce platform, developed using **JavaScript** with **Node.js** as the runtime environment. It uses **MySQL** as the database and **Sequelize ORM** for database operations. The application provides endpoints for managing users, products, carts, wishlists, and orders, with robust authentication and authorization mechanisms in place.

## Features

### Technology Stack
- **Language:** JavaScript
- **Framework:** Node.js
- **Database:** MySQL
- **ORM:** Sequelize

### Authentication
- Implements **JWT (JSON Web Token)** for user authentication and authorization.
- Admin-specific routes are secured with additional checks.

### Endpoints
#### 1. **User Endpoints**
- **Create User:** Allows a new user to sign up with essential details such as name, email, and password.
- **Update User:** Enables users to update their profile details.
- **Read User:** Retrieve user details, including their account information.
- **Delete User:** Allows users to delete their accounts.
- **Authentication:** Protected with JWT.

#### 2. **Products Endpoints**
- **Create Product:** Admins can add new products with attributes such as name, description, price, and category.
- **Update Product:** Admins can modify product details.
- **Read Product:** Retrieve product details, including filtering by categories and searching.
- **Delete Product:** Admins can remove products from the catalog.
- **Authorization:** Restricted to admins.

#### 3. **Cart Endpoints**
- **Create Cart:** Users can add products to their cart.
- **Update Cart:** Modify quantities or remove items from the cart.
- **Read Cart:** Retrieve the current cart details.
- **Delete Cart:** Clear all items from the cart.
- **Authentication:** Protected with JWT.

#### 4. **Wishlist Endpoints**
- **Create Wishlist:** Users can add products to their wishlist.
- **Update Wishlist:** Modify wishlist items or remove them.
- **Read Wishlist:** Retrieve wishlist details.
- **Delete Wishlist:** Clear all items from the wishlist.
- **Authentication:** Protected with JWT.

#### 5. **Order Endpoints**
- **Create Order:** Users can place orders based on their cart contents.
- **Update Order:** Admins can update the order status (e.g., pending, shipped, delivered).
- **Read Order:** Retrieve order details, including order history for a user.
- **Delete Order:** Admins can cancel or delete orders.
- **Authentication:** Protected with JWT for users and additional admin checks for sensitive actions.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/nafees-irshad/e-commerce.git
   ```
2. Navigate to the project directory:
   ```bash
   cd e-commerce
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the `.env` file with the required environment variables:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=ecommerce
   JWT_SECRET=your_jwt_secret
   ```
5. Run database migrations:
   ```bash
   npx sequelize db:migrate
   ```
6. Start the server:
   ```bash
   npm start
   ```

## Usage
- Use tools like **Postman** or **cURL** to test the API endpoints.
- Ensure the correct JWT token is included in the headers for authenticated routes.
- Admin-specific actions require an admin token.

## Folder Structure
```
|-- models/            # Sequelize models for database tables
|-- controllers/       # Logic for handling requests and responses
|-- routes/            # Route definitions for each entity
|-- middlewares/       # Authentication and authorization logic
|-- migrations/        # Sequelize migration files
|-- seeders/           # Database seed files
|-- config/            # Database configuration
|-- utils/             # Utility functions and helpers
|-- app.js             # Application entry point
```

## Future Improvements
- Implement payment gateway integration.
- Add real-time notifications for order status updates.
- Enhance product search with advanced filtering and sorting options.

## Contributions
Feel free to fork the repository and submit pull requests for improvements or bug fixes.

