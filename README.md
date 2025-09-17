# Prisma_Postgres

## PostgreSQL Daily Commands 🛠️

Here are the essential PostgreSQL commands you'll use in daily development and database administration, categorized for clarity.

### **psql Meta-Commands**

These commands are used within the `psql` shell and start with a backslash (`\`).

* **`\l`**: List all databases.
* **`\c [database]`**: Connect to a specific database.
* **`\dt`**: List all tables in the current database.
* **`\d [table_name]`**: Describe a table, showing its columns, types, and constraints.
* **`\du`**: List all users (roles).
* **`\q`**: Quit the `psql` shell.

***

### **Data Definition Language (DDL)**

DDL commands are for creating and modifying the database structure.

* **`CREATE DATABASE [name];`**: Create a new database.
* **`CREATE TABLE [name] ([column] [type], ...);`**: Create a new table.
* **`ALTER TABLE [table] ADD COLUMN [column] [type];`**: Add a new column to a table.
* **`DROP TABLE [name];`**: Delete a table.
* **`DROP DATABASE [name];`**: Delete a database.

***

### **Data Manipulation Language (DML)**

DML commands are for managing the data within tables.

* **`SELECT * FROM [table];`**: Retrieve all data from a table.
* **`SELECT [column] FROM [table] WHERE [condition];`**: Retrieve specific columns with a condition.
* **`INSERT INTO [table] ([cols]) VALUES ([vals]);`**: Insert a new row of data.
* **`UPDATE [table] SET [col] = [val] WHERE [cond];`**: Update existing data.
* **`DELETE FROM [table] WHERE [cond];`**: Delete rows from a table.

---

## Your Daily PostgreSQL Task List 📝

Here is a typical workflow for a developer using PostgreSQL, which you can use as a checklist.

### **Task 1: Connect to Your Database**
* **Goal:** Establish a connection to your PostgreSQL server.
* **Command:** `docker exec -it [container_name] psql -U postgres`
* **Note:** Use this command from your host machine's terminal, not inside the container's shell.

### **Task 2: Manage Databases**
* **Goal:** Create a new database for your project.
* **Command:** `CREATE DATABASE [your_db_name];`
* **Goal:** Connect to your new database.
* **Command:** `\c [your_db_name]`

### **Task 3: Define Your Schema**
* **Goal:** Create tables for your application.
* **Command:** `CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100) UNIQUE);`
* **Goal:** Verify the table structure.
* **Command:** `\d users`

### **Task 4: Work with Data**
* **Goal:** Insert new user data.
* **Command:** `INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@example.com');`
* **Goal:** Query the data you just inserted.
* **Command:** `SELECT * FROM users;`
* **Goal:** Update a user's email address.
* **Command:** `UPDATE users SET email = 'j.doe@example.com' WHERE name = 'John Doe';`

### **Task 5: Maintain and Administer**
* **Goal:** Add a new column to the `users` table.
* **Command:** `ALTER TABLE users ADD COLUMN phone_number VARCHAR(20);`
* **Goal:** Remove the database when your project is done.
* **Command:** `DROP DATABASE [your_db_name];`
