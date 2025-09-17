# Prisma_Postgres

-----

### 1\. Create a New PostgreSQL Container 🐳

Use the `docker run` command to create and start a new container. You'll specify the container's name, the PostgreSQL password, and the ports to expose.

```bash
docker run --name my-postgres-db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

Here's what each part of this command does:

  * `docker run`: The command to create and start a container.
  * `--name my-postgres-db`: Assigns a name to the container (`my-postgres-db`) for easy reference.
  * `-e POSTGRES_PASSWORD=mysecretpassword`: Sets an environment variable to define the superuser's password. **Change `mysecretpassword` to a strong password of your choice.**
  * `-p 5432:5432`: Maps the container's internal port `5432` to the host machine's port `5432`, allowing you to connect from outside the container.
  * `-d postgres`: Runs the container in **d**etached mode (in the background) using the official `postgres` image.

-----

### 2\. Connect to the Container with psql 💻

Now that the container is running, use `docker exec` to access its psql shell.

```bash
docker exec -it my-postgres-db psql -U postgres
```

  * `docker exec -it`: Executes an interactive terminal command inside the running container.
  * `my-postgres-db`: The name of the container you just created.
  * `psql`: The command to run the PostgreSQL interactive shell.
  * `-U postgres`: Connects as the default `postgres` superuser.

This command will drop you into the psql shell, and your terminal prompt will change to `postgres=#`.

-----

### 3\. Create a New Database ✨

Once you are in the psql shell, use the `CREATE DATABASE` command to create a database for your application.

```sql
CREATE DATABASE my_app_db;
```

You can verify that the new database was created by using the `\l` command.

```sql
\l
```

To exit the psql shell, type `\q` and press Enter. You'll be returned to your regular terminal prompt.

This looks like an excellent and thorough guide. It's well-structured, clear, and covers all the essential steps from setting up the container to performing daily tasks. The combination of Docker commands, psql commands, and a practical task list makes it very useful.

If you want to make it even more comprehensive, you could add information on how to stop and remove the container. This is an important part of the complete workflow for managing a development database.

-----

### 4\. Stop and Remove the Container 🗑️

```bash
docker stop my-postgres-db
docker rm my-postgres-db
```

----
----

The correct Prisma connection string for your new `my_app_db` database is:

```
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/my_app_db"
```
----
----


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

----
----
----

[Learn Prisma on Medium](https://medium.com/@kemaltf_/learn-prisma-81a019e90b4f)
