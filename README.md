# REMS - Product Management System

A full-stack product management application built with Node.js/Express backend and React frontend.

## Features

### Core Features
- ✅ REST API with Express.js and MongoDB
- ✅ CRUD operations for products
- ✅ React frontend with Material UI
- ✅ Product list with edit and delete functionality

### Bonus Features
- ✅ **WebSocket (Socket.io)**: Real-time updates across clients
- ✅ **JWT Authentication**: Secure user registration and login
- ✅ **Redux**: State management with Redux Toolkit
- ✅ **ESLint**: Code quality with Airbnb style guide

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (with native driver v3.7)
- Socket.io
- JSON Web Tokens (JWT)
- bcryptjs

### Frontend
- React 18
- Material UI (MUI)
- Redux Toolkit
- React Router
- Socket.io Client
- Axios

## Project Structure

```
.
├── server/              # Backend API
│   ├── src/
│   │   ├── config/     # Database configuration
│   │   ├── middleware/ # JWT authentication middleware
│   │   ├── models/     # (Future: Mongoose models)
│   │   ├── routes/     # API routes
│   │   └── utils/      # Utility functions (seed data)
│   ├── .eslintrc.json
│   ├── .env.example
│   └── package.json
│
└── client/             # React frontend
    ├── src/
    │   ├── components/ # Reusable components
    │   ├── pages/      # Page components
    │   ├── redux/      # Redux store and slices
    │   ├── services/   # API and Socket services
    │   └── App.js
    ├── .eslintrc.json
    └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd REMS
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/rems-db
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### 3. Setup Frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory (optional):

```env
REACT_APP_API_URL=http://localhost:5001/api
REACT_APP_SOCKET_URL=http://localhost:5001
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS (with Homebrew)
brew services start mongodb/brew/mongodb-community@6.0

# Linux (systemd)
sudo systemctl start mongod

# Or run manually
mongod --dbpath /path/to/your/data/directory
```

## Running the Application

### Start Backend (Terminal 1)

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5001`

### Start Frontend (Terminal 2)

```bash
cd client
npm start
```

The React app will start on `http://localhost:3000`

## Usage

### Initial Setup

1. Navigate to `http://localhost:3000`
2. You'll be redirected to the login page
3. Click "Register here" to create a new account
4. After registration, you'll be automatically logged in

### Managing Products

- **View Products**: The main page displays all products in a table
- **Add Product**: Click the "Add Product" button to create a new product
- **Edit Product**: Click the edit icon (pencil) on any product row
- **Delete Product**: Click the delete icon (trash) on any product row
- **Real-time Updates**: Changes made in one browser window will automatically appear in other windows (via WebSocket)

### Default Products

The database is seeded with 4 sample products on first run:

| ID | Name | Type | Price | Rating | Warranty | Available |
|----|------|------|-------|--------|----------|-----------|
| 1  | AC1 Phone1 | phone | 200.05 | 3.8 | 1 year | Yes |
| 2  | AC2 Phone2 | phone | 147.21 | 1.0 | 3 years | No |
| 3  | AC3 Phone3 | phone | 150.00 | 2.0 | 1 year | Yes |
| 4  | AC4 Phone4 | phone | 50.20 | 3.0 | 2 years | Yes |

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Health Check

- `GET /api/health` - Server health check

## WebSocket Events

- `productCreated` - Emitted when a new product is created
- `productUpdated` - Emitted when a product is updated
- `productDeleted` - Emitted when a product is deleted

## Code Quality

### Running ESLint

Backend:
```bash
cd server
npm run lint
npm run lint:fix  # Auto-fix issues
```

Frontend:
```bash
cd client
npm run lint
npm run lint:fix  # Auto-fix issues
```

## Development

### Backend Development

The backend uses `nodemon` for hot-reloading:

```bash
cd server
npm run dev
```

### Frontend Development

React's development server provides hot-reloading automatically:

```bash
cd client
npm start
```

## Production Build

### Backend

```bash
cd server
npm start
```

### Frontend

```bash
cd client
npm run build
```

The optimized production build will be in the `client/build` directory.

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongod --version`
- Check the connection string in `.env`
- Verify MongoDB is accessible on the specified port

### Port Already in Use

If port 5001 or 3000 is already in use:
- Change `PORT` in `server/.env`
- Update `REACT_APP_API_URL` in `client/.env` accordingly

### CORS Issues

If you encounter CORS errors:
- Verify the backend CORS configuration in `server/src/index.js`
- Ensure the frontend URL is correctly configured

## License

ISC

## Author

Created for REMS technical assessment
