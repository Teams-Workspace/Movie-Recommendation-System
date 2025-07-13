# Movie Recommendation Web App

![Movie Recommendation Web App](https://github.com/Teams-Workspace/Movie-Recommendation-System/blob/main/frontend/public/Logo.png)  
A dynamic web application designed to provide personalized movie recommendations, allowing users to search, view, like, and manage a watchlist of movies tailored to their preferences.

## 🌟 Overview

The **Movie Recommendation Web App** enhances the movie-watching experience by offering personalized suggestions based on users' viewing history, ratings, and preferences. With a sleek interface, users can effortlessly search for movies, like their favorites, and curate a personalized watchlist. Powered by advanced data filtering and recommendation algorithms, the app ensures a seamless and engaging user experience.

🔗 **Live Demo**: [mrsapp.netlify.app](https://mrsapp.netlify.app/)

## ✨ Features

- **Search Movies**: Quickly find movies by title, genre, or other criteria.
- **Like & Watchlist**: Like movies to show your preferences and add them to your personalized watchlist.
- **Responsive Design**: Enjoy a seamless experience across desktop and mobile devices.
- **Efficient Data Handling**: Powered by modern tools like Redux Toolkit and TanStack React Query for smooth state management and data fetching.

## 🛠️ Tech Stack

### Frontend
- **ReactJS**: For building a dynamic and interactive user interface.
- **Redux & Redux Toolkit**: For efficient state management.
- **React Router**: For seamless navigation between pages.
- **TanStack React Query**: For optimized data fetching and caching.

### Backend
- **Node.js**: For robust server-side logic and API handling.
- **Nodemon**: For automatic server restarts during development.

### Topics
- `redux`
- `nodejs`
- `react-router`
- `reactjs`
- `nodemon`
- `redux-thunk`
- `redux-toolkit`
- `tanstack-react-query`

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm , bun or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Teams-Workspace/Movie-Recommendation-System
   ```
2. Navigate to the project directory:
   ```bash
   cd movie-recommendation-web-app
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

### Running the App
1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```
2. Start the frontend:
   ```bash
   cd client
   npm start
   ```
3. Open your browser and visit `http://localhost:5000` to explore the app.

## 📖 API Endpoints
- `GET /api/movies`: Fetch a list of movies.
- `GET /api/movies/:id`: Get details for a specific movie.
- `POST /api/watchlist`: Add a movie to the user's watchlist.
- `POST /api/like`: Like or unlike a movie.

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## 📝 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📬 Contact
For questions or feedback, reach out via [email@example.com](itsmesaad@gmail.com) or open an issue on GitHub.

---

Built with ❤️ by Saad Ali
Happy movie watching! 🎬
