## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd LBA_test-technique
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a '.env' file in the 'server' directory:

PORT=5001
MONGODB_URI=mongodb://localhost:27017/product-db
JWT_SECRET=your_secret_key_here
NODE_ENV=development

### 3. Setup Frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:

REACT_APP_API_URL=http://localhost:5001/api
REACT_APP_SOCKET_URL=http://localhost:5001

### 4. Start MongoDB

```bash
# macOS
brew services start mongodb/brew/mongodb-community@6.0

# Linux
sudo systemctl start mongod
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

## WebSocket Events

- `productCreated` - Emitted when a new product is created
- `productUpdated` - Emitted when a product is updated
- `productDeleted` - Emitted when a product is deleted

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