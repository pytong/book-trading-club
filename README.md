# Book Trading Club 

## Overview

This application allows you to trade books with other people.

Features:

1. As an authenticated user, I can view all books posted by every user.

2. As an authenticated user, I can add a new book.

3. As an authenticated user, I can update my settings to store my full name, city, and state.

4. As an authenticated user, I can propose a trade and wait for the other user to accept the trade.

# Quick Start Guide

### Prerequisites

You must have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [MongoDB](http://www.mongodb.org/)
- [Git](https://git-scm.com/)

### Installation & Startup


### Setup Twitter Authentication

Pleas register the application with Twitter (https://apps.twitter.com) and get API keys / secrets.

### Local Environment Variables

Create a file named `.env` in the root directory. This file should contain:

```
GOOGLE_API_KEY=your-google-api-key-here
TWITTER_KEY=your-twitter-key-here
TWITTER_SECRET=your-twitter-secret-here
MONGO_URI=mongodb://localhost:27017/book-trading-club
APP_URL=https://book-trading-club-pytong.c9.io/
PORT=8080
```

### Starting the App

To start the app, make sure you're in the project directory and type `node server.js` into the terminal. This will start the Node server and connect to MongoDB.

You should the following messages within the terminal window:

```
Node.js listening on port 8080...
```

Next, open your browser and enter `http://localhost:8080/`. Congrats, you're up and running!


## License

MIT License. [Click here for more information.](LICENSE.md)
