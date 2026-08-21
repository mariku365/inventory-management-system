# Download and install dependencies before development (Links is given beside the name)
    VS Code - https://code.visualstudio.com/download?_exp_download=d53503e735
    Node.js - https://nodejs.org/en/download/current
    MSSQL SQL SERVER 2025 DEVELOPER - https://www.microsoft.com/en-us/sql-server/sql-server-downloads
    SSMS - https://learn.microsoft.com/en-us/ssms/install/install
    Git - https://git-scm.com/install/windows

# If all the Dependencies are now installed.

## Clone the repository before continuing
    Step 1: Go to the folder you want to clone the repository.
    Step 2: In your terminal (ensuring you are inside the folder), clone the repository using:
        git clone https://github.com/mariku365/inventory-management-system.git

# After cloning the repository. 

# Set up the SQL Server, before we can proceed and run the project. (Follow the instructions in the "Setup the SSMS" section and the others below it.)
## Steps in running the project
    Step 1: Open the local repository you cloned in VS Code IDE.
    Step 2: Open new 2 terminals. At the top-left there is a "Terminal" tab then click "New Terminal". Repeat this 2 times.
    Step 3: Navigate to the backend directory via the 1st terminal by typing: cd backend
        Step 3.a: Install the dependencies by typing in the terminal: npm install
        Step 3.b: Start the backend by typing in the terminal: npx nodemon index.js
    Step 4: Navigate to the frontend directory via the 2nd terminal by typing: cd frontend
        Step 4.a: Install the dependencies by typing in the terminal: npm install
        Step 4.b: Start the backend by typing in the terminal: npm start
    Step 5: Navigate the "backend" folder. There will be a .env file, change the DB_PASSWORD to the password you set in the "sa" user and DB_SERVER corresponding to the server name in the SQL Server. You can leave the other things as they are.
    Step 6: You can now access the project locally via "http://localhost:3000"

# The challenges I've faced while doing the project.
    1. Was setting up the SQL Server as there are many things you need to tinker before you can connect the backend to the server.
    2. Setting up the database, just like in number 1, you need to know how to navigate SSMS properly so that you can connect your backend to the database.
    3. Thinking of an appropriate design for the system and making it simple enough to make it simple to navigate.
    
## Even though I have to face these challenges, I can proudly say that I've enjoyed doing this exam specially because I am able to learn new things.


# Setup the SSMS 
    Just like in the image, connect to the SQL Server. Wherein the Server Name is your computer's name. Then check the Trust Server Certificate
<img width="538" height="740" alt="SSMS Setup" src="https://github.com/user-attachments/assets/4c028957-30a6-48e5-a610-16f6ae9b5a45" />

    After connecting the SSMS to the SQL Server, open the "Inventory Management System.sql" in the SSMS and run the queries.

    On the left side of the SSMS you can see an "Object Explorer" pane. There are "+" indicating it can be expanded. Under the SQL Server you can see the Databases and     Security folders.

## Checking if the queried database is available.
    Step 1: Expand the Databases folder under the SQL Server. You will see the created database just like in the image.
<img width="346" height="103" alt="image" src="https://github.com/user-attachments/assets/e57dc883-6dd6-4743-88f9-67f66af6ffdf" />

## Setting up the SQL Server for the backend to connect. Follow the image for instructions.
<img width="340" height="550" alt="SSMS - Connect to the SQL Server" src="https://github.com/user-attachments/assets/799e5588-f981-456b-b486-970c17489f61" />

<img width="733" height="668" alt="SSMS - Connect to the SQL Server 2" src="https://github.com/user-attachments/assets/ec701d96-3d10-4d22-afeb-51eab2733b79" />

## How to connect to the database by logging in
    Step 1: Under the SQL Server, look for Security and expand it and you will see Logins, expand it again. 
<img width="337" height="257" alt="image" src="https://github.com/user-attachments/assets/f09b631b-5e7a-4caa-ae56-00a39f6df37d" />

<img width="1107" height="648" alt="SSMS - Connect to the Database by loggin in" src="https://github.com/user-attachments/assets/95d1bdff-ced3-46ba-b8f1-8774b2c00448" />

<img width="733" height="671" alt="SSMS - Connect to the Database by loggin in 2" src="https://github.com/user-attachments/assets/f5ad41f6-4118-4b93-b1cd-e38b40501383" />

