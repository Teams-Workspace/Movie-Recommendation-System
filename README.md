
# Movie Recommendation System

The Movie Recommendation System suggests personalized movie options to users based on their viewing history, ratings, and preferences. Using a combination of data filtering and recommendation algorithms, the system aims to enhance user experience by providing tailored movie suggestions efficiently

![Logo](https://github.com/AbrarAli-SE/Movie-Recommendation-System/blob/main/Photos/Elements/MRS%20logo.png)


## Project Structure

    movie-recommendation-system/
    ├── public/                     # Publicly accessible static files
    │   ├── css/                    # CSS files
    │   │   └── styles.css          # Main stylesheet
    │   ├── js/                     # JavaScript files
    │   │   └── scripts.js          # Main JavaScript file
    │   |── images/                 # Images (e.g., logos, movie posters)
    │   |   └── logo.png            # Example logo file
    |   |── uploads/                # Directory for user-uploaded files
    |   |   └── profile_pics/       # Subdirectory for profile pictures uploaded by users
    |   |       └── example.jpg     # Example profile picture
    ├── routes/                     # Route definitions
    │   ├── authRoutes.js           # Routes for authentication (login/signup)
    │   ├── adminRoutes.js          # Routes for admin functionality
    │   └── userRoutes.js           # Routes for user functionality (profile, wishlist)
    ├── controllers/                # Controllers for handling logic
    │   ├── authController.js       # Logic for authentication (login/signup)
    │   ├── adminController.js      # Logic for admin operations
    │   └── userController.js       # Logic for user operations (preferences, wishlist)
    ├── models/                     # Data models (if using ORM or plain SQL)
    │   ├── dbConnection.js         # Database connection setup
    │   ├── userModel.js            # User model (for SQL queries)
    │   ├── movieModel.js           # Movie model (for SQL queries)
    │   └── wishlistModel.js        # Wishlist model (for managing user wishlists)
    ├── middleware/                 # Middleware functions
    │   ├── authMiddleware.js       # Middleware for checking authentication
    │   └── roleMiddleware.js       # Middleware for checking user roles
    ├── utils/                      # Utility functions
    │   ├── movieRecommendations.js  # Functions for recommending movies (hash maps, graphs)
    │   └── emailService.js         # Functions for sending emails (Nodemailer)
    ├── views/                      # EJS templates
    │   ├── partials/               # Partial EJS templates (header, footer)
    │   │   ├── header.ejs          # Header template
    │   │   └── footer.ejs          # Footer template
    │   ├── index.ejs               # Home page
    │   ├── login.ejs               # Login page
    │   ├── signup.ejs              # Signup page
    │   ├── admin.ejs               # Admin panel page
    │   └── userDashboard.ejs       # User dashboard page
    ├── config/                     # Configuration files
    │   └── dbConfig.js             # Database configuration (MySQL/PostgreSQL)
    ├── .env                        # Environment variables (e.g., database credentials, API keys)
    ├── server.js                   # Main server file
    └── package.json                # NPM package file
## Packages

### Package.json

- First write this command on your project folder then install these Packages

- **InInitializing the Package**:
``` 
npm init -y

```

### Express
- **Description**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Usage**: Used to create server-side applications and APIs.
- **Documentation**: [Express Documentation](https://expressjs.com/)
- **Installation**:
``` 
npm install express
```

### EJS
- **Description**: Embedded JavaScript templating, a simple templating language that lets you generate HTML markup with plain JavaScript.
- **Usage**: Used for rendering dynamic views in your application.
- **Documentation**: [EJS Documentation](https://ejs.co/)

- **Installation**: 
```
npm install ejs

```

### Bcrypt
- **Description**: A library for hashing passwords, making it easier to secure user authentication.
- **Usage**: Used for securely hashing user passwords before storing them in the database.
- **Documentation**: [Bcrypt Documentation](https://www.npmjs.com/package/bcrypt)

- **Installation**: 
```
npm install bcrypt

```

### Jsonwebtoken (JWT)
- **Description**: A compact, URL-safe means of representing claims to be transferred between two parties, allowing for user authentication.
- **Usage**: Used for generating and verifying JSON Web Tokens for secure authentication.
- **Documentation**: [jsonwebtoken Documentation](https://www.npmjs.com/package/jsonwebtoken)

- **Installation**: 
```
npm install jsonwebtoken

```

### Nodemailer
- **Description**: A module for Node.js applications to allow easy email sending.
- **Usage**: Used for sending emails from your application, including OTPs for user verification.
- **Documentation**: [Nodemailer Documentation](https://nodemailer.com/)

- **Installation**: 
```
npm install nodemailer

```

### MySQL (or PostgreSQL)
- **Description**: A relational database management system based on SQL. MySQL is known for its speed and reliability, while PostgreSQL is praised for its advanced features.
- **Usage**: Used to store user data, movie details, and manage the wishlist.
- **Documentation**: 
  - [MySQL Documentation](https://dev.mysql.com/doc/)
  - [PostgreSQL Documentation](https://www.postgresql.org/docs/)

- **Installation**: for MySQL
```
npm install mysql

```
- **Installation**: for PostgreSQL
```
npm install pg

```

### Splide
- **Description**: A lightweight, flexible slider and carousel library for modern web applications.
- **Usage**: Used for creating carousels in the movie recommendation system.
- **Documentation**: [Splide Documentation](https://splidejs.com/)

- **Installation**: 
```
npm install @splidejs/splide

```

### Swiper
- **Description**: A modern mobile touch slider with hardware-accelerated transitions.
- **Usage**: Used for implementing responsive touch sliders in your application.
- **Documentation**: [Swiper Documentation](https://swiperjs.com/)

- **Installation**: 
```
npm install swiper

```

### dotenv
- **Description**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **Usage**: Used to manage environment variables and keep sensitive information secure.
- **Documentation**: [dotenv Documentation](https://www.npmjs.com/package/dotenv)
- **Installation**:
```
npm install dotenv

```

### node-fetch
- **Description**: A lightweight module that brings `window.fetch` to Node.js, enabling HTTP requests.
- **Usage**: Used for making network requests in a simpler way.
- **Documentation**: [node-fetch Documentation](https://www.npmjs.com/package/node-fetch)
- **Installation**:
```
npm install node-fetch

```

### cors
- **Description**: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **Usage**: Used to allow your web applications to interact with resources from different origins.
- **Documentation**: [CORS Documentation](https://www.npmjs.com/package/cors)

- **Installation**:
```
npm install cors

```

### express-session
- **Description**: Middleware for managing user sessions in Express applications.
- **Usage**: Used to create and manage user sessions, allowing you to store user data across requests.
- **Documentation**: [Express-session Documentation](https://www.npmjs.com/package/express-session)

- **Installation**:
```
npm install express-session

```

### Helmet
- **Description**: A collection of middleware functions that help secure Express apps by setting various HTTP headers.
- **Usage**: Used to protect your application from well-known web vulnerabilities by setting HTTP headers appropriately.
- **Documentation**: [Helmet Documentation](https://helmetjs.github.io/)

- **Installation**:
```
npm install helmet

```
### Nodemon
- **Description**: A utility that automatically monitors for any changes in your source and restarts your server.
- **Usage**: Used to streamline the development process by automatically restarting the server when file changes are detected.
- **Documentation**: [Nodemon Documentation](https://nodemonjs.org/)
- **Installation**:
```
npm install nodemon

```
## API Use

### TMDB API
- **Documentation**: [TMDB API Documentation](https://developer.themoviedb.org/reference/intro/getting-started)
- **Usage**: The TMDB API provides access to a vast collection of movies, TV shows, and other media. You can fetch details about movies, search for content, and retrieve information about genres, ratings, and more.

### OMDB API
- **Documentation**: [OMDB API Documentation](http://www.omdbapi.com/)
- **Usage**: The OMDB API is a RESTful web service to obtain movie information, including data from IMDb. It allows you to search for movies and retrieve details such as plot, ratings, and cast information.
## Languages Used

This project utilizes the following programming languages:

1. **JavaScript**
   - Used for both server-side logic (Node.js) and client-side interactions.
  
2. **HTML**
   - Used for structuring the web pages.

3. **CSS**
   - Used for styling the web pages and creating responsive layouts.

4. **SQL**
   - Used for database queries and data management (MySQL or PostgreSQL).

5. **EJS (Embedded JavaScript)**
   - Used for templating and rendering dynamic HTML content.


## Authors

- [@Abrar Ali](https://github.com/AbrarAli-SE)
- [@Saad Ali](https://github.com/Saad123ali)

## Contributors

- [@Haroon Abbas](https://github.com/HaroonAbbas12)
- [@Farhan-ul-haq](https://github.com/Farhanulhaq19)
