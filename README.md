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

### ✅ Part 3 - Programming a server with NodeJS and Express

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

### ✅ Part 4 - Testing Express servers, user administration

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
| 4.13 | Implemented DELETE `/api/blogs/:id` using async/await to remove a blog. Added tests to verify 204 No Content and that the blog id no longer exists after deletion. |
| 4.14 | Implemented PUT `/api/blogs/:id` using async/await to update a blog (primarily `likes`). Used `{ new: true, runValidators: true }` to return the updated doc and enforce schema rules. Added tests to verify likes update and full blog update. |
| 4.15 | Added user management: created users via `POST /api/users` with `username`, `name`, and `password`. Stored only `passwordHash` using `bcrypt`. Implemented `GET /api/users` to list users. |
| 4.16* | Enforced user creation rules: `username` and `password` required, both ≥ 3 chars; `username` unique. Validated `password` in controller, not via Mongoose. Wrote tests ensuring invalid users return 400 with clear errors. |
| 4.17 | Expanded blogs with creator info: saved `blog.user` referencing the creator and used `populate('user', { username, name })` in blog listing. Also populated `users` with their `blogs`. Initially designated any existing user as creator. |
| 4.18 | Implemented token-based authentication: login issues JWT signed with `SECRET`; clients send `Authorization: Bearer <token>`. Verified tokens with `jwt.verify` during protected actions. |
| 4.19 | Required a valid token to create blogs. Used the token’s user id as the creator when saving the new blog. |
| 4.20* | Refactored token extraction to middleware: `tokenExtractor` reads `Authorization` and assigns `request.token`. Registered before routers so handlers can access `request.token`. |
| 4.21* | Restricted deletion to owner-only: DELETE checks that the requester’s user id (from token) matches `blog.user`. Returned 401 on missing/invalid token and 403 when not the owner. Compared ids with `.toString()` or `equals`. |
| 4.22* | Added `userExtractor` middleware: decodes JWT, fetches the `User`, and attaches `request.user`. Applied selectively to `POST /api/blogs` and `DELETE /api/blogs/:id` so GET remains public. Handlers read `request.user` directly. |
| 4.23* | Fixed tests after auth: updated POST tests to include a valid Bearer token and added a new test verifying 401 Unauthorized when no token is provided. Centralized a `getAuthToken` helper in test utilities. |

---

### ✅ Part 5 - Testing React Apps

| Exercise | Description |
|----------|-------------|
| 5.1 | Implemented login functionality with conditional rendering. Login form displays when user is not logged in; blog list displays when authenticated. Token from successful login is saved to application state (`user`). Uses state management with `useState` hook. |
| 5.2 | Made login persistent using browser's local storage (`localStorage`). User details are automatically restored on page refresh. Implemented logout functionality that clears user state and removes credentials from local storage. |
| 5.3 | Expanded the application to allow logged-in users to add new blogs via a form. Form includes fields for title, author, and URL. New blogs are sent to backend and added to the blog list after successful creation. |
| 5.4 | Implemented toast-style notifications for user feedback. Notifications display at the top of the page for successful operations (e.g., "A new blog added") and failed operations (e.g., "Failed to add blog"). Notifications auto-dismiss after 5 seconds using `setTimeout`. |
| 5.5 | Show the blog creation form only when appropriate: hide it by default and toggle visibility (e.g. with `Togglable`). Show on "create new blog" and hide after creation or cancel. |
| 5.6 | Move the blog creation form into a `BlogForm` component. Keep all form state (controlled inputs) inside that component and pass the created blog to the parent via a callback prop. |
| 5.7 | Add per-blog visibility state inside `Blog` to toggle full details (url, likes, user) with a "view" / "hide" button. Use inline styles for layout. |
| 5.8 | Implement the like button: increase likes by sending a PUT to `/api/blogs/:id`. Because the backend replaces the resource, include `{ user: <userId>, likes, author, title, url }` in the request and update client state with the response. |
| 5.9 | Fix missing user info after liking by returning the updated blog with populated `user` from the backend (use `.populate('user', { username:1, name:1 })`) or make the frontend handle both id and populated user forms. |
| 5.10 | Sort blogs by likes before rendering: use `[...blogs].sort((a,b) => b.likes - a.likes).map(...)` to show most liked first and avoid mutating state by copying the array. |
| 5.11 | Add blog deletion: show a "remove" button only to the blog owner, confirm with `window.confirm`, call DELETE with the auth token, and remove the blog from state on success. |
| 5.12 | Add ESLint to the project and define configuration in `eslint.config.js`. Fix all linter errors, install necessary ESLint packages (e.g. `eslint`, `@eslint/js`, `eslint-plugin-react`, `eslint-plugin-react-hooks`), and add `lint`/`lint:fix` npm scripts. |
| 5.13 | Component tests for the `Blog` component: verify title and author are shown by default and that URL and likes are hidden. Added CSS classes to `Blog` to support testing (`blog`, `blogSummary`, `blogDetails`, `blogUrl`, `blogLikes`). |
| 5.14 | Test that clicking the `view` button reveals the blog's URL and number of likes. |
| 5.15 | Test that clicking the `like` button twice calls the provided update handler twice (use `vi.fn()` to mock the handler). |
| 5.16 | Test for the `BlogForm` component: ensure the `createBlog` handler is called with the correct title, author and url when the form is submitted. |
| 5.17 | Created a new npm project for E2E tests and configured Playwright. Implemented test to verify the application displays the login form by default with proper imports (`test`, `expect`, `beforeEach`, `describe`). |
| 5.18 | Added login tests for both successful and failed login attempts. Implemented `beforeEach` block to reset the database via `/api/testing/reset` endpoint and create test user. Used `request` fixture to make API calls for setup. |
| 5.19 | Created test to verify logged-in user can create a new blog. Implemented nested describe block "When logged in" with `beforeEach` for login. Test ensures created blog appears in the blog list. |
| 5.20 | Implemented test to verify blog can be liked. Test clicks "view" button to expand blog details, clicks "like" button, and verifies the like count increases by checking the updated likes display. |
| 5.21 | Added test ensuring user who created blog can delete it. Implemented `page.on('dialog')` listener to handle `window.confirm` dialog by accepting it automatically. Verified blog disappears from list after deletion. |
| 5.22 | Created test verifying only blog creator sees delete button. Logged out first user, created and logged in second user via API, verified remove button is not visible for blogs created by other users. |
| 5.23 | Implemented test ensuring blogs are ordered by likes in descending order. Created multiple blogs with different like counts, used specific blog locators with `hasText` filter, waited for like updates with `expect(...).toBeVisible()`, and verified proper ordering after likes. |

---

## ✅ Part 6 - Advanced State Management

| Exercise | Description |
|----------|-------------|
| 6.1 | Implemented `counterReducer` to store feedback counts in Redux state: `{ good, ok, bad }`. Handled actions `GOOD`, `OK`, `BAD`, and `RESET`. Added unit tests using `vitest` and `deep-freeze` to ensure immutability and correct behavior. |
| 6.2 | Connected the Redux store to a simple UI. Implemented `main.jsx` to create the store, dispatch actions from buttons, and subscribe to re-renders. The UI shows buttons for `good`, `ok`, `bad`, and a reset button, and displays current counts. |
| 6.3 | Implemented voting for anecdotes: added `vote` action creator and reducer logic to increment an anecdote's `votes` in the Redux store. UI dispatches the `vote` action when the vote button is clicked. |
| 6.4 | Implemented adding new anecdotes: added `createAnecdote` action creator and reducer handling for `NEW_ANECDOTE`. The UI form dispatches `createAnecdote(content)` (uncontrolled form) and clears the input after submission. |
| 6.5 | Ensured anecdotes are ordered by votes: the list is sorted descending by `votes` before rendering so the most-voted anecdotes appear first. |
| 6.6 | Moved action creators into `src/reducers/anecdoteReducer.js`: both `vote` and `createAnecdote` return FSA-style actions (`{ type, payload }`) and are imported where used. |
| 6.7 | Extracted creation logic into `AnecdoteForm` component: created `src/components/AnecdoteForm.jsx` which contains the uncontrolled form, prevents default submit, reads the input value and dispatches `createAnecdote`. |
| 6.8 | Extracted list and voting UI into `AnecdoteList` component: created `src/components/AnecdoteList.jsx` which selects, sorts, renders anecdotes and dispatches `vote` on item clicks. |
| 6.9 | Implemented filtering for anecdotes: added `filter` reducer and `setFilter` action, `Filter` component dispatches filter changes to Redux, and the list component reads `state.filter` to display a case-insensitive filtered and sorted anecdotes list. |
| 6.10 | Installed Redux Toolkit (`@reduxjs/toolkit`). Migrated store creation to use `configureStore` from Redux Toolkit in `store.js`. Converted `filterReducer` to use `createSlice` function, eliminating manual action type strings and switch statements. Redux DevTools automatically enabled by `configureStore`. |
| 6.11 | Converted `anecdoteReducer` to use Redux Toolkit's `createSlice`. Simplified reducer logic by leveraging Immer for direct state mutations (`state.push()`, `anecdote.votes += 1`). Action creators (`createAnecdote`, `vote`) are auto-generated from reducer names. |
| 6.12 | Created `notificationReducer` using `createSlice` to manage notification messages in Redux state. Connected `Notification` component to Redux store using `useSelector` hook to display messages. Component renders notification with styled border, or returns `null` when empty. |
| 6.13 | Implemented timed notifications: when user votes or creates an anecdote, a notification message appears for 5 seconds then clears automatically. Used `setNotification` and `clearNotification` actions with `setTimeout` to dispatch clearing action after 5000ms. Messages display format: "you voted 'anecdote'" and "you created 'anecdote'". |
| 6.14 | Fetched anecdotes from a `json-server` backend on application startup using the Fetch API (`anecdoteService.getAll()`), then loaded them into Redux state with `setAnecdotes`. |
| 6.15 | Persisted new anecdotes to the backend using Fetch POST (`anecdoteService.createNew(content)`) and updated Redux state with the anecdote object returned by the server. |
| 6.16 | Initialized anecdotes via an async thunk that fetches from the backend and dispatches `setAnecdotes` on app load. |
| 6.17 | Created anecdotes through an async thunk that posts to the backend and appends the returned anecdote to Redux state. |
| 6.18 | Persisted voting by calling the backend with an async thunk and updating state with the saved anecdote. |
| 6.19 | Added a timed notification thunk that accepts a message and duration (seconds), auto-clearing after the delay; integrated it for voting and creation flows. |
| 6.20 | Rebuilt anecdotes with React Query: fetches anecdotes with `useQuery`, shows loading state, and renders an error page when the service is unavailable. |
| 6.21 | Added React Query mutation to post new anecdotes (Fetch API); on success updates the cache so the new anecdote appears immediately. |
| 6.22 | Implemented voting via React Query mutation; persisted votes to the server and updated the cached list so vote counts refresh automatically. |
| 6.23 | Implemented notification state management using `useReducer` hook and context; notifications display for five seconds when anecdotes are created or voted on. |
| 6.24 | Added error handling for POST requests; displays error notifications when content validation fails (must be ≥5 characters). |

---

## ✅ Part 7 - React Router, Custom Hooks, Styling App with CSS and Webpack

| Exercise | Description |
|----------|-------------|
| 7.1 | Added React Router to the application with routes for home, create new, and about pages. Menu uses Link components for navigation. Footer stays visible at bottom across all routes. |
| 7.2 | Implemented single anecdote view using route parameters (`:id`). Used `useParams` hook to extract id and display individual anecdote details. AnecdoteList links to detail pages. |
| 7.3 | Improved create form with automatic navigation to home after submission using `useNavigate`. Added success notification that displays for 5 seconds and auto-dismisses. |
| 7.4 | Created `useField` custom hook to simplify form input management. Moved hook to `/src/hooks/index.js` using named exports. Hook returns type, value, and onChange properties for spreading into inputs. |
| 7.5 | Added reset button to clear all form fields. Extended `useField` hook with reset function to clear field values. Button uses `type="button"` to prevent form submission. |
| 7.6 | Fixed "Invalid value for prop reset" warning by restructuring hook return. Modified `useField` to separate input props from reset function, preventing reset from being spread as invalid HTML attribute. |
| 7.7 | Implemented `useCountry` custom hook to fetch country details from REST API. Used `useEffect` with dependency array to control API calls. Hook returns object with `found` status and country data, handling both successful and failed requests. |
| 7.8 | Created `useResource` hook to abstract backend communication. Hook fetches all resources on mount using `useEffect` and provides `create` method for POST requests. Returns array with resources and service object, making it reusable for different REST endpoints. |

---
📁 **Each part is inside its own folder** with clear component structure and code.


➡️ This work is part of the [Full Stack Open](https://fullstackopen.com/en) course.

---

