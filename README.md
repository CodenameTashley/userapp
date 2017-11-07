# userapp
NodeJs + MySQL RESTful API

# Requirement
NodeJs Installed on your machine,
MySQL as DBMS,
Use IMPORT users.sql to have the tables + sample data

# Installation
go to the folder and open cmd/terminal and type "npm install"
Then, run the app by either typing node or nodemon (if installed on your machine)

# Example

1) View all users: http://localhost:9500/users --> METHOD = GET
2) View user by id: http://localhost:9500/users/[id] --> METHOD = GET
3) Insert user: http://localhost:9500/users/  DATA: {"name": "[NAME]", "surname": "[SURNAME]","age": [AGE]}  --> METHOD = POST
4) Update user by id: http://localhost:9500/users/[id] DATA : {"name": "[NAME]", "surname": "[SURNAME]","age": [AGE]}  --> METHOD = PUT
5) Delete user by id: http://localhost:9500/users/[id] --> METHOD = DELETE
6) Archive user by id: http://localhost:9500/users/[id]?archive=true --> METHOD = DELETE
