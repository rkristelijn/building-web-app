var express = require('express');
var bookRouter = express.Router();

var router = function (nav) {
  var controller = require('../controllers/books')(null, nav);
  bookRouter.use(controller.middleware);
  bookRouter.route('/').get(controller.getIndex);
  bookRouter.route('/:id').get(controller.getById); 
  return bookRouter;
};
module.exports = router;