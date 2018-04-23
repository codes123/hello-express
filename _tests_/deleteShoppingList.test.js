/* eslint-env jest */
const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const deleteShoppingList = require('../controllers/deleteShoppingList');

it('deletes an existing shopping list', (done) => {
  expect.assertions(1);
  const request = httpMocks.createRequest({
    method: 'DELETE',
    url: '/shopping-lists/:filename',
    params: {
      filename: filename,
    },
  });
  const response = httpMocks.createResponse({
    eventEmitter: require('events').EventEmitter
  });

  deleteShoppingList(request, response);

  response.on('end', () => {
    const filename = response._getData().filename;
    console.log(response._getData());
    const filePath = path.join(__dirname, '../controllers/shoppingLists', filename);
    fs.writeFile(filePath, 'filename', (err) => {
    });
    fs.stat(filePath, (err, stats) => {
      expect(err.code).toBe('ENOENT');
      done();
    });
  });
});
