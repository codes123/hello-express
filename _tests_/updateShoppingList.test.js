/* eslint-env jest */
const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const updateShoppingList = require('../controllers/updateShoppingList');


it('updates an existing shopping list', (done) => {
  expect.assertions(1);  
  const filename = Date.now().toString(); 
  const body = {
    items: ['carrots', 'crunchies', 'cornflakes']
  };
  const request = httpMocks.createRequest({
    method: 'PUT',
    url: '/shopping-lists/:filename',
    params: {
      filename,
    },
    body, 
  });

  const response = httpMocks.createResponse({
    eventEmitter: require('events').EventEmitter,
  });

  updateShoppingList(request, response);

  response.on('end', () => {
    const filename = response._getData().filename;
    console.log(response._getData());
    const filePath = path.join(__dirname, '../controllers/shoppingLists', filename);

    fs.readFile(filePath, 'utf8', (error, data) => {
      expect(data).toBe(JSON.stringify(request.body));
      done();
    });
  });
});