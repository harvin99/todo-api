# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

link docs: https://dummyjson.com/docs/todos

Require: Create an app todo using data from api TODO
endpoint API: https://dummyjson.com/
GET list todos: https://dummyjson.com/todos
example: 
    fetch('https://dummyjson.com/todos')
    .then(res => res.json())
    .then(console.log);

GET TODO by id: https://dummyjson.com/todos/1
example:
    fetch('https://dummyjson.com/todos/1')
    .then(res => res.json())
    .then(console.log);

ADD NEW TODO: 
example: 
    fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        todo: 'Use DummyJSON in the project',
        completed: false,
        userId: 5,
    })
    })
    .then(res => res.json())
    .then(console.log);

UPDATE A TODO

example
    /* updating completed status of todo with id 1 */
    fetch('https://dummyjson.com/todos/1', {
    method: 'PUT', /* or PATCH */
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        completed: false,
    })
    })
    .then(res => res.json())
    .then(console.log);

DELETE A TODO
 example:
    fetch('https://dummyjson.com/todos/1', {
    method: 'DELETE',
    })
    .then(res => res.json())
    .then(console.log);