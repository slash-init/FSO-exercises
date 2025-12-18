# Full Stack Open

This repository contains my solutions for the Full Stack Open course by the University of Helsinki.

## ✅ Part 0 - Fundamentals of Web Apps

### Exercises 0.1 - 0.6

| Exercise | Topic | Description |
|----------|-------|-------------|
| 0.1 | Diagram | Created a diagram showing the browser-server interaction. |
| 0.2 - 0.3 | HTML Forms | Created diagrams for new note submission and single-page app flow. |
| 0.4 - 0.6 | REST, Web Dev Basics | Drew diagrams of a new note being added via HTTP POST, learned about npm and deploying frontend using `npm run build`. |

---

## ✅ Part 1 - Introduction to React

### 1.1 - 1.5: Course Information

| Exercise | Description |
|----------|-------------|
| 1.1 - 1.2 | Rendered course info using basic JSX and props. |
| 1.3 | Calculated total exercises in multiple parts. |
| 1.4 | Used components and props to structure code. |
| 1.5 | Refactored code into multiple components. |

### 1.6 - 1.14: Unicafe (Feedback App)

| Exercise | Description |
|----------|-------------|
| 1.6 - 1.9 | Built feedback system with state (`useState`) for good, neutral, bad counts. |
| 1.10 - 1.11 | Calculated statistics (average, positive %) using conditionals. |
| 1.12 - 1.14 | Refactored statistics into a table with components. |

### 1.15 - 1.18: Anecdotes

| Exercise | Description |
|----------|-------------|
| 1.15 - 1.16 | Displayed random anecdotes and allowed voting. |
| 1.17 - 1.18 | Showed most voted anecdote and improved voting logic. |

---

## ✅ Part 2 - Communicating with Server

### 2.1 - 2.5: Course Information (modular)

| Exercise | Description |
|----------|-------------|
| 2.1 - 2.3 | Refactored course info using array mapping and modular components. |
| 2.4 - 2.5 | Rendered total exercises and handled multiple course parts. |

### 2.6 - 2.11: Phonebook

| Exercise | Description |
|----------|-------------|
| 2.6 | Added phone number to each contact. |
| 2.7 - 2.8 | Enabled conditional rendering and filtering of names. |
| 2.9 - 2.10 | Used controlled input fields and implemented add contact functionality. |
| 2.11 | Prevented duplicates and improved form logic. |

### 2.12 - 2.20: Connecting to Server (Phonebook Backend)

| Exercise | Description |
|----------|-------------|
| 2.12 - 2.13 | Fetched data from server using `axios` and `useEffect`. |
| 2.14 | Added new contacts to server with HTTP POST. |
| 2.15 - 2.16 | Implemented delete contact and proper state update. |
| 2.17 - 2.18 | Displayed error and success messages (notifications). |
| 2.19 - 2.20 | Added functionality to update existing numbers and handle server-side errors. |

### 2.21 - 2.25: Countries App

| Exercise | Description |
|----------|-------------|
| 2.21 - 2.23 | Fetched country data from REST API and implemented filtering. |
| 2.24 - 2.25 | Integrated weather API and displayed live weather for selected country. |

---

### ✅ Part 3 - Phonebook Backend

| Exercise | Description |
|----------|-------------|
| 3.1 | Set up a basic Express server and created a `/api/persons` endpoint to return all phonebook entries as JSON. |
| 3.2 | Added an `/info` endpoint that displays the number of people in the phonebook and the current date/time. |
| 3.3 | Implemented fetching a single person by id using route parameters (`/api/persons/:id`). |
| 3.4 | Added the ability to delete a person by id with the DELETE method. |
| 3.5 | Implemented adding new persons to the phonebook with POST requests, including generating a unique id for each new entry. |
| 3.6 | Added error handling for missing name/number and prevented duplicate names in the phonebook. |
| 3.7 | Added HTTP request logging to the backend using the Morgan middleware for better visibility of incoming requests. |
| 3.8 | Customized Morgan to log the request body for POST requests by defining a custom token. |
| 3.9 | Made the backend work seamlessly with the phonebook frontend by connecting API endpoints and ensuring proper data flow. |
| 3.10 | Deployed the backend to the internet, making the API accessible remotely. |
| 3.11 | Generated a production build of the frontend and served it from the backend, making the full application accessible as a single unit. [Live demo](https://the-phonebook-y2f0.onrender.com/) |
| 3.12 | Set up MongoDB connection with Mongoose, created a command-line interface for adding and viewing phonebook entries directly from the database. |
| 3.13 | Modified the phonebook backend to fetch all entries from MongoDB instead of hardcoded array data, ensuring frontend integration remains functional. |
| 3.14 | Updated the POST endpoint to save new phonebook entries directly to the MongoDB database, with Mongoose-specific code organized into separate modules. |
| 3.15 | Implemented database-backed deletion functionality, ensuring that DELETE operations remove entries from MongoDB and maintain frontend compatibility. |
| 3.16 | Centralized error handling by implementing dedicated error handler middleware to process MongoDB errors like CastError and ValidationError with appropriate HTTP status codes. |
| 3.17 | Enhanced the PUT endpoint to support updating existing phonebook entries in the database, enabling frontend to seamlessly update phone numbers for existing contacts. |
| 3.18 | Completed full database integration by updating all remaining routes (GET single person, info endpoint) to use MongoDB, ensuring consistent data persistence across the entire API. |
| 3.19 | Added Mongoose validation to ensure names are at least three characters long. Updated the frontend to display error messages from the backend when validation fails, using catch blocks and notifications. |
| 3.20 | Implemented custom validation for phone numbers: numbers must be at least 8 characters, follow the format `XX-XXXXXXX` or `XXX-XXXXXXX`, and only contain digits separated by a single dash. The backend responds with clear error messages and status codes for invalid numbers. |
| 3.21 | Built a production version of the frontend and served it from the backend. Deployed the backend (including the integrated frontend) to Render, verifying full-stack functionality at the cloud URL. |
| 3.22 | Added ESLint configuration to the backend for consistent code style and quality. Fixed all stylistic warnings and errors reported by ESLint across the backend codebase. |

---

### ✅ Part 4 - Blog List

| Exercise | Description |
|----------|-------------|
| 4.1 | Turned the blog list backend into a functioning npm project. Configured development with `node --watch` for automatic restarts. Connected to MongoDB Atlas (or reused previous database). Verified adding and retrieving blogs using Postman or VS Code REST client. |
| 4.2 | Refactored the application into separate modules for better structure and maintainability, following best practices from the course. Refactored incrementally, testing after each change and committing stable code to make rollbacks easy. Ensured `app.use(express.json())` is included to correctly parse request bodies and avoid issues with `content.body` being undefined. |
| 4.3 | Added a dummy helper function and verified the test setup for blog utilities. Ensured the test environment works by checking that the dummy function always returns 1. |
| 4.4 | Implemented a `totalLikes` helper function to calculate the sum of likes for a list of blogs. Wrote grouped unit tests to verify correct behavior for single and multiple blog lists. |
| 4.5 | Created a `favoriteBlog` function to find the blog with the most likes. Wrote tests to confirm it returns any blog with the highest likes, handling ties as acceptable. |
| 4.6 | Developed a `mostBlogs` function using Lodash to determine which author has written the most blogs. Added tests to check correct author and blog count are returned. |
| 4.7 | Built a `mostLikes` function to find the author whose blogs have the highest total likes, leveraging Lodash for aggregation. Verified with tests that any top author is accepted in case of ties. |

| 4.8 | Set up SuperTest for HTTP testing. Wrote a GET test for `/api/blogs` to verify correct blog count in JSON format. Configured separate test database (TEST_MONGODB_URI). Refactored route handlers to use async/await instead of promises. |
| 4.9 | Added toJSON schema method to transform MongoDB's `_id` to `id` in API responses. Wrote test to verify the unique identifier is named `id` (not `_id`). |
| 4.10 | Wrote POST test to verify new blogs are created and count increases. Verified blog content is saved correctly. Refactored POST handler to async/await. |
| 4.11 | Wrote test to verify `likes` defaults to 0 if missing from request. Updated Blog schema to set default value: `{ type: Number, default: 0 }`. |
| 4.12 | Wrote tests to verify POST returns 400 Bad Request when `title` or `url` are missing. Made both fields required in schema: `{ type: String, required: true }`. Added error handler middleware to catch ValidationError and respond with 400. |

---

📁 **Each part is inside its own folder** with clear component structure and code.

➡️ This work is part of the [Full Stack Open](https://fullstackopen.com/en) course.

