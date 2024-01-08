Deployment Tutorial 

Database Deployment:

In database_migrate folder is sql file for import database in sql server, use newest file with name format by YY_MM_DD format.

Back-end Server Deployment:

Config these value in .env in be folder to config server:

DATABASE_HOST= #Host of your sql server
DATABASE_USER= #User to connection sql server
DATABASE_PASS= #Pass to connection sql server
DATABASE_NAME= #Database name
DATABASE_PORT= #Database port

EMAIL_SENDER_USER= #email use to send mail
EMAIL_SENDER_APP_PASS= #App pass of your mail
SITE_URL= #Site Front-end host

Then run these following command line to start Back-end server:

- cd ./be

- docker-compose up -d

Server will automation hosting at port 9000, you can change hosting port by using HOST= PORT in .env file

Front-end Deployment:

Run these following command line to start Front-end host:

- cd ./fe

- cd npm i --legacy-peer-deps

- npm start

Front-end Host will automation hosting at port 3000
