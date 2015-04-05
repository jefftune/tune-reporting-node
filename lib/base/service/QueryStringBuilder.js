#!/usr/bin/env node
/**
 * Classes that define TUNE Advertiser Report service access.
 *
 * @module tune-reporting
 * @submodule service
 * @main tune-reporting
 *
 * @category  tune-reporting-node
 *
 * @author    Jeff Tanner <jefft@tune.com>
 * @copyright 2015 TUNE, Inc. (http://www.tune.com)
 * @license   http://opensource.org/licenses/MIT The MIT License (MIT)
 * @version   $Date: 2015-04-05 13:42:19 $
 * @link      http://developers.mobileapptracking.com @endlink
 */
"use strict";

// Dependencies
var
  _ = require('lodash'),
  querystring = require('querystring'),
  util = require('util'),
  InvalidArgument = require('../../helpers').InvalidArgument;

/**
 * Incrementally builds query string for TUNE Advertiser Report action.
 *
 * @class QueryStringBuilder
 * @constructor
 *
 */
function QueryStringBuilder() {
  this.mapQueryString = {};
}

/**
 * Add element to query string.
 *
 * @method add
 *
 * @param string name
 * @param mixed  value
 */
QueryStringBuilder.prototype.add = function (name, value, callback) {
  var sortField, sortDirection, sort_name, sort_value;

  if (!value
      || (_.isString(value) && (value.length === 0))
      ) {
    return;
  }

  if (!name
      || !_.isString(name)
      ) {
    callback(new InvalidArgument('Parameter "name" is not defined.'));
    return;
  }

  name = name.trim();

  if (name.length === 0) {
    callback(new InvalidArgument('Parameter "name" is not defined.'));
    return;
  }

  if (_.isString(value)) {
    value = value.trim();
    if (value.length === 0) {
      return;
    }
  }

  if (name === "fields") {
    /* remove extra spaces */
    value = value.replace(/\s+/g, '');
    this.encode(name, value);
  } else if (name === "sort") {
    for (sortField in value) {
      if (value.hasOwnProperty(sortField)) {
        sortDirection = value[sortField].toUpperCase();
        if (!_.contains(['ASC', 'DESC'], sortDirection)) {
          callback(new InvalidArgument('Invalid sort direction' + sortDirection));
          return;
        }
        sort_name = 'sort[' + sortField + ']';
        sort_value = sortDirection;
        this.encode(sort_name, sort_value);
      }
    }
  } else if (name === "filter") {
    value = value.replace(/\s+/g, ' ');
    this.encode(name, value);
  } else if (name === "group") {
    value = value.replace(/\s+/g, '');
    this.encode(name, value);
  } else if (_.isBoolean(value)) {
    value = (value === true) ? 'true' : 'false';
    this.encode(name, value);
  } else {
    this.encode(name, value);
  }
};

/**
 * URL query string element's name and value
 *
 * @method encode
 *
 * @param string name
 * @param mixed  value
 */
QueryStringBuilder.prototype.encode = function (name, value) {
  this.mapQueryString[name] = value;
};

/**
 * Return built query string
 *
 * @property getQueryStringMap
 *
 * @return associative array
 */
QueryStringBuilder.prototype.getQueryStringMap = function () {
  return this.mapQueryString;
};

/**
 * Custom string representation of object
 *
 * @method toString
 *
 * @return {String}
 */
QueryStringBuilder.prototype.stringify = function () {
  return querystring.stringify(this.mapQueryString);
};

module.exports = QueryStringBuilder;