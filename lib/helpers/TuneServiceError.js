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
  util = require('util');

/**
 * TUNE Reporting API Service Error.
 *
 * @class TuneServiceError
 * @constructor
 * @extends Error
 *
 * @param string message
 * @param string value
 *
 */
function TuneServiceError(message, value) {
  this.message = message || 'Error occurred within Tune SDK';
  this.value = value;
}

util.inherits(TuneServiceError, Error);
module.exports = TuneServiceError;
