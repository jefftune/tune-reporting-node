#!/usr/bin/env node
/**
 * AdvertiserReportActualsBase.js, Abstract class for Advertiser Report Actuals.
 *
 * @module tune-reporting
 * @submodule endpoints
 * @main tune-reporting
 *
 * @category  tune-reporting-node
 *
 * @author    Jeff Tanner <jefft@tune.com>
 * @copyright 2015 TUNE, Inc. (http://www.tune.com)
 * @license   http://opensource.org/licenses/MIT The MIT License (MIT)
 * @version   $Date: 2015-04-10 11:10:41 $
 * @link      http://developers.mobileapptracking.com @endlink
 */
"use strict";

// Dependencies
var
  InvalidArgument = require('../../helpers').InvalidArgument,
  _ = require('lodash'),
  util = require('util'),
  AdvertiserReportBase = require('./AdvertiserReportBase');

/**
 * Base class intended for gathering from Advertiser Stats actuals.
 * @uses Stats
 * @uses Actuals
 *
 * @class AdvertiserReportActualsBase
 * @extends AdvertiserReportBase
 * @constructor
 *
 * @param string controller           TUNE Advertiser Report endpoint name.
 * @param bool   filterDebugMode      Remove debug mode information
 *                                    from results.
 * @param bool   filterTestProfileId  Remove test profile information
 *                                    from results.
 */
function AdvertiserReportActualsBase(
  controller,
  filterDebugMode,
  filterTestProfileId
) {
  AdvertiserReportActualsBase.super_.call(
    this,
    controller,
    filterDebugMode,
    filterTestProfileId
  );
}

// Inherit the prototype methods from one constructor into another.
// The prototype of constructor will be set to a new object created from
// superConstructor.
util.inherits(AdvertiserReportActualsBase, AdvertiserReportBase);

/**
 * Available values for parameter 'timestamp'.
 *
 * @property TIMESTAMPS
 *
 * @type array
 * @static
 * @final
 */
AdvertiserReportActualsBase.TIMESTAMPS = [
  'hour',
  'datehour',
  'date',
  'week',
  'month'
];

/**
 * Validate timestamp.
 *
 * @method validateTimestamp
 * @protected
 *
 * @param string timestamp
 *
 * @return {String}
 */
AdvertiserReportActualsBase.prototype.validateTimestamp = function (mapQueryString) {

  if (!mapQueryString.hasOwnProperty('timestamp')) {
    throw new InvalidArgument(
      'Key "timestamp" not provided.'
    );
  }

  var timestamp = mapQueryString.timestamp;

  if (!_.isString(timestamp) || (0 === timestamp.length)) {
    throw new InvalidArgument(
      util.format('Invalid parameter "timestamp" provided type: "%s"', timestamp)
    );
  }

  timestamp = timestamp.trim().toLowerCase();

  if (!_.contains(AdvertiserReportActualsBase.TIMESTAMPS, timestamp)) {
    throw new InvalidArgument(
      util.format('Invalid parameter "timestamp" provided choice: "%s"', timestamp)
    );
  }

  mapQueryString.timestamp = timestamp;

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
AdvertiserReportActualsBase.prototype.count = function (
  mapParams,
  callback
) {
  var mapQueryString = _.cloneDeep(mapParams);

  // Required parameters
  mapQueryString = this.validateDateTime(mapQueryString, 'start_date');
  mapQueryString = this.validateDateTime(mapQueryString, 'end_date');

  // Optional parameters
  if (mapQueryString.hasOwnProperty('group') && mapQueryString.group) {
    mapQueryString = this.validateGroup(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('filter') && mapQueryString.filter) {
    mapQueryString = this.validateFilter(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('response_timezone') && mapQueryString.response_timezone) {
    mapQueryString = this.validateResponseTimezone(mapQueryString);
  }

  var
    count_request = this.getReportRequest(
      'count',
      mapQueryString
    );

  // Success event response
  count_request.once('success', function onSuccess(response) {
    callback(null, response);
  });

  // Error event response
  count_request.once('error', function onError(response) {
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
 * <dt>fields</dt><dd>Present results using this endpoint's fields.</dd>
 * <dt>group</dt><dd>Group results using this endpoint's fields.</dd>
 * <dt>filter</dt><dd>Apply constraints based upon values associated with
 *                    this endpoint's fields.</dd>
 * <dt>limit</dt><dd>Limit number of results, default 10, 0 shows all</dd>
 * <dt>page</dt><dd>Pagination, default 1.</dd>
 * <dt>sort</dt><dd>Sort results using this endpoint's fields.
 *                    Directions: DESC, ASC</dd>
 * <dt>timestamp</dt><dd>Set to breakdown stats by timestamp choices:
 *                    hour, datehour, date, week, month</dd>
 * <dt>response_timezone</dt><dd>Setting expected timezone for results,
 *                          default is set in account.</dd>
 * </dl><p>
 * @param object callback               Error-first Callback.
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
AdvertiserReportActualsBase.prototype.find = function (
  mapParams,
  callback
) {
  var mapQueryString = _.cloneDeep(mapParams);

  // Required parameters
  mapQueryString = this.validateDateTime(mapQueryString, 'start_date');
  mapQueryString = this.validateDateTime(mapQueryString, 'end_date');

  // Optional parameters
  if (mapQueryString.hasOwnProperty('fields') && mapQueryString.fields) {
    mapQueryString = this.validateFields(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('group') && mapQueryString.group) {
    mapQueryString = this.validateGroup(mapQueryString);
  }
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
 * @method export
 *
 * @param dict mapParams    Mapping of: <p><dl>
 * <dt>start_date</dt><dd>YYYY-MM-DD HH:MM:SS</dd>
 * <dt>end_date</dt><dd>YYYY-MM-DD HH:MM:SS</dd>
 * <dt>fields</dt><dd>Present results using this endpoint's fields.</dd>
 * <dt>group</dt><dd>Group results using this endpoint's fields.</dd>
 * <dt>filter</dt><dd>Apply constraints based upon values associated with
 *                    this endpoint's fields.</dd>
 * <dt>timestamp</dt><dd>Set to breakdown stats by timestamp choices:
 *                    hour, datehour, date, week, month</dd>
 * <dt>response_timezone</dt><dd>Setting expected timezone for results,
 *                          default is set in account.</dd>
 * </dl><p>
 * @param object callback               Error-first Callback.
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
AdvertiserReportActualsBase.prototype.export = function (
  mapParams,
  callback
) {
  var mapQueryString = _.cloneDeep(mapParams);

  // Required parameters
  mapQueryString = this.validateDateTime(mapQueryString, 'start_date');
  mapQueryString = this.validateDateTime(mapQueryString, 'end_date');
  mapQueryString = this.validateFields(mapQueryString);

  // Optional parameters
  if (mapQueryString.hasOwnProperty('group') && mapQueryString.group) {
    mapQueryString = this.validateGroup(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('filter') && mapQueryString.filter) {
    mapQueryString = this.validateFilter(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('timestamp') && mapQueryString.timestamp) {
    mapQueryString = this.validateTimestamp(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('format') && mapQueryString.filter) {
    mapQueryString = this.validateFormat(mapQueryString);
  } else {
    mapQueryString.format = 'csv';
  }
  if (mapQueryString.hasOwnProperty('response_timezone') && mapQueryString.response_timezone) {
    mapQueryString = this.validateResponseTimezone(mapQueryString);
  }

  var
    reportRequest = this.getReportRequest(
      'find_export_queue',
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
 * Query status of insight reports. Upon completion will
 * return url to download requested report.
 *
 * @method status
 *
 * @param string jobId      Provided Job Identifier to reference
 *                          requested report on export queue.
 * @param object callback   Error-first Callback.
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
AdvertiserReportActualsBase.prototype.status = function (
  jobId,
  callback
) {
  var status_request = this._statusReport(
    'export',
    'download',
    jobId
  );

  // Success event response
  status_request.once('success', function onSuccess(response) {
    callback(null, response);
  });

  // Error event response
  status_request.once('error', function onError(response) {
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
AdvertiserReportActualsBase.prototype.fetch = function (
  jobId,
  callback
) {
  var requestFetch = this._fetchReport(
    'export',
    'download',
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

module.exports = AdvertiserReportActualsBase;