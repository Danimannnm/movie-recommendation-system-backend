const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGOURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const movieRoutes = require('./routes/movies');
const actorRoutes = require('./routes/actors');
const directorRoutes = require('./routes/directors');
const crewMemberRoutes = require('./routes/crewMembers');
const reviewRoutes = require('./routes/reviews');
const recommendationRoutes = require('./routes/recommendations');
const listRoutes = require('./routes/lists');
const searchRoutes = require('./routes/search');
const upcomingRoutes = require('./routes/upcoming');
const testRoutes = require('./routes/test');
const newsRoutes = require('./routes/news');
const forumsRoutes = require('./routes/forums');
const threadsRoutes = require('./routes/threads');
const postsRoutes = require('./routes/posts');
const adminRoutes = require('./routes/admin');
// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/actors', actorRoutes);
app.use('/api/directors', directorRoutes);
app.use('/api/crewMembers', crewMemberRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/upcoming', upcomingRoutes);
app.use('/api/test', testRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/forums', forumsRoutes);
app.use('/api/threads', threadsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/admin', adminRoutes);

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Recommendation API',
      version: '1.0.0',
      description: 'API for movie recommendations system'
    },
    servers: [
      {
        url: 'http://localhost:5000'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

require('./tasks/scheduler');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 