# Bailanysta

Bailanysta is a modern social network platform where users can create and publish posts while browsing a feed of other users' content. Built with React, Express.js, and PostgreSQL, it provides a seamless social networking experience.

## Features

- User authentication and profile management
- Create and publish posts
- Browse a feed of posts from all users
- Modern, responsive UI
- Real-time updates

## Tech Stack

- **Frontend**: React.js with modern hooks and context API
- **Backend**: Express.js REST API
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS

## Project Structure

```
bailanysta/
├── client/          # React frontend
├── server/          # Express.js backend
└── README.md
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/bailanysta
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Development Process

The development of Bailanysta followed these key steps:

1. **Planning & Architecture**

   - Designed the database schema
   - Planned API endpoints
   - Created component hierarchy

2. **Backend Development**

   - Set up Express.js server
   - Implemented authentication
   - Created RESTful API endpoints
   - Database integration

3. **Frontend Development**
   - Created React components
   - Implemented routing
   - Added state management
   - Styled with Tailwind CSS

## Trade-offs

1. **Monorepo vs Separate Repositories**

   - Chose monorepo for easier development and deployment
   - Trade-off: Slightly more complex initial setup

2. **JWT vs Session-based Authentication**

   - Chose JWT for stateless authentication
   - Trade-off: Cannot invalidate tokens immediately

3. **Tailwind CSS vs Styled Components**
   - Chose Tailwind for rapid development
   - Trade-off: Larger CSS bundle size

## Known Issues

- Image upload functionality is not implemented
- Real-time updates are not implemented
- Mobile responsiveness needs improvement

## Why This Tech Stack?

- **React**: Popular, well-maintained, and great for building interactive UIs
- **Express.js**: Lightweight, flexible, and perfect for REST APIs
- **PostgreSQL**: Robust, reliable, and great for social network data
- **Tailwind CSS**: Rapid development and consistent design system

## License

MIT
