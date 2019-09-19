'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLACEMENT_MAP = exports.TYPE_VALUE_RESOLVER_MAP = exports.RANGE_PARSER = exports.RANGE_FORMATTER = exports.DATE_PARSER = exports.DATE_FORMATTER = exports.HAVE_TRIGGER_TYPES = exports.DEFAULT_FORMATS = exports.RANGE_SEPARATOR = undefined;

var _utils = require('./utils');

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var RANGE_SEPARATOR = exports.RANGE_SEPARATOR = ' - ';
var DEFAULT_FORMATS = exports.DEFAULT_FORMATS = {
  date: 'yyyy-MM-dd',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  week: 'yyyywWW',
  time: 'HH:mm:ss',
  timerange: 'HH:mm:ss',
  timeselect: 'HH:mm',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
};
var HAVE_TRIGGER_TYPES = exports.HAVE_TRIGGER_TYPES = ['date', 'datetime', 'time', 'timeselect', 'week', 'month', 'year', 'daterange', 'timerange', 'datetimerange'];

var DATE_FORMATTER = exports.DATE_FORMATTER = function DATE_FORMATTER(value, format) {
  return (0, _utils.formatDate)(value, format);
};
var DATE_PARSER = exports.DATE_PARSER = function DATE_PARSER(text, format) {
  return (0, _utils.parseDate)(text, format);
};
var RANGE_FORMATTER = exports.RANGE_FORMATTER = function RANGE_FORMATTER(value, format) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RANGE_SEPARATOR;

  if (Array.isArray(value) && value.length === 2) {
    var start = value[0];
    var end = value[1];

    if (start && end) {
      return (0, _utils.formatDate)(start, format) + separator + (0, _utils.formatDate)(end, format);
    }
  }
  return '';
};
var RANGE_PARSER = exports.RANGE_PARSER = function RANGE_PARSER(text, format) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RANGE_SEPARATOR;

  var array = text.split(separator);
  if (array.length === 2) {
    var range1 = array[0];
    var range2 = array[1];
    return [(0, _utils.parseDate)(range1, format), (0, _utils.parseDate)(range2, format)];
  }
  return [];
};

var TYPE_VALUE_RESOLVER_MAP = exports.TYPE_VALUE_RESOLVER_MAP = {
  default: {
    formatter: function formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser: function parser(text) {
      if (text === undefined || text === '') return null;
      return text;
    }
  },
  week: {
    formatter: function formatter(value, format) {
      if (value instanceof Date) {
        if (!format) {
          var weekNumber = (0, _utils.getWeekNumber)(value);
          return value.getFullYear() + 'w' + (weekNumber > 9 ? weekNumber : '0' + weekNumber);
        } else {
          var str = DATE_FORMATTER(value, format);
          if (str != '') {
            var weekno = (0, _utils.deconstructDate)(value).week;
            str = /WW/.test(str) ? str.replace(/WW/, weekno < 10 ? '0' + weekno : weekno) : str.replace(/W/, weekno);
          }
          return str;
        }
      }

      return '';
    },
    parser: function parser(text, format) {
      var weekno = function weekno(matcher, src) {
        var str = src.substr(matcher.index, matcher.length);
        if (/\d\d?/.test(str)) {
          return { week: Number(str), isValid: true };
        } else {
          return { week: -1, isValid: false };
        }
      };

      var date = DATE_PARSER(text, format);
      var matcher = format.match(/(WW?)/);
      var wn = null;

      if (!matcher) return date;else {
        if (text.length > format.length) return '';

        switch (matcher.length) {
          case 1:
            wn = weekno(matcher, text);
            if (!wn.isValid) return '';
            break;
          case 2:
            wn = weekno(matcher, text);
            if (!wn.isValid) return '';
            break;
          default:
            throw new Error('never reach here');
        }
        return (0, _utils.getDateOfISOWeek)(wn.week, date.getFullYear());
      }
    }
  },
  date: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  datetime: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  daterange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  datetimerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  timerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  time: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  timeselect: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  month: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  year: {
    formatter: DATE_FORMATTER,
    parser: DATE_FORMATTER
  },
  number: {
    formatter: function formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser: function parser(text) {
      var result = Number(text);

      if (!isNaN(text)) {
        return result;
      } else {
        return null;
      }
    }
  }
};

var PLACEMENT_MAP = exports.PLACEMENT_MAP = {
  left: 'bottom-start',
  // in git version 8de9d2ce, this been changed to 
  // center: 'bottom',
  // due to it's close relation to popper, I dont have enought confidence to update it right now
  center: 'bottom-center',
  right: 'bottom-end'
};
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RANGE_SEPARATOR, 'RANGE_SEPARATOR', 'src/date-picker/constants.js');
  reactHotLoader.register(DEFAULT_FORMATS, 'DEFAULT_FORMATS', 'src/date-picker/constants.js');
  reactHotLoader.register(HAVE_TRIGGER_TYPES, 'HAVE_TRIGGER_TYPES', 'src/date-picker/constants.js');
  reactHotLoader.register(DATE_FORMATTER, 'DATE_FORMATTER', 'src/date-picker/constants.js');
  reactHotLoader.register(DATE_PARSER, 'DATE_PARSER', 'src/date-picker/constants.js');
  reactHotLoader.register(RANGE_FORMATTER, 'RANGE_FORMATTER', 'src/date-picker/constants.js');
  reactHotLoader.register(RANGE_PARSER, 'RANGE_PARSER', 'src/date-picker/constants.js');
  reactHotLoader.register(TYPE_VALUE_RESOLVER_MAP, 'TYPE_VALUE_RESOLVER_MAP', 'src/date-picker/constants.js');
  reactHotLoader.register(PLACEMENT_MAP, 'PLACEMENT_MAP', 'src/date-picker/constants.js');
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();