README.md
Documentation for setting up and using the API.
# Vendor Management System

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
# Install dependencies:
npm install
Set up environment variables in .env:
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=vendor_management
JWT_SECRET=your_jwt_secret

# Run the application:
npm run start

# API Endpoints
Vendor Management
Create Vendor: POST /vendors
List Vendors: GET /vendors
Get Vendor Details: GET /vendors/:id
Update Vendor: PUT /vendors/:id
Delete Vendor: DELETE /vendors/:id

# Purchase Orders
Create Purchase Order: POST /purchase-orders
List Purchase Orders: GET /purchase-orders
Get Purchase Order Details: GET /purchase-orders/:id
Update Purchase Order: PUT /purchase-orders/:id
Delete Purchase Order: DELETE /purchase-orders/:id
Acknowledge Purchase Order: POST /purchase-orders/:id/acknowledge