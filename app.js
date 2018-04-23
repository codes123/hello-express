const express = require('express');
const bodyParser = require('body-parser');
const helloWorld = require('./controllers/helloWorld');
const createShoppingList = require('./controllers/createShoppingList');
const updateShoppingList = require('./controllers/updateShoppingList');
const deleteShoppingList = require('./controllers/deleteShoppingList');

const app = express();

app.get('/', helloWorld);
app.use(bodyParser.json());
app.post('/shopping-lists', createShoppingList);

app.put('/shopping-lists/:filename', updateShoppingList);
app.use(bodyParser.json());
app.post('/shopping-lists', updateShoppingList);
app.delete('/shopping-lists/:filename', deleteShoppingList);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
