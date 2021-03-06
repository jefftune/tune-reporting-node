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
 * @version   $Date: 2015-12-11 22:34:11 $
 * @link      http://developers.mobileapptracking.com @endlink
 */

// Dependencies
var
  util = require('util'),
  _ = require('lodash'),
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
    "advertiser/stats/retention/reduced",
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
    'installs',
    'install_publisher_id',
    'install_publisher.name',
    'region_id',
    'region.name',
    'site_id',
    'site.name',
    'campaign_id',
    'campaign.name',
    'country_id',
    'country.name',
    'publisher_sub_publisher_id',
    'publisher_sub_publisher.name'
  ];
};

/**
 * @var array Available choices for Cohort types.
 *
 * @property COHORT_TYPES
 *
 * @type array
 * @static
 * @final
 */
AdvertiserReportCohortRetention.COHORT_TYPES = [
  'install'
];

/**
 * Validate cohort type.
 *
 * @method validateCohortType
 * @protected
 *
 * @param string cohortType
 *
 * @return {String}
 */
AdvertiserReportCohortRetention.prototype.validateCohortType = function (mapQueryString) {

  if (!mapQueryString.hasOwnProperty('cohort_type')) {
    throw new InvalidArgument(
      'Key "cohort_type" not provided.'
    );
  }

  var cohortType = mapQueryString['cohort_type'];

  if (!_.isString(cohortType) || (0 === cohortType.length)) {
    throw new InvalidArgument(
      util.format('Invalid Key "cohortType" provided type: "%s"', cohortType)
    );
  }

  cohortType = cohortType.trim().toLowerCase();

  if (!_.contains(AdvertiserReportCohortRetention.COHORT_TYPES, cohortType)) {
    throw new InvalidArgument(
      util.format('Invalid Key "cohort_type" provided choice: "%s"', cohortType)
    );
  }

  mapQueryString.cohort_type = cohortType;

  return mapQueryString;
};


/**
 * @var array Available choices for Cohort types.
 *
 * @property RETENTION_MEASURES
 *
 * @type array
 * @static
 * @final
 */
AdvertiserReportCohortRetention.RETENTION_MEASURES = [
  'rolling_opens',
  'classic_opens',
  'classic_events',
  'classic_purchases'
];

/**
 * Validate cohort type.
 *
 * @method validateRetentionMeasure
 * @protected
 *
 * @param string retentionMeasure
 *
 * @return {String}
 */
AdvertiserReportCohortRetention.prototype.validateRetentionMeasure = function (mapQueryString) {

  if (!mapQueryString.hasOwnProperty('retention_measure')) {
    throw new InvalidArgument(
      'Key "retention_measure" not provided.'
    );
  }

  var retentionMeasure = mapQueryString['retention_measure'];

  if (!_.isString(retentionMeasure) || (0 === retentionMeasure.length)) {
    throw new InvalidArgument(
      util.format('Invalid Key "retentionMeasure" provided type: "%s"', retentionMeasure)
    );
  }

  retentionMeasure = retentionMeasure.trim().toLowerCase();

  if (!_.contains(AdvertiserReportCohortRetention.RETENTION_MEASURES, retentionMeasure)) {
    throw new InvalidArgument(
      util.format('Invalid Key "retention_measure" provided choice: "%s"', retentionMeasure)
    );
  }

  if (mapQueryString.hasOwnProperty('fields')) {
    mapQueryString.fields += "," + retentionMeasure;
  } else {
    mapQueryString.fields = retentionMeasure;
  }

  return mapQueryString;
};

/**
 * Counts all existing records that match filter criteria
 * and returns an array of found model data.
 *
 * @method count
 *
 * @param dict mapParams    Mapping of: <p><dl>
 * <dt>start_date</dt><dd>YYYY-MM-DD HH:MM:SS</dd>
 * <dt>end_date</dt><dd>YYYY-MM-DD HH:MM:SS</dd>
 * <dt>cohort_type</dt><dd>Cohort types: click, install</dd>
 * <dt>cohort_interval</dt><dd>Cohort intervals: year_day, year_week, year_month, year</dd>
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
AdvertiserReportCohortRetention.prototype.count = function (
  mapParams,
  callback
) {
  var mapQueryString = _.cloneDeep(mapParams);

  // Required parameters
  mapQueryString = this.validateDateTime(mapQueryString, 'start_date');
  mapQueryString = this.validateDateTime(mapQueryString, 'end_date');

  mapQueryString = this.validateCohortType(mapQueryString);
  mapQueryString = this.validateCohortInterval(mapQueryString);
  mapQueryString = this.validateGroup(mapQueryString);

  // Optional parameters
  if (mapQueryString.hasOwnProperty('retention_measure') && mapQueryString.retention_measure) {
    mapQueryString = this.validateRetentionMeasure(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('filter') && mapQueryString.filter) {
    mapQueryString = this.validateFilter(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('response_timezone') && mapQueryString.response_timezone) {
    mapQueryString = this.validateResponseTimezone(mapQueryString);
  }

  var
    reportRequest = this.getReportRequest(
      'count',
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
AdvertiserReportCohortRetention.prototype.find = function (
  mapParams,
  callback
) {
  var mapQueryString = _.cloneDeep(mapParams);

  // Required parameters
  mapQueryString = this.validateDateTime(mapQueryString, 'start_date');
  mapQueryString = this.validateDateTime(mapQueryString, 'end_date');

  mapQueryString = this.validateCohortType(mapQueryString);
  mapQueryString = this.validateCohortInterval(mapQueryString);

  mapQueryString = this.validateGroup(mapQueryString);

  // Optional parameters
  if (mapQueryString.hasOwnProperty('filter') && mapQueryString.filter) {
    mapQueryString = this.validateFilter(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('fields') && mapQueryString.fields) {
    mapQueryString = this.validateFields(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('retention_measure') && mapQueryString.retention_measure) {
    mapQueryString = this.validateRetentionMeasure(mapQueryString);
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
 * @method export
 *
 * @param dict mapParams    Mapping of: <p><dl>
 * <dt>start_date</dt><dd>YYYY-MM-DD HH:MM:SS</dd>
 * <dt>end_date</dt><dd>YYYY-MM-DD HH:MM:SS</dd>
 * <dt>cohort_type</dt><dd>Cohort types: click, install</dd>
 * <dt>cohort_interval</dt><dd>Cohort intervals: year_day, year_week, year_month, year</dd>
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
AdvertiserReportCohortRetention.prototype.export = function (
  mapParams,
  callback
) {
  var mapQueryString = _.cloneDeep(mapParams);

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
  if (mapQueryString.hasOwnProperty('retention_measure') && mapQueryString.retention_measure) {
    mapQueryString = this.validateRetentionMeasure(mapQueryString);
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
AdvertiserReportCohortRetention.prototype.fetch = function (
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