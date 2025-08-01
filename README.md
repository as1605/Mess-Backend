# Mess Management System Backend

The Mess Management System is designed to streamline mess operations in IIT Delhi. It provides a complete solution for managing multiple mess facilities, including user registration, meal planning, token-based meal access, rebate processing, and staff verification systems.

This is intended to be deployed inside IIT Delhi's BaadalVM (Internal Cloud), and be accessible only to the Mess Managers, Secretaries and designated Mess Staff. We welcome everyone from inside and outside the IIT Delhi student community to collaborate and develop this further!

Link to [Staff App](https://github.com/as1605/Mess-App-Staff)

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation and Deployment](#installation-and-deployment)
  - [Prerequisites](#prerequisites)
  - [Environment Setup](#environment-setup)
  - [Docker Deployment (Recommended)](#docker-deployment-recommended)
  - [Local Development](#local-development)
- [How to Use as a Mess Manager](#how-to-use-as-a-mess-manager)
  - [Authentication](#authentication)
  - [User Management](#user-management)
  - [Meal Management](#meal-management)
  - [Token System](#token-system)
  - [Rebate Processing](#rebate-processing)
- [Step-by-Step Instructions for Mess Managers](#step-by-step-instructions-for-mess-managers)
  - [Creating a New User](#creating-a-new-user)
  - [Creating, Viewing, and Revoking QR Codes](#creating-viewing-and-revoking-qr-codes)
    - [Creating QR Codes](#creating-qr-codes)
    - [Viewing QR Codes](#viewing-qr-codes)
    - [Revoking QR Codes](#revoking-qr-codes)
  - [Creating Meals for Every Day](#creating-meals-for-every-day)
    - [Single Meal Creation](#single-meal-creation)
    - [Daily Meal Setup Process](#daily-meal-setup-process)
    - [Meal Management Best Practices](#meal-management-best-practices)
  - [Uploading Rebates from ERP Excel](#uploading-rebates-from-erp-excel)
    - [Preparing the Excel File](#preparing-the-excel-file)
    - [Upload Process](#upload-process)
    - [Verification and Monitoring](#verification-and-monitoring)
    - [Troubleshooting](#troubleshooting)
- [Important Endpoints](#important-endpoints)
  - [Authentication](#authentication-1)
  - [Manager Operations](#manager-operations)
  - [Staff Operations](#staff-operations)
  - [Web Interface](#web-interface)
- [Code Structure](#code-structure)
  - [Key Components](#key-components)
- [Contributing to Code](#contributing-to-code)
  - [Development Setup](#development-setup)
  - [Code Standards](#code-standards)


### Key Features
- Multi-mess facility management
- User registration and photo management
- Token-based meal access system
- Rebate application and approval workflow
- Staff verification and meal token usage
- Role-based access control (Admin, Manager, Staff)
- Web interface for management operations
- (TODO) Meal planning with capacity and pricing

## Tech Stack

- **Framework**: NestJS (Node.js)
- **Database**: MongoDB with Mongoose ODM
- **Session Management**: Redis with connect-redis
- **Authentication**: Passport.js with local strategy
- **File Upload**: Multer with Sharp for image processing
- **Template Engine/Frontend**: Handlebars (HBS)
- **Containerization**: Docker with docker-compose
- **Reverse Proxy**: Nginx

## Installation and Deployment

### Prerequisites
- Node.js (v16 or higher)
- Docker and Docker Compose
- MongoDB (or use the provided Docker setup)
- IIT Delhi BaadalVM for production deployment

### Environment Setup
1. Copy `sample.env` to `.env` and configure the following variables:
```bash
PORT=8080
SESSION_SECRET=your_session_secret
MONGODB_STRING=mongodb://username:password@localhost:27017/database
MONGODB_USERNAME=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
REDIS_PASSWORD=your_redis_password
MULTER_MEDIA_DESTINATION=./docker/media
```

### Docker Deployment (Recommended)
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Local Development
```bash
# Install dependencies
yarn

# Start development server
yarn start:dev

# Build for production
yarn build
yarn start
```

## How to Use as a Mess Manager

### Authentication
1. Request for credentials creation and 
2. Login with your admin credentials
3. Navigate to different sections based on your role

### User Management
- **Create Users**: Add new students with kerberos ID, name, hostel, and mess assignment
- **View Users**: List all users in your assigned mess facilities
- **Upload Photos**: Add student photos for identification

### Meal Management
- **Create Meals**: Set up meals with name, timing, capacity, price, and food items
- **View Meals**: Browse upcoming and past meals
- **Generate Tokens**: Create meal tokens for students
- **Bulk Operations**: Generate multiple tokens at once

### Token System
- **Issue Tokens**: Create meal tokens for specific students
- **Track Usage**: Monitor token usage and meal attendance
- **Verify Tokens**: Staff can verify tokens at meal times

### Rebate Processing
- **Submit Applications**: Students can apply for rebates
- **Review Requests**: Managers can approve/reject rebate applications
- **Track Status**: Monitor rebate approval workflow

## Step-by-Step Instructions for Mess Managers

### Creating a New User

1. **Navigate to User Management**
   - Click on "Users" in the navigation menu
   - Click the "Create User" button

2. **Fill User Details**
   - **Kerberos ID**: Enter the student's kerberos ID (e.g., "ee1200461")
   - **Name**: Enter the student's full name
   - **Hostel**: Select the appropriate hostel from the dropdown
   - Click "Create" to save the user

3. **Verify User Creation**
   - Click "Get Users" to see the newly created user in the list
   - The user will appear with their details and an active status

### Creating, Viewing, and Revoking QR Codes

#### Creating QR Codes
1. **Access User QR Codes**
   - In the Users section, find the user you want to create QR codes for
   - Click the "QR" button next to their name

2. **Generate New QR Code**
   - A modal will open showing existing QR codes for that user
   - Click "Create" to generate a new QR code
   - The QR code will be displayed with creation time and status

3. **QR Code Information**
   - Each QR code contains: `{kerberos: "user_id", token: "unique_token"}`. Unique Token is stored in database and cannot be guessed. kerberos is added as a backup to verify the QR offline if the service is down
   - QR codes are automatically set to "Active" status
   - Creation time is automatically recorded

#### Viewing QR Codes
1. **Access QR Codes**
   - Click the "QR" button next to any user in the Users list
   - All QR codes for that user will be displayed in a modal

2. **QR Code Details**
   - Each QR code shows:
     - QR code image (scannable)
     - Scope (usually "full")
     - Creation time
     - Status (Active/Disabled)

#### Revoking QR Codes
1. **Access QR Management**
   - Currently, QR codes can be disabled by updating their status in the database
   - Contact system administrator for immediate QR code revocation
   - Future versions will include direct revocation through the web interface

### Creating Meals for Every Day

#### Single Meal Creation
1. **Access Meal Management**
   - Navigate to "Meals" in the web interface
   - Click "Create Meal" button

2. **Fill Meal Details**
   - **Name**: Enter meal name (e.g., "Breakfast", "Lunch", "Dinner")
   - **Start Time**: Set the meal start time (date and time)
   - **End Time**: Set the meal end time (date and time)
   - **Auto-Assign**: Check the box to automatically assign tokens to all active users

3. **Create the Meal**
   - Click "Create" to save the meal
   - If auto-assign is checked, meal tokens will be automatically generated for all active users

#### Daily Meal Setup Process
1. **Plan Your Schedule**
   - Determine meal times for each day
   - Typical schedule: Breakfast (7:00-9:00), Lunch (12:00-14:00), Dinner (19:00-21:00)

2. **Create Meals in Advance**
   - Create meals for the entire week or month in advance
   - Use consistent naming (e.g., "Breakfast - Monday", "Lunch - Monday")

3. **Bulk Creation Tips**
   - Create meals with similar time slots
   - Use the auto-assign feature to save time
   - Set appropriate start and end times for each meal type

#### Meal Management Best Practices
1. **Regular Schedule**
   - Create meals at least 24 hours in advance
   - Use consistent timing for each meal type
   - Set appropriate duration (typically 2 hours for each meal)

2. **Capacity and Pricing**
   - Default capacity is set to 1000 users
   - Default price is set to 0 (free meals)
   - These can be customized in future versions

3. **Monitoring**
   - Use "Get Meals" to view current, future, and past meals
   - Monitor meal attendance through the token system

### Uploading Rebates from ERP Excel

#### Preparing the Excel File
1. **Download from ERP**
   - Access your ERP system
   - Download the rebate Excel file containing student rebate applications
   - Ensure the file contains the required columns:
     - Entry Number
     - Rebate Application No.
     - From Date
     - To Date
     - Approval Status
     - Days
     - Reason For Rebate
     - Rebate Type
     - Rebate Amount (INR)

2. **File Format Requirements**
   - File must be in Excel format (.xlsx or .xls)
   - First sheet should contain the rebate data
   - Column headers should match the expected format

#### Upload Process
1. **Access Rebate Management**
   - Navigate to "Rebate" in the web interface
   - Click "Create Rebates" button

2. **Upload Excel File**
   - Click "Choose File" in the Excel File field
   - Select your downloaded ERP Excel file
   - Click "Create" to upload and process the file

3. **Processing Results**
   - The system will automatically parse the Excel file
   - Rebate applications will be created for each row
   - Student kerberos IDs will be automatically converted from entry numbers
   - The Excel file will be automatically deleted after processing

#### Verification and Monitoring
1. **View Uploaded Rebates**
   - Click "Get Rebates" to see all rebate applications
   - Active rebates (current date within range) will be highlighted in red
   - Inactive rebates will be shown in light background

2. **Rebate Information Displayed**
   - Rebate Application No.
   - Student Entry Number (converted from kerberos)
   - Student Name
   - From Date
   - To Date
   - Approval Status
   - Reason for Rebate

#### Troubleshooting
1. **Common Issues**
   - **File Format**: Ensure the file is in proper Excel format
   - **Column Headers**: Verify column names match expected format
   - **Date Format**: Ensure dates are in proper format
   - **Entry Numbers**: Verify entry numbers are in correct format

2. **Error Handling**
   - If upload fails, check the file format and column headers
   - Contact system administrator if issues persist
   - Verify that all required columns are present in the Excel file

## Important Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/myProfile` - Get user profile
- `POST /auth/createAdmin` - Create new admin user

### Manager Operations
- `POST /manager/createUser` - Create new student user
- `GET /manager/getUsers` - List users in mess
- `POST /manager/createAccessToken` - Generate access tokens
- `GET /manager/getAccessTokens` - View user tokens
- `POST /manager/createMeal` - Create new meal
- `GET /manager/getMeals` - List meals
- `POST /manager/createMealToken` - Generate meal token
- `POST /manager/bulkCreateMealToken` - Bulk token generation
- `GET /manager/getMealTokens` - View meal tokens
- `POST /manager/createRebate` - Create rebate application
- `GET /manager/getRebates` - List rebate applications
- `POST /manager/uploadFile` - Upload files

### Staff Operations
- `GET /staff/verifyToken` - Verify meal token
- `GET /staff/verifyWithoutToken` - Verify user without token
- `GET /staff/getMealTokens` - Get user meal tokens
- `POST /staff/useMealToken` - Mark token as used
- `POST /staff/uploadPhoto` - Upload user photo
- `GET /staff/photo/:uri` - Get user photo

### Web Interface
- `GET /web` - Main dashboard
- `GET /web/login` - Login page
- `GET /web/users` - User management page
- `GET /web/meals` - Meal management page
- `GET /web/mealtokens` - Token management page
- `GET /web/rebate` - Rebate management page

## Code Structure

```
Mess-Backend/
├── 📁 src/                    # Main source code
│   ├── 📁 auth/              # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── 📁 passport/      # Authentication guards and strategies
│   │       ├── admin-auth.guard.ts
│   │       ├── local-auth.guard.ts
│   │       ├── local.strategy.ts
│   │       └── manager-auth.guard.ts
│   ├── 📁 manager/           # Manager operations module
│   │   ├── manager.controller.ts
│   │   ├── manager.service.ts
│   │   └── manager.module.ts
│   ├── 📁 staff/            # Staff operations module
│   │   ├── staff.controller.ts
│   │   ├── staff.service.ts
│   │   └── staff.module.ts
│   ├── 📁 web/              # Web interface module
│   │   ├── web.controller.ts
│   │   └── web.module.ts
│   ├── 📁 schemas/          # MongoDB schemas
│   │   ├── accesstoken.schema.ts
│   │   ├── admin.schema.ts
│   │   ├── fooditem.schema.ts
│   │   ├── meal.schema.ts
│   │   ├── mealtoken.schema.ts
│   │   ├── mess.schema.ts
│   │   ├── rawmaterial.schema.ts
│   │   ├── rebate.schema.ts
│   │   └── user.schema.ts
│   ├── 📁 utils/            # Utility functions
│   │   ├── config.ts
│   │   ├── parseExcel.ts
│   │   └── utils.ts
│   ├── app.controller.ts     # Main application controller
│   ├── app.module.ts        # Main application module
│   ├── app.service.ts       # Main application service
│   ├── index.d.ts           # TypeScript declarations
│   └── main.ts              # Application entry point
├── 📁 views/                # Handlebars templates
│   ├── 📁 partials/         # Reusable template components
│   │   ├── base_end.hbs
│   │   ├── base_start.hbs
│   │   └── protected.hbs
│   ├── index.hbs            # Main dashboard page
│   ├── login.hbs            # Login page
│   ├── logout.hbs           # Logout page
│   ├── meals.hbs            # Meal management page
│   ├── mealtokens.hbs       # Token management page
│   ├── rebate.hbs           # Rebate management page
│   └── users.hbs            # User management page
├── 📁 scripts/              # Utility scripts
│   ├── createuser.py        # Bulk user creation script
│   ├── mailer.py            # Email functionality
│   ├── qr.py                # QR code generation utilities
│   └── util.py              # Common utilities
├── 📁 docker/               # Docker configuration
│   ├── 📁 media/            # File upload storage
│   ├── 📁 mongodb/          # MongoDB data persistence
│   │   └── 📁 data/
│   ├── 📁 nginx/            # Nginx configuration
│   │   └── nginx.conf
│   └── 📁 redis/            # Redis data persistence
├── 📁 upload/               # File upload directory
├── 📁 docker-compose.yml    # Multi-container orchestration
├── 📁 Dockerfile            # Application container definition
├── 📁 nest-cli.json         # NestJS CLI configuration
├── 📁 package.json          # Node.js dependencies and scripts
├── 📁 README.md             # Project documentation
├── 📁 sample.env            # Environment variables template
├── 📁 tsconfig.build.json   # TypeScript build configuration
├── 📁 tsconfig.json         # TypeScript configuration
└── 📁 yarn.lock             # Yarn dependency lock file
```

</details>

### Key Components

**Data Models:**
- **Admin**: System administrators with role-based permissions
- **User**: Students with mess assignments and photos
- **Mess**: Mess facilities
- **Meal**: Meal definitions with timing, capacity, and pricing
- **MealToken**: Token-based meal access system
- **Rebate**: Student rebate applications and approvals

**Authentication System:**
- Session-based authentication using Redis
- Role-based access control (Admin, Manager, Staff)
- Passport.js integration for secure login

**File Management:**
- Photo upload and processing with Sharp
- Photos are stored in an internal BaadalVM. They are renamed for anonymity - so require database access to resolve the names. 
- Excel file parsing for bulk operations
- Secure file storage and retrieval

## Contributing to Code

Please connect with the BHM or DevClub team or Aditya Singh with your ideas before starting contribution.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Install dependencies: `yarn`
4. Set up environment variables
5. Run development server: `yarn start:dev`

### Code Standards
- Follow TypeScript best practices
- Use NestJS decorators and patterns
- Maintain consistent code formatting with Prettier
- Write meaningful commit messages
- Add tests for new features


---

Disclaimer: This README has been generated by Cursor after analysing the code base. Make sure to connect with the maintainers for any clarifications regarding the usecases.
