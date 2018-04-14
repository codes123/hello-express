const fs = require('fs');
const path = require('path');

const deleteShoppingList = (req, res) => {
  const filename = req.params.filename;
  const contents = JSON.stringify(req.body);
  fs.unlink(path.join(__dirname, 'shoppingLists', filename), contents, (err) => {
    if (err) throw err;
    res.send({ success: true });
  });
};

module.exports = deleteShoppingList;
