"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _db = _interopRequireDefault(require("../../config/db"));

var _mongodb = require("mongodb");

var _checkToken = _interopRequireDefault(require("../../utils/check-token"));

const router = _express.default.Router();

router.delete('/:commentId/remove', _checkToken.default, async (req, res) => {
  const {
    commentId
  } = req.params;
  const userId = req.user.id;

  if (!commentId) {
    return res.status(422).json({
      msg: 'Comment ID is required'
    });
  }

  const {
    db
  } = await (0, _db.default)();
  const comment = await db.collection('comments').findOne({
    _id: new _mongodb.ObjectID(commentId)
  });

  if (!comment) {
    return res.status(404).json({
      msg: 'Comment does not exist'
    });
  }

  if (comment.userId !== userId) {
    return res.status(401).json({
      msg: 'Authorization is required'
    });
  }

  await db.collection('comments').deleteOne({
    _id: new _mongodb.ObjectID(commentId)
  });
  return res.status(200).json({
    payload: {
      msg: 'Comment successfully removed'
    }
  });
});
var _default = router;
exports.default = _default;