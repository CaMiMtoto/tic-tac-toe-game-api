# Tic Tac Toe Game API

This is a  Tic Tac Toe game API. It is a REST API that allows you to play Tic Tac Toe with the
computer. It is built with Node.js and Express.js using TypeScript.

## Installation

To install the API, you need to have Node.js and npm installed on your machine. You can download Node.js from [here](https://nodejs.org/en/download/).

After installing Node.js, clone the repository and install the dependencies.

```bash
git clone https://github.com/CaMiMtoto/tic-tac-toe-game-api.git
```

```bash
cd tic-tac-toe-game-api
```

```bash
npm install
```

## Usage 

To start the server, run the following command:

```bash
npm start
```

The server will start on port 3000. You can access the API on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### GET /?board=+xxo++o++
I should get the exact string oxxo o (that’s o-x-x-o-space-space-o-space-space) as the entire
contents of the HTTP response body.

## Deployment

The API is deployed on Heroku. You can access it on [https://tic-tac-toe.cami.ink](https://tic-tac-toe.cami.ink).
