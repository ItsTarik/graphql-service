'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filter = function filter(predicateObj) {
  return function (list) {
    var predicates = (0, _keys2.default)(predicateObj).reduce(function (fns, key) {
      return [].concat((0, _toConsumableArray3.default)(fns), [function (item) {
        return item[key] === predicateObj[key];
      }]);
    }, []);

    var predicatesRunner = function predicatesRunner(predicates) {
      return function (obj) {
        return predicates.reduce(function (acc, predicate) {
          return acc && predicate(obj);
        }, true);
      };
    };

    var filterRes = list.reduce(function (resAcc, item) {
      return predicatesRunner(predicates)(item) && [].concat((0, _toConsumableArray3.default)(resAcc), [item]) || resAcc;
    }, []);
    return filterRes;
  };
};

var exist = function exist(collection) {
  return function (id) {
    return collection.reduce(function (acc, item) {
      return acc && acc || item.id === id;
    }, false);
  };
};

var buildCollection = function buildCollection(initialValue) {
  var collection = initialValue;
  var handlers = {
    create: function create(newItem) {
      var recordExist = exist(collection)(newItem.id);
      console.log(recordExist);
      if (!recordExist) {
        collection = [].concat((0, _toConsumableArray3.default)(collection), [newItem]);
        return { createdAt: new Date().getTime(), created: newItem };
      }
      throw new Error('this record exists already.');
    },
    find: function find(predicateObj) {
      return filter(predicateObj)(collection);
    },
    update: function update(predicateObj, fragment) {
      var match = filter(predicateObj)(collection);
      var updates = match.reduce(function (acc, matched) {
        var matchedIndex = collection.findIndex(function (item) {
          return item.id === matched.id;
        });
        if (matchedIndex > -1) {
          var updatedItem = (0, _extends3.default)({}, collection[matchedIndex], fragment);
          collection = [].concat((0, _toConsumableArray3.default)(collection.slice(0, matchedIndex)), [updatedItem], (0, _toConsumableArray3.default)(collection.slice(matchedIndex + 1)));
          return [].concat((0, _toConsumableArray3.default)(acc), [updatedItem]);
        }
        return acc;
      }, []);
      return updates;
    },
    remove: function remove(ids) {
      (function (ids) {
        return Array.isArray(ids) ? ids : [ids];
      })(ids).forEach(function (id) {
        var matchedIndex = collection.findIndex(function (item) {
          return item.id === id;
        });
        if (matchedIndex > -1) {
          collection = [].concat((0, _toConsumableArray3.default)(collection.slice(0, matchedIndex)), (0, _toConsumableArray3.default)(collection.slice(matchedIndex + 1)));
        }
      });
    },
    count: function count() {
      return collection.length;
    }
  };
  return handlers;
};

exports.default = buildCollection;