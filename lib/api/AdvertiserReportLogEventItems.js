#!/usr/bin/env node
/**
 * AdvertiserReportLogEventItems.js, TUNE Reporting SDK class.
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
 * TUNE Advertiser Report endpoint '/advertiser/stats/event/items/'.
 *
 * @class AdvertiserReportLogEventItems
 * @constructor
 * @extends AdvertiserReportLogBase
 */
function AdvertiserReportLogEventItems() {
  AdvertiserReportLogEventItems.super_.call(
    this,
    "advertiser/stats/event/items",
    false,
    true
  );
}

util.inherits(AdvertiserReportLogEventItems, AdvertiserReportLogBase);

/**
 * Get list of recommended fields for endpoint.
 *
 * @property getFieldsRecommended
 * @protected
 * @return {Array}
 */
AdvertiserReportLogEventItems.prototype.getFieldsRecommended = function () {
  return [
    'id',
    'created',
    'site_id',
    'site.name',
    'campaign_id',
    'campaign.name',
    'site_event_id',
    'site_event.name',
    'site_event_item_id',
    'site_event_item.name',
    'quantity',
    'value_usd',
    'country_id',
    'country.name',
    'region_id',
    'region.name',
    'agency_id',
    'agency.name',
    'advertiser_sub_site_id',
    'advertiser_sub_site.name',
    'advertiser_sub_campaign_id',
    'advertiser_sub_campaign.name',
    'currency_code',
    'value'
  ];
};

module.exports = AdvertiserReportLogEventItems;