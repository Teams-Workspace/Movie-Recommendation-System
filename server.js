const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/adminRoutes');
const moviesRouter = require('./routes/movies');
const authRoutes = require('./routes/authRoutes');
const setAuthVariables = require('./middleware/setAuthVariables');
const pool = require('./models/dbConnection');
const wishlistRouter = require('./routes/wishlistRouter');
const authenticateToken = require('./middleware/authenticateToken');
const { initializeData } = require('./utils/initializeData');

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

// Apply middleware to set authentication variables
app.use(authenticateToken);
app.use(setAuthVariables);

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/movies', moviesRouter);
app.use('/wishlist', authenticateToken, wishlistRouter);
app.use('/', moviesRouter); // Use movieRouter for home page

initializeData().catch(err => console.error('Error initializing data:', err));

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
