#!/usr/bin/env node
/**
 * AdvertiserReportCohortValue.js, TUNE Reporting SDK class.
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
 * @version   $Date: 2015-04-09 17:36:25 $
 * @link      http://developers.mobileapptracking.com @endlink
 */

// Dependencies
var
  util = require('util'),
  _ = require('lodash'),
  AdvertiserReportCohortBase = require('../base/endpoints').AdvertiserReportCohortBase;

/**
 * TUNE Advertiser Report endpoint '/advertiser/stats/ltv/'.
 *
 * @class AdvertiserReportCohortValue
 * @constructor
 * @extends AdvertiserReportCohortBase
 *
 */
function AdvertiserReportCohortValue() {
  AdvertiserReportCohortValue.super_.call(
    this,
    "advertiser/stats/ltv",
    false,
    true
  );
}

util.inherits(AdvertiserReportCohortValue, AdvertiserReportCohortBase);

/**
 * Get list of recommended fields for endpoint.
 *
 * @property getFieldsRecommended
 * @protected
 * @return {Array}
 */
AdvertiserReportCohortValue.prototype.getFieldsRecommended = function () {
  return [
    'site_id',
    'site.name',
    'publisher_id',
    'publisher.name',
    'rpi',
    'epi'
  ];
};

/**
 * Finds all existing records that match filter criteria
 * and returns an array of found model data.
 *
 * @method find
 *
 * @param dict mapParams    Mapping of: <p><dl>
 * <dt>start_date</dt><dd>YYYY-MM-DD HH:MM:SS</dd>
 * <dt>end_date</dt><dd>YYYY-MM-DD HH:MM:SS</dd>
 * <dt>cohort_type</dt><dd>Cohort types: click, install</dd>
 * <dt>cohort_interval</dt><dd>Cohort intervals: year_day, year_week, year_month, year</dd>
 * <dt>aggregation_type</dt><dd>Aggregation types: cumulative, incremental</dd>
 * <dt>fields</dt><dd>Present results using this endpoint's fields.</dd>
 * <dt>group</dt><dd>Group results using this endpoint's fields.</dd>
 * <dt>filter</dt><dd>Apply constraints based upon values associated with
 *                    this endpoint's fields.</dd>
 * <dt>limit</dt><dd>Limit number of results, default 10, 0 shows all</dd>
 * <dt>page</dt><dd>Pagination, default 1.</dd>
 * <dt>sort</dt><dd>Sort results using this endpoint's fields.
 *                    Directions: DESC, ASC</dd>
 * <dt>response_timezone</dt><dd>Setting expected timezone for results,
 *                          default is set in account.</dd>
 * </dl><p>
 * @param object callback               Error-first Callback.
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
AdvertiserReportCohortValue.prototype.find = function (
  mapParams,
  callback
) {
  var mapQueryString = _.cloneDeep(mapParams);

  // Required parameters
  mapQueryString = this.validateDateTime(mapQueryString, 'start_date');
  mapQueryString = this.validateDateTime(mapQueryString, 'end_date');

  mapQueryString = this.validateCohortType(mapQueryString);
  mapQueryString = this.validateCohortInterval(mapQueryString);
  mapQueryString = this.validateAggregationType(mapQueryString);

  mapQueryString = this.validateGroup(mapQueryString);

  // Optional parameters
  if (mapQueryString.hasOwnProperty('filter') && mapQueryString.filter) {
    mapQueryString = this.validateFilter(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('fields') && mapQueryString.fields) {
    mapQueryString = this.validateFields(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('limit') && mapQueryString.limit) {
    mapQueryString = this.validateLimit(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('page') && mapQueryString.page) {
    mapQueryString = this.validatePage(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('sort') && mapQueryString.sort) {
    mapQueryString = this.validateSort(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('response_timezone') && mapQueryString.response_timezone) {
    mapQueryString = this.validateResponseTimezone(mapQueryString);
  }

  var
    find_request = this.getReportRequest(
      'find',
      mapQueryString
    );

  // Success event response
  find_request.once('success', function onSuccess(response) {
    callback(null, response);
  });

  // Error event response
  find_request.once('error', function onError(response) {
    callback(response, null);
  });
};

/**
 * Places a job into a queue to generate a report that will contain
 * records that match provided filter criteria, and it returns a job
 * identifier to be provided to action /export/download.json to download
 * completed report.
 *
 * @method export
 *
 * @param dict mapParams    Mapping of: <p><dl>
 * <dt>start_date</dt><dd>YYYY-MM-DD HH:MM:SS</dd>
 * <dt>end_date</dt><dd>YYYY-MM-DD HH:MM:SS</dd>
 * <dt>cohort_type</dt><dd>Cohort types: click, install</dd>
 * <dt>cohort_interval</dt><dd>Cohort intervals: year_day, year_week, year_month, year</dd>
 * <dt>aggregation_type</dt><dd>Aggregation types: cumulative, incremental</dd>
 * <dt>fields</dt><dd>Present results using this endpoint's fields.</dd>
 * <dt>group</dt><dd>Group results using this endpoint's fields.</dd>
 * <dt>filter</dt><dd>Apply constraints based upon values associated with
 *                    this endpoint's fields.</dd>
 * <dt>response_timezone</dt><dd>Setting expected timezone for results,
 *                          default is set in account.</dd>
 * </dl><p>
 * @param object callback               Error-first Callback.
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
AdvertiserReportCohortValue.prototype.export = function (
  mapParams,
  callback
) {
  var mapQueryString = _.cloneDeep(mapParams);

  // Required parameters
  mapQueryString = this.validateDateTime(mapQueryString, 'start_date');
  mapQueryString = this.validateDateTime(mapQueryString, 'end_date');

  mapQueryString = this.validateCohortType(mapQueryString);
  mapQueryString = this.validateCohortInterval(mapQueryString);
  mapQueryString = this.validateAggregationType(mapQueryString);

  mapQueryString = this.validateFields(mapQueryString);
  mapQueryString = this.validateGroup(mapQueryString);

  // Optional parameters
  if (mapQueryString.hasOwnProperty('filter') && mapQueryString.filter) {
    mapQueryString = this.validateFilter(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('response_timezone') && mapQueryString.response_timezone) {
    mapQueryString = this.validateResponseTimezone(mapQueryString);
  }

  var
    requestExport = this.getReportRequest(
      'export',
      mapQueryString
    );

  // Success event response
  requestExport.once('success', function onSuccess(response) {
    callback(null, response);
  });

  // Error event response
  requestExport.once('error', function onError(response) {
    callback(response, null);
  });
};

/**
 * Helper function for fetching report upon completion.
 *
 * @method fetch
 *
 * @param string jobId      Job identifier assigned for report export.
 * @param object callback   Error-first Callback.
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
AdvertiserReportCohortValue.prototype.fetch = function (
  jobId,
  callback
) {
  var requestFetch = this._fetchReport(
    this.getController(),
    'status',
    jobId
  );

  // Success event response
  requestFetch.once('success', function onSuccess(response) {
    callback(null, response);
  });

  // Error event response
  requestFetch.once('error', function onError(response) {
    callback(response, null);
  });
};


module.exports = AdvertiserReportCohortValue;