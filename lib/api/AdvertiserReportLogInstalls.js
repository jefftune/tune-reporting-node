#!/usr/bin/env node
/**
 * AdvertiserReportLogInstalls.js, TUNE Reporting SDK class.
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
 * TUNE Advertiser Report endpoint '/advertiser/stats/installs/'.
 *
 * @class AdvertiserReportLogInstalls
 * @constructor
 * @extends AdvertiserReportLogBase
 */
function AdvertiserReportLogInstalls() {
  AdvertiserReportLogInstalls.super_.call(
    this,
    "advertiser/stats/installs",
    true,
    true
  );
}

util.inherits(AdvertiserReportLogInstalls, AdvertiserReportLogBase);

/**
 * Get list of recommended fields for endpoint.
 *
 * @property getFieldsRecommended
 * @protected
 * @return {Array}
 */
AdvertiserReportLogInstalls.prototype.getFieldsRecommended = function () {
  return [
    'id',
    'created',
    'status',
    'site_id',
    'site.name',
    'publisher_id',
    'publisher.name',
    'advertiser_ref_id',
    'advertiser_sub_campaign_id',
    'advertiser_sub_campaign.ref',
    'publisher_sub_campaign_id',
    'publisher_sub_campaign.ref',
    'user_id',
    'device_id',
    'os_id',
    'google_aid',
    'ios_ifa',
    'ios_ifv',
    'windows_aid',
    'referral_url',
    'is_view_through'
  ];
};

module.exports = AdvertiserReportLogInstalls;