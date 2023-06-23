# bookstore-api

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

This pet project demostrate how to setup a simple backend api with basic CURD, jwt
Tech stack: Nodejs, Express, MongoDB
Code editor: VSCode

Currently not deployed to cloud yet.. This project still working in process..

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

First, make sure you have an MongoDB connection. In your database, create a collection name 'Bookstore'.

Next, clone this project and change DATABASE_URL value to your connection string in /.env
Continusely, open codebase folder in VSCode, in terminal, run this command to install all dependencies.
```bash
    npm install --save
``` 

Lastly, run start command: 
```bash
    npm start
```

If you see this log line 'Database Connected' then you are good to go !

## Usage <a name = "usage"></a>

Default port is 3000, you can use PostMan or fetch API into your Front-end project if you wish
Here is the API document: ... 
