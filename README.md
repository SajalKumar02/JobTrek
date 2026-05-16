# JobTrek

JobTrek is a web application designed to help users register, manage their accounts, and apply for jobs with an intuitive dashboard and settings panel.

## Features

- User registration and authentication (login/logout)
- Secure password hashing and changing
- Account management (including delete all data for dev/admin)
- Token refresh and expiration handling
- Protected routes for authenticated users
- Modern, responsive navigation bar
- Job application dashboard and settings pages

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- MongoDB running locally or a connection string for a remote DB

---

### Setup

#### 1. Clone the repository

```bash
git clone https://github.com/sajalkumar02/jobtrek.git
cd jobtrek
```

#### 2. Install dependencies

For both client and server:

```bash
cd client
npm install
cd ../server
npm install
```

#### 3. Configure environment variables

Create `.env` files in both the `client` and `server` folders as needed for your setup (e.g., for DB connection, JWT secrets, etc.).

#### 4. Run the application

In separate terminal windows/tabs:

```bash
# In client/
npm start

# In server/
npm run dev
```

The client will be available at [http://localhost:3000](http://localhost:3000), the server at [http://localhost:8000](http://localhost:8000).

---

## Project Structure

- `/client` — React frontend (with AuthProvider, API handling, and Navigation)
- `/server` — Express backend with authentication and rate-limiting

---

## Key Technologies

- React (with Context API)
- Express.js
- Axios
- bcryptjs (password hashing)
- express-rate-limit (security)
- JWT (access & refresh tokens)
- TypeScript

---

## Usage

- Register a new account or log in.
- Manage your user settings, change password, or log out through the navigation bar.
- Explore the dashboard and jobs section.

---

## Contributing

1. Fork the project and create your branch
2. Commit your changes (`git commit -am 'Add some feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a Pull Request

---

## License

MIT

---
