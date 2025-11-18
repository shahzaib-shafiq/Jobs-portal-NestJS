# Database Seeder

This seeder file populates the database with dummy data for development and testing purposes.

## Usage

### Seed the database (without resetting)
```bash
npm run db:seed
```

### Reset and seed the database
This will drop all tables, run migrations, and then seed the database:
```bash
npm run db:reset:seed
```

### Reset database only (without seeding)
```bash
npm run db:reset
```

## What gets seeded

The seeder creates:
- **8 Users**: 1 admin, 2 recruiters, 5 candidates
- **4 Companies**: Various tech companies
- **8 Jobs**: Different job types (FULL_TIME, REMOTE, INTERN, CONTRACT)
- **10 Applications**: Demonstrating many-to-many relationship (users applying to multiple jobs, jobs receiving multiple applications)
- **6 Saved Jobs**: Users saving jobs for later
- **7 Notifications**: Various notifications for users

## Test Credentials

After seeding, you can use these credentials to login:

- **Admin**: `admin@jobsportal.com` / `password123`
- **Recruiter**: `john.recruiter@techcorp.com` / `password123`
- **Candidate**: `alice.developer@email.com` / `password123`

All users have the same password: `password123`

## Notes

- The seeder clears all existing data before seeding
- Passwords are hashed using bcrypt
- The seeder respects all foreign key constraints and relationships
- All data is realistic and suitable for development/testing





