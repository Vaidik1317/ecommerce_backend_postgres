# Database Migration Guide

This project has been migrated from using Sequelize's `sync()` method to using proper database migrations for better database schema management.

## What Changed

- **Before**: Used `sequelize.sync({ force: false, alter: true })` to automatically sync models with the database
- **After**: Uses Sequelize CLI migrations for controlled database schema changes

## Migration Setup

### 1. Install Dependencies
```bash
npm install --save-dev sequelize-cli umzug
```

### 2. Configuration
The migration configuration is set up in `config/config.json` to use environment variables for database connections.

### 3. Available Scripts
The following npm scripts are available for migration management:

```bash
# Run all pending migrations
npm run db:migrate

# Undo the last migration
npm run db:migrate:undo

# Undo all migrations
npm run db:migrate:undo:all

# Create a new migration file
npx sequelize-cli migration:generate --name your-migration-name
```

## How to Use

### For Development
1. Make sure your database is running and environment variables are set
2. Run migrations to create/update tables:
   ```bash
   npm run db:migrate
   ```
3. Start your application:
   ```bash
   npm run dev
   ```

### For Production
1. Run migrations on your production database:
   ```bash
   NODE_ENV=production npm run db:migrate
   ```
2. Deploy your application

### Creating New Migrations
When you need to make schema changes:

1. Generate a new migration file:
   ```bash
   npx sequelize-cli migration:generate --name add-new-field-to-users
   ```

2. Edit the generated migration file in the `migrations/` directory

3. Run the migration:
   ```bash
   npm run db:migrate
   ```

## API Endpoints

The `/dbSync` endpoint has been updated to run migrations instead of sync:
- **GET** `/dbSync` - Runs all pending migrations

## Benefits of Using Migrations

1. **Version Control**: Database schema changes are tracked in version control
2. **Rollback Capability**: Can easily rollback changes if needed
3. **Environment Consistency**: Same schema across development, staging, and production
4. **Team Collaboration**: Multiple developers can work on schema changes safely
5. **Audit Trail**: Complete history of database schema changes

## Important Notes

- The `sync()` calls have been removed from the codebase
- Models are still defined the same way, but tables are created via migrations
- The initial migration creates all existing tables based on your current models
- Always test migrations in a development environment first
- Keep migration files in version control

## Troubleshooting

### Migration Errors
If a migration fails:
1. Check the error message for details
2. Fix the migration file
3. Run `npm run db:migrate:undo` to rollback
4. Run `npm run db:migrate` again

### Database Connection Issues
Ensure your environment variables are set correctly:
- `PG_DB_URI` for development/production
- `TEST_DB_URI` for testing

### Migration File Issues
- Migration files should be named with timestamps
- Always include both `up` and `down` methods
- Test the `down` method to ensure it properly reverses the `up` method
