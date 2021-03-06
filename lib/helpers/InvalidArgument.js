#!/usr/bin/env node
/**
 * Classes that define TUNE Reporting API utilities.
 *
 * @module tune-reporting
 * @submodule helpers
 * @main tune-reporting
 *
 * @category  tune-reporting-node
 *
 * @author    Jeff Tanner <jefft@tune.com>
 * @copyright 2015 TUNE, Inc. (http://www.tune.com)
 * @license   http://opensource.org/licenses/MIT The MIT License (MIT)
 * @version   $Date: 2015-01-06 00:55:16 $
 * @link      http://developers.mobileapptracking.com @endlink
 */
"use strict";

var
  LogicError = require('./LogicError'),
  util = require('util');

/**
 * Invalid Argument Error.
 *
 * @class InvalidArgument
 * @constructor
 * @extends LogicError
 *
 * @param string message
 * @param string value
 */
function InvalidArgument(message, value) {
  this.message = message || util.format('Invalid argument provided: "%s"', value);
  this.value = value;
}

// Inherit the prototype methods from one constructor into another.
// The prototype of constructor will be set to a new object created from
// superConstructor.
util.inherits(InvalidArgument, LogicError);

module.exports = InvalidArgument;