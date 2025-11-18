# Postman Collection Generator

This script generates a complete Postman collection JSON file for all API endpoints in the Jobs Portal application.

## Usage

Run the generator script:

```bash
npm run postman:generate
```

This will create a `postman-collection.json` file in the root directory of the project.

## Import into Postman

1. Open Postman
2. Click **Import** button (top left)
3. Select the `postman-collection.json` file
4. The collection will be imported with all endpoints organized by feature

## Collection Structure

The generated collection includes:

- **Root** - Health check endpoint
- **Auth** - Authentication endpoints (Register, Login)
- **User** - User management endpoints (CRUD operations)
- **Company** - Company management endpoints
- **Job** - Job posting endpoints
- **Application** - Job application endpoints (including many-to-many queries)
- **Saved Job** - Saved job endpoints
- **Notification** - Notification endpoints

## Environment Variables

The collection includes the following variables that you can set in Postman:

- `baseUrl` - Base URL (default: `http://localhost`)
- `port` - Port number (default: `3000`)
- `accessToken` - JWT access token (set after login)
- `userId` - User ID (for testing)
- `companyId` - Company ID (for testing)
- `jobId` - Job ID (for testing)

## Setting up Authentication

1. First, use the **Register** or **Login** endpoint to get an access token
2. Copy the `accessToken` from the response
3. Set it in the collection variables: `accessToken`
4. All protected endpoints will automatically use this token

## Example Workflow

1. Register a new user using `POST /auth/register`
2. Login using `POST /auth/login` and save the token
3. Create a company using `POST /company`
4. Create a job using `POST /job`
5. Apply to the job using `POST /application`
6. View applications using `GET /application/user/:userId`

## Notes

- All endpoints include example request bodies
- Query parameters are included where applicable
- Path parameters are marked with `:paramName` format
- The collection follows Postman Collection v2.1.0 schema

## Updating the Collection

If you add new endpoints or modify existing ones:

1. Update the `generate-postman-collection.ts` script
2. Run `npm run postman:generate` again
3. Re-import the updated collection into Postman










