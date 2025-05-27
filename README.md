# Word Dictionary React App

A simple MERN application for managing a word dictionary with CRUD functionality — add, edit, delete, and search words. It uses React Router for navigation and Axios to communicate with a backend API.

## Features

- View a list of words with definitions, images, and optional videos.
- Search words (supports partial matching).
- Add new words with details.
- Edit existing words.
- Delete words with confirmation.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Backend API running locally at `http://localhost:5002` supporting REST endpoints:
  - GET `/words` — get all words
  - GET `/words/:query` — search words (partial/exact)
  - GET `/words/id/:id` — get word by id
  - POST `/words` — add a new word
  - PUT `/words/:id` — update a word by id
  - DELETE `/words/:id` — delete a word by id

### Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/word-dictionary-react.git
cd word-dictionary-react
```

2. Run Frontned
```bash
cd client
npm install
npm start
```

3. Run Backend
```bash
cd server
npm install
npm start
```

The app will be available at http://localhost:3000.
