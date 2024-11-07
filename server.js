const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/adminRoutes');
const moviesRouter = require('./routes/movies');
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middleware/authenticateToken');
const setAuthVariables = require('./middleware/setAuthVariables');
const movies = require(path.join(__dirname, 'public', 'js', 'movies'));
const pool = require('./models/dbConnection');  // Import the pool
const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(authenticateToken);
app.use(setAuthVariables);

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/movies', moviesRouter);

app.use('/', moviesRouter); // Use movieRouter for home page

// console.log('Movies array loaded:', movies);  // Log the movies array to verify it's loaded correctly

app.get('/movie/:title', (req, res) => {
    const movieTitle = decodeURIComponent(req.params.title);
    // console.log('Requested movie title:', movieTitle);  // Check title being requested

    const movie = movies.find(m => m.title === movieTitle);
    // console.log('Movie data array:', movies);  // Log the entire movies array to ensure it's loaded

    if (movie) {
        // console.log('Movie found:', movie);
        res.render('movie_details', { movie });
    } else {
        // console.error('Movie not found');
        res.status(404).render('404');  // Render a 404 page if the movie is not found
    }
});



app.get('/', async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        let user = {};
        if (userId) {
            const connection = await pool.getConnection();
            const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);
            user = rows[0];
            connection.release();
        }
        const searchTerm = req.query.q || '';
        res.render('index', { user, searchTerm });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).render('500');
    }
});

app.get('/admin', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [users] = await connection.query('SELECT * FROM users');
        connection.release();
        const adminName = req.user ? req.user.username : 'Admin';
        res.render('adminPanel', { adminName, users });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).render('500');
    }
});

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
