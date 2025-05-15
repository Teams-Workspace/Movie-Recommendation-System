
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
    |   |-- pictures/
    |   |   |__ staticPictures      # All static pictures folder
    |   |── uploads/                # Directory for user-uploaded files
    |   |   └── profile_pics/       # Subdirectory for profile pictures uploaded by users
    |   |       └── example.jpg     # Example profile picture
    ├── routes/                     # Route definitions
    │   ├── authRoutes.js           # Routes for authentication (login/signup)
    │   ├── adminRoutes.js          # Routes for admin functionality
    |   |-- auth.js                 # Routes for upload profileif authorized user
    |   |-- movies.js               # All movies routes here (movies routes)
    │   └── wishlistRoutes.js       # Routes for user wishlist (wishlist)
    ├── controllers/                # Controllers for handling logic
    │   ├── authController.js       # Logic for authentication (login/signup)
    │   ├── adminController.js      # Logic for admin operations
    │   └── moiveController.js      # Logic for movie operations (searchmovie, searchDeatils etc)
    |   |__ wishlistController.js   # Logic for wishlist operations ( add movies in user wishlist or delete )
    ├── models/                     # Data models (if using ORM or plain SQL)
    │   ├── dbConnection.js         # Database connection setup
    │   ├── searchModel.js          # User search History model (for SQL queries)
    │   ├── movieModel.js           # Movie model (for SQL queries)
    │   └── wishlistModel.js        # Wishlist model (for managing user wishlists)
    ├── middleware/                 # Middleware functions
    │   ├── authenticateToken.js    # Middleware for checking authentication user Token
    │   └── authMiddleware.js       # Middleware for checking user is unauthorized
    |   |__ setAuthVariable.js      # Middleware for set the Token if unathorized to authorized
    |   |__ uploadMiddleware.js     # Middleware for uploading the profile
    ├── utils/                      # Utility functions
    │   ├── recommendations.js      # Functions for recommending movies (hash maps, graphs)
    │   └── initializeData.js       # Functions for get user search history and wishlist and bulid graph
    |   |__ movieGraph.js           # Function to bulid Graph form movie data
    |   |__ searchUtils.js          # Function to search the movie data with DFS
    |   |__ sortUtils.js            # Function to sort data with using QuickSort Algo
    ├── views/                      # EJS templates
    │   ├── partials/               # Partial EJS templates (header, footer)
    │   │   ├── header.ejs          # Header template
    │   │   └── footer.ejs          # Footer template
    │   ├── index.ejs               # Home page
    │   ├── login.ejs               # Login page
    │   ├── signup.ejs              # Signup page
    │   ├── adminPanel.ejs          # Admin panel page
    |   ├── 404.ejs                 # Not found page
    |   |__ 500.ejs                 # Server not Respond
    │   |__ movie_details.ejs       # for static movie data
    |   |__ movieDetails.ejs        # for render dynamic movies data
    |   |__ SearchResults.ejs       # for search result data
    |   |__ wishlist.ejs            # for users wishlist data 
    ├── config/                     # Configuration files
    │   └── dbConfig.js             # Database configuration (MySQL/PostgreSQL)
    ├── .env                        # Environment variables (e.g., database credentials, API keys)
    ├── server.js                   # Main server file
    └── package.json                # NPM package file
## Packages

### Package.json

- First check the folder directory to write this command on your project folder then install these Packages

- **InInitializing the Package**:
``` 
npm install

```
- **Check the Package List**:
``` 
npm list

```
## The all packages listed in the package.json

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

### express-session
- **Description**: Middleware for managing user sessions in Express applications.
- **Usage**: Used to create and manage user sessions, allowing you to store user data across requests.
- **Documentation**: [Express-session Documentation](https://www.npmjs.com/package/express-session)

- **Installation**:
```
npm install express-session

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


<!-- release year , language , genre  -->