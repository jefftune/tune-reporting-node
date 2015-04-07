#!/usr/bin/env node
/**
 * AdvertiserReportActuals.js, TUNE Reporting SDK class.
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
  AdvertiserReportActualsBase = require('../base/endpoints').AdvertiserReportActualsBase;

/**
 * TUNE Advertiser Report endpoint '/advertiser/stats/'.
 *
 * @class AdvertiserReportActuals
 * @constructor
 * @extends AdvertiserReportActualsBase
 */
function AdvertiserReportActuals() {
  AdvertiserReportActuals.super_.call(
    this,
    "advertiser/stats",
    true,
    true
  );
}

util.inherits(AdvertiserReportActuals, AdvertiserReportActualsBase);

/**
 * Get list of recommended fields for endpoint.
 *
 * @property getFieldsRecommended
 * @protected
 * @return {Array}
 */
AdvertiserReportActuals.prototype.getFieldsRecommended = function () {
  return [
    'site_id',
    'site.name',
    'publisher_id',
    'publisher.name',
    'ad_impressions',
    'ad_impressions_unique',
    'ad_clicks',
    'ad_clicks_unique',
    'paid_installs',
    'paid_installs_assists',
    'non_installs_assists',
    'paid_events',
    'paid_events_assists',
    'non_events_assists',
    'paid_opens',
    'paid_opens_assists',
    'non_opens_assists'
  ];
};

module.exports = AdvertiserReportActuals;