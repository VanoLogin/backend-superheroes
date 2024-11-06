### Superheroes API

Superheroes API is a server-side application for managing data about superheroes. This API supports creating, reading, updating, and deleting data (CRUD), implementing pagination and validating data.

### Technologies and libraries

Node.js is the main server platform.
Express is a web framework for creating REST APIs.
MongoDB with Mongoose is a database and ODM for working with MongoDB.
Cloudinary is an image storage service used to upload hero photos.
Joi is a library for validating input data.
dotenv is for storing environment variables (for example, access keys to Cloudinary, MongoDB, and other configurations).
eslint is a tool for ensuring code quality and JavaScript writing style.

### Project structure

/controllers are controllers for processing the logic of CRUD operations.
/middlewares are middlewares for validation, error handling, and file uploading.
/routes – routes for defining API endpoints and their handlers.
/db – MongoDB (Mongoose) database configurations and schemas.
/utils – utility functions such as pagination handling.

### Main functions

1. CRUD Operations for superheroes
Create superhero: Create a new hero object with required fields such as nickname, realName, originDescription, catchPhrase, and superpowers.
Get list of heroes: Enables pagination (default 5 heroes per page), no filters or sorting.
Update hero: Supports changing hero data, including uploading new images.
Delete hero: Delete a hero record.
2. Pagination
Implemented pagination with dynamic parameters page and perPage, where page is the page number, perPage is the number of elements on the page. This allows for easy navigation through a large number of records.

3. Data validation
Joi is used to check the correctness of the data before saving it:

createSuperHeroesSchema – a schema for validating input data when creating a hero.
updateSuperHeroSchema – a schema for validating data when updating a hero.
4. Error handling
The ctrlWrapper middleware wraps controllers for error handling and sends them to a centralized handler, where errors are intercepted and returned in JSON format with the appropriate statuses.

### API routes

/api/superheroes
POST /superheroes – creating a new superhero (with data validation and image loading).
GET /superheroes – getting a list of superheroes with pagination support.
PATCH /superheroes/:id – updating superhero data by ID.
DELETE /superheroes/:id – deleting a superhero by ID.

### Middleware and utilities

jsonParser – built-in Express middleware for parsing JSON.
validateBody – middleware for validating the request body using Joi.
ctrlWrapper – middleware for wrapping controllers to handle errors in them.
parsePaginationParams – function for handling pagination parameters.


#### The project is deployed on the Render platform, which ensures the API is available to external users. In the current implementation, images are saved by a link (for example, Google Drive), but in the future it will be easy to integrate Cloudinary for storing photos, so that only links to images are stored in the database. Such an architecture will reduce the amount of data stored on the server and increase the scalability of the application.
