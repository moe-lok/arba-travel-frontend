# ARBA Travel Frontend

This is the frontend for the ARBA Travel application, a social media-like platform where users can create posts, comment on posts, and interact with other users.

## Features

- User registration and login
- View, create, edit, and delete posts
- View, add, edit, and delete comments on posts
- Image upload for posts
- Responsive design for various screen sizes

## Technologies Used

- React
- Axios for API requests
- React Router for navigation

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/moe-lok/arba-travel-frontend.git
   cd arba-travel-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your backend API URL:
   ```
   REACT_APP_API_URL=http://your-backend-api-url
   ```

## Running the Application

To run the development server:

```
npm start
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```
npm run build
```

This will create a `build` directory with the compiled assets ready for deployment.

## Deployment

This project is deployed on an AWS EC2 instance alongside the backend. For specific deployment instructions, please refer to the deployment documentation.

## Components

- `Register`: User registration form
- `Login`: User login form
- `PostList`: Displays all posts and handles post/comment operations
- `CreatePost`: Form for creating new posts

## Backend Repository

The backend for this project can be found at: [ARBA Travel Backend](https://github.com/moe-lok/arba_travel_project)

## Note

This project was developed as part of a technical assessment for ARBA Travel. Some features may be incomplete or require further refinement.

## Future Improvements

- Implement user profiles
- Add pagination for posts
- Enhance error handling and user feedback
- Implement real-time updates using WebSockets
- Add unit and integration tests
