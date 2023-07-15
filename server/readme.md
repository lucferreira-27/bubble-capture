# Sequelize + Express - Template

This is an example of how to setup Sequelize and Express together

## See it in action

* Install dependencies with `npm install` or `yarn install`
* Setup the database with `npm run setup-example-db`
* Run the express server with `npm start`

## Hot reloading Express app

Hot reloading allows you to see the changes that you have made in the code without reloading your entire app.

### Nodemon

* Install nodemon globally on your machine `npm install -g nodemon`
* Install nodemon on your project as dev-dependency `npm install nodemon --save-dev`
* Replace in package.json `node your-app-name.js` to `nodemon your-app-name.js`

#### before 
```javascript
"scripts": {
  "start": "node your-app-name.js"
}
```
#### after
```javascript
"scripts": {
  "start": "nodemon  your-app-name.js"
}
```
* Now the hot reload is active just run the express server with `npm start` and enjoy!



## License

MIT
