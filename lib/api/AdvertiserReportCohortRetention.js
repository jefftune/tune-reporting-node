#!/usr/bin/env node
/**
 * AdvertiserReportCohortRetention.js, TUNE Reporting SDK class.
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
 * @version   $Date: 2015-04-05 13:42:19 $
 * @link      http://developers.mobileapptracking.com @endlink
 */

// Dependencies
var
  util = require('util'),
  AdvertiserReportCohortBase = require('../base/endpoints').AdvertiserReportCohortBase;

/**
 * TUNE Advertiser Report endpoint '/advertiser/stats/retention/'.
 *
 * @class AdvertiserReportCohortRetention
 * @constructor
 * @extends AdvertiserReportCohortBase
 */
function AdvertiserReportCohortRetention() {
  AdvertiserReportCohortRetention.super_.call(
    this,
    "advertiser/stats/retention",
    false,
    true
  );
}

util.inherits(AdvertiserReportCohortRetention, AdvertiserReportCohortBase);

/**
 * Get list of recommended fields for endpoint.
 *
 * @property getFieldsRecommended
 * @protected
 * @return {Array}
 */
AdvertiserReportCohortRetention.prototype.getFieldsRecommended = function () {
  return [
    'site_id',
    'site.name',
    'install_publisher_id',
    'install_publisher.name',
    'installs',
    'opens'
  ];
};

/**
 * Finds all existing records that match filter criteria
 * and returns an array of found model data.
 *
 * @method find
 *
 * @param string startDate        YYYY-MM-DD HH:MM:SS
 * @param string endDate          YYYY-MM-DD HH:MM:SS
 * @param string cohortType       Cohort types: click, install
 * @param string cohortInterval   Cohort intervals: year_day, year_week, year_month, year
 * @param string fields            Present results using these endpoint's fields.
 * @param string group             Group results using this endpoint's fields.
 * @param string filter            Apply constraints based upon values associated with
 *                                  this endpoint's fields.
 * @param int    limit             Limit number of results, default 10, 0 shows all
 * @param int    page              Pagination, default 1.
 * @param string sort              Sort results using this endpoint's fields. Directions: DESC, ASC
 * @param string format
 * @param string strResponseTimezone Setting expected timezone for results,
 *                                  default is set in account.
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
AdvertiserReportCohortRetention.prototype.find = function (
  mapQueryString,
  callback
) {
  // Required parameters
  mapQueryString = this.validateDateTime(mapQueryString, 'start_date');
  mapQueryString = this.validateDateTime(mapQueryString, 'end_date');

  mapQueryString = this.validateCohortType(mapQueryString);
  mapQueryString = this.validateCohortInterval(mapQueryString);

  mapQueryString = this.validateFields(mapQueryString);
  mapQueryString = this.validateGroup(mapQueryString);

  // Optional parameters
  if (mapQueryString.hasOwnProperty('filter') && mapQueryString.filter) {
    mapQueryString = this.validateFilter(mapQueryString);
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
    reportRequest = this.getReportRequest(
      'find',
      mapQueryString
    );

  // Success event response
  reportRequest.once('success', function onSuccess(response) {
    callback(null, response);
  });

  // Error event response
  reportRequest.once('error', function onError(response) {
    callback(response, null);
  });
};

/**
 * Places a job into a queue to generate a report that will contain
 * records that match provided filter criteria, and it returns a job
 * identifier to be provided to action /export/download.json to download
 * completed report.
 *
 * @method exportReport
 *
 * @param string startDate        YYYY-MM-DD HH:MM:SS
 * @param string endDate          YYYY-MM-DD HH:MM:SS
 * @param string cohortType       Cohort types: click, install.
 * @param string cohortInterval   Cohort intervals: year_day, year_week, year_month, year.
 * @param string fields            Present results using these endpoint's fields.
 * @param string group             Group results using this endpoint's fields.
 * @param string filter            Apply constraints based upon values associated with
 *                                  this endpoint's fields.
 * @param string strResponseTimezone Setting expected timezone for results,
 *                                  default is set in account.
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
AdvertiserReportCohortRetention.prototype.exportReport = function (
  mapQueryString,
  callback
) {
  // Required parameters
  mapQueryString = this.validateDateTime(mapQueryString, 'start_date');
  mapQueryString = this.validateDateTime(mapQueryString, 'end_date');

  mapQueryString = this.validateCohortType(mapQueryString);
  mapQueryString = this.validateCohortInterval(mapQueryString);

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
 * @method fetchReport
 *
 * @param string jobId      Job identifier assigned for report export.
 * @param object callback   Error-first Callback.
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
AdvertiserReportCohortRetention.prototype.fetchReport = function (
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

module.exports = AdvertiserReportCohortRetention;