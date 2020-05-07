# BookMart

> Book Store Web Application built with MERN stack.

## Summary

The applicartion allows the guest users to find books by title and category. And the guest can purchase books by signing up for an account and then logging to the book store. The store managers can manage the books and categories by performing CRUD (Create, Read, Update, Delete) operations. 

## Technologies

- [x] [React](https://reactjs.org/)
- [x] [Bootstrap4](https://getbootstrap.com/)
- [x] [Bootswatch Theme (Sandstone)](https://bootswatch.com/sandstone/)
- [x] [Redux](https://redux.js.org/)
- [x] [NodeJS](https://nodejs.org/)
- [x] [Express](https://expressjs.com/)
- [x] [BCrypt](https://www.npmjs.com/package/bcrypt)
- [x] [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [x] [ESLint](https://eslint.org/)
- [x] [Prettier](https://prettier.io/)

## Quick Start Guide

Change the environment variables MONGODB_URI and JWT_SECRET before running the applciation. You may change the values in `default.json` in `config` folder.

```bash
# Install dependencies for backend
npm install

# Install dependencies for frontend
npm run install:client

# Run the development server of the backend
npm run server:dev

# Run the development server of the frontend
npm run client

# Run the production version of the application with concurrently
npm start

```

## Deployment

The project is configured to deploy the production optimized version on Heroku.

## App Info

### Version

1.0.3
