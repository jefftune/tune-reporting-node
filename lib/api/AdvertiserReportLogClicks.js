#!/usr/bin/env node
/**
 * AdvertiserReportLogClicks.js, TUNE Reporting SDK class.
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
 * TUNE Advertiser Report endpoint '/advertiser/stats/clicks/'.
 *
 * @class AdvertiserReportLogClicks
 * @constructor
 * @extends AdvertiserReportLogBase
 */
function AdvertiserReportLogClicks() {
  AdvertiserReportLogClicks.super_.call(
    this,
    "advertiser/stats/clicks",
    true,
    true
  );
}

util.inherits(AdvertiserReportLogClicks, AdvertiserReportLogBase);

/**
 * Get list of recommended fields for endpoint.
 *
 * @property getFieldsRecommended
 * @protected
 * @return {Array}
 */
AdvertiserReportLogClicks.prototype.getFieldsRecommended = function () {
  return [
    'id',
    'created',
    'site_id',
    'site.name',
    'publisher_id',
    'publisher.name',
    'is_unique',
    'advertiser_sub_campaign_id',
    'advertiser_sub_campaign.ref',
    'publisher_sub_campaign_id',
    'publisher_sub_campaign.ref'
  ];
};

module.exports = AdvertiserReportLogClicks;