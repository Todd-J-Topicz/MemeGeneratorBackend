1. SERVER -Start server.js by running 'node run dev' in a BASH temrinal in VSC (part of package.json "scripts")
2. DOCKER - Launch Docker App
3. DOCKER - In another BASH terminal in VSC, run command 'docker compose up' (make sure in project directory).
4. DOCKER SHELL - Open up DOCKER shell from VSC 
    a. use 'psql -U postgres' to log into image
    b. '\l' t list databases
    c. '\c <DATABASENAME>' to enter proper database
    d. '\dt' - lists relations/tables of DB
    e. Run SQL queries to manually see what data exists in tables
5. COMMANDLINE - Use anotheer BASCH terminal in VSC to run commands to create TABLES and INSERT DATA (hardcode, for testing)
    a. 'npm run migrate' - TABLE
    b. 'npm run seed' - DATA
6. POSTMAN - Use POSTMAN app to test CRUD routes - Get, Post, Patch and Delete (See saved collections for examples)

-----------------------------------------------------------------------------------------------------------------------------
CONNECT TO FRONT END:
7. 