# Movie Recommendation System - Backend

This project implements the backend for a Movie Recommendation System where users can browse, rate, and review movies. The system further recommends movies based on user preferences and similar users’ activity, while also providing extensive movie details, top movie lists, and trending movie sections.
## Introduction

In this project, the backend is developed using **ExpressJS** and **MongoDB**. The design focuses on scalability, modularity, and robust endpoint implementations. Key functionalities include:

- User registration, authentication, and profile management.
- CRUD operations on movie data by administrators.
- A rating and review system for movie evaluations.
- A recommendation engine for personalized movie suggestions.
- Search, filtering, and pagination for movie lists.
- Community features, custom watchlists, and notifications.

This backend supports a comprehensive movie recommendation ecosystem and is built following industry best practices, including proper file structuring and naming conventions.
## Implementation Requirements

- **Backend Framework:** ExpressJS
- **Database:** MongoDB for storing movie and user data.
- **Authentication:** JWT-based authentication middleware.
- **Routing:** Use Express Router for modular endpoints.
- **Database Schemas:** Clearly defined models with relationships between users, movies, reviews, and recommendations.
- **Pagination:** All endpoints returning lists of objects implement backend pagination.
- **Coding Best Practices:** 
  - Proper file structure and naming conventions.
  - Secure error handling and logging.
  - Consistent endpoint responses for both success and failure cases.
## API Documentation

API endpoints are documented using **Swagger/Postman**. Detailed use case examples, including sample requests and responses (both successful and failure scenarios), are provided in a separate `documentation.docx` file that includes screenshots of Postman requests. Please refer to that document for comprehensive API usage details.
## Module Requirements

### User Authentication and Profiles
- **User Registration & Login:** JWT-based authentication.
- **Profile Management:** Create and update user profiles, including setting movie preferences (favorite genres, actors, etc.).
- **Wishlist Management:** Users can manage a personal list of movies they want to watch.

### Movie Database Management
- **CRUD Operations:** Admins can add, update, or delete movies.
- **Movie Attributes:** Title, genre, director, cast, release date, runtime, synopsis, average rating, and cover photos.
- **Additional Details:** Trivia, goofs, soundtrack information, and parental guidance.
- **Extended Profiles:** Detailed profiles for actors, directors, and crew (filmography, biography, awards, photos).

### Rating and Review Module
- **Rating:** Users can rate movies (1 to 5 scale).
- **Reviews:** Users can write, update, and view reviews.
- **Highlights:** Display top-rated and most-discussed reviews.

### Recommendation System
- **Algorithm:** Suggest movies based on user ratings, favorite genres, and similar user activity.
- **Similar Titles:** Provide a "Similar Titles" section on movie pages.
- **Personalization:** Show personalized movie recommendations on users’ homepages.
- **Trending & Top Rated:** Sections based on current user activity and ratings.

### Watchlist and Custom Lists
- **Custom Lists:** Allow users to create and share custom lists (e.g., "Best Horror Movies").
- **Following Lists:** Enable users to follow or save lists created by others.

### Search, Filter, and Advanced Filtering
- **Basic Search:** Find movies by title, genre, director, or actors.
- **Filtering Options:** Filter results by ratings, popularity, and release year.
- **Advanced Filtering:** Options such as release decade, country of origin, language, or keywords.
- **Curated Lists:** E.g., "Top Movies of the Month," "Top 10 by Genre."

### Upcoming Releases and Notifications
- **Upcoming Movies:** Display movies with future release dates.
- **Reminders:** Users can set reminders for new releases or trailers.
- **Notifications:** Email or dashboard notifications for new content in favorite genres.

### News, Articles, and Industry Updates
- **Content Section:** News and articles related to movies, actors, and projects.
- **Updates:** Regular industry updates to keep users informed.

### Box Office Information and Awards
- **Financials:** Include box office details (opening weekend, total earnings, international revenue).
- **Awards:** Display awards and nominations for movies and actors (e.g., Oscars, Golden Globes).

### User Community and Discussion Boards
- **Forums:** A community section where users can discuss movies and engage in forums.
- **Interactions:** Share opinions and discuss favorite genres or specific movies.

### Admin Operations
- **Management:** Admins manage the movie database and moderate user reviews.
- **Analytics:** View site statistics, such as popular movies and user activity.
- **Insights:** Get insights on trending genres, popular actors, and overall user engagement.
## Installation

Follow the steps below to set up the project locally:

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
2. **Install Dependencies:**

bash
```
npm install
```
3. **Configure Environment Variables:**

Create a .env file in the project root and add the following (adjust values as needed):

env
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=you_email_password
EMAIL_PASS=your_email_pass
```
4. **Run Database Migrations/Seed (if applicable):**

bash
```
npm run migrate
```

5. **Start the Server:**

bash
```
npm start
```
The server will start on the port defined in the .env file (default is 3000).


---


## Running the Project

Once installed, ensure the server is running:
- Access the API endpoints via `http://localhost:3000/`
- Use your preferred API client (like Postman) to interact with the backend.
- Refer to the provided documentation (`documentation.docx`) for sample requests and responses.
## API Testing

- **Postman Collection:** A Postman collection is included (refer to the `documentation.docx` file for screenshots and test cases).
- **Test Cases:** Endpoints have been tested for both success and error responses.
- **Usage:** Import the Postman collection into your Postman app to view detailed requests and responses.
## Contributing

Contributions are welcome! To contribute:
1. Fork the repository and create a new branch for your feature or fix.
2. Follow the project's file structure and naming conventions.
3. Ensure your changes are well tested.
4. Update the API documentation if necessary.
5. Submit a pull request with detailed explanations of your changes.
## License

This project is licensed under the MIT License.
