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

---

📁 **Each part is inside its own folder** with clear component structure and code.

➡️ This work is part of the [Full Stack Open](https://fullstackopen.com/en) course.

