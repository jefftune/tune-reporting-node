#!/usr/bin/env node
/**
 * AdvertiserReportLogPostbacks.js, TUNE Reporting SDK class.
 *
 * @module tune-reporting
 * @submodule api
 * @main tune-reporting
 *
 * @category  tune-reporting-node
 *
 * @author    Jeff Tanner <jefft@tune.com>
 * @copyright 2015 TUNE, Inc. (http://www.tune.com)
 * @license   http://opensource.org/licenses/MIT The MIT License (MIT)
 * @version   $Date: 2015-04-07 15:04:18 $
 * @link      http://developers.mobileapptracking.com @endlink
 */
"use strict";

// Dependencies
var
  util = require('util'),
  _ = require('lodash'),
  AdvertiserReportLogBase = require('../base/endpoints').AdvertiserReportLogBase;

/**
 * TUNE Advertiser Report endpoint '/advertiser/stats/postbacks/'.
 *
 * @class AdvertiserReportLogPostbacks
 * @constructor
 * @extends AdvertiserReportLogBase
 */
function AdvertiserReportLogPostbacks() {
  AdvertiserReportLogPostbacks.super_.call(
    this,
    "advertiser/stats/postbacks",
    false,
    true
  );
}

util.inherits(AdvertiserReportLogPostbacks, AdvertiserReportLogBase);

/**
 * Get list of recommended fields for endpoint.
 *
 * @property getFieldsRecommended
 * @protected
 * @return {Array}
 */
AdvertiserReportLogPostbacks.prototype.getFieldsRecommended = function () {
  return [
    'id',
    'stat_install_id',
    'stat_event_id',
    'stat_open_id',
    'created',
    'status',
    'site_id',
    'site.name',
    'site_event_id',
    'site_event.name',
    'site_event.type',
    'publisher_id',
    'publisher.name',
    'attributed_publisher_id',
    'attributed_publisher.name',
    'url',
    'http_result'
  ];
};

module.exports = AdvertiserReportLogPostbacks;