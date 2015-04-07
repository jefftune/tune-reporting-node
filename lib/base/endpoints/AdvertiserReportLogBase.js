#!/usr/bin/env node
/**
 * AdvertiserReportLogBase.js, Abstract class for Advertiser Report Logs.
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
 * @version   $Date: 2015-04-07 15:04:18 $
 * @link      http://developers.mobileapptracking.com @endlink
 */
"use strict";

// Dependencies
var
  _ = require('lodash'),
  util = require('util'),
  AdvertiserReportBase = require('./AdvertiserReportBase');

/**
 * Base class intended for gathering from Advertiser Stats logs.
 * @uses Clicks
 * @uses EventItems
 * @uses Event Logs
 * @uses Install Logs
 * @uses Postback Logs
 *
 * @class AdvertiserReportLogBase
 * @extends AdvertiserReportBase
 * @constructor
 *
 * @param string controller           TUNE Advertiser Report endpoint name.
 * @param bool   filterDebugMode      Remove debug mode information from results.
 * @param bool   filterTestProfileId  Remove test profile information from results.
 */
function AdvertiserReportLogBase(
  controller,
  filterDebugMode,
  filterTestProfileId
) {
  AdvertiserReportLogBase.super_.call(
    this,
    controller,
    filterDebugMode,
    filterTestProfileId
  );
}

// Inherit the prototype methods from one constructor into another.
// The prototype of constructor will be set to a new object created from
// superConstructor.
util.inherits(AdvertiserReportLogBase, AdvertiserReportBase);

/**
 * Counts all existing records that match filter criteria
 * and returns an array of found model data.
 *
 * @method count
 *
 * @param dict mapParams    Mapping of: <p><dl>
 * <dt>start_date</dt><dd>YYYY-MM-DD HH:MM:SS</dd>
 * <dt>end_date</dt><dd>YYYY-MM-DD HH:MM:SS</dd>
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
AdvertiserReportLogBase.prototype.count = function (
  mapParams,
  callback
) {
  var mapQueryString = _.cloneDeep(mapParams);

  // Required parameters
  mapQueryString = this.validateDateTime(mapQueryString, 'start_date');
  mapQueryString = this.validateDateTime(mapQueryString, 'end_date');

  // Optional parameters
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
 * @param mapParams    Mapping of: <p><dl>
 * <dt>start_date</dt><dd>YYYY-MM-DD HH:MM:SS</dd>
 * <dt>end_date</dt><dd>YYYY-MM-DD HH:MM:SS</dd>
 * <dt>fields</dt><dd>Present results using this endpoint's fields.</dd>
 * <dt>filter</dt><dd>Apply constraints based upon values associated with
 *                    this endpoint's fields.</dd>
 * <dt>limit</dt><dd>Limit number of results, default 10, 0 shows all</dd>
 * <dt>page</dt><dd>Pagination, default 1.</dd>
 * <dt>sort</dt><dd>Sort results using this endpoint's fields.
 *                    Directions: DESC, ASC</dd>
 * <dt>response_timezone</dt><dd>Setting expected timezone for results,
 *                          default is set in account.</dd>
 * </dl><p>
 * @param object callback             Error-first Callback.
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
AdvertiserReportLogBase.prototype.find = function (
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

  var reportRequest = this.getReportRequest(
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
 * <dt>filter</dt><dd>Apply constraints based upon values associated with
 *                    this endpoint's fields.</dd>
 * <dt>response_timezone</dt><dd>Setting expected timezone for results,
 *                          default is set in account.</dd>
 * </dl><p>
 * @param object callback             Error-first Callback.
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
AdvertiserReportLogBase.prototype.export = function (
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
  if (mapQueryString.hasOwnProperty('filter') && mapQueryString.filter) {
    mapQueryString = this.validateFilter(mapQueryString);
  }
  if (mapQueryString.hasOwnProperty('format') && mapQueryString.format) {
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
 * @param string jobId    Provided Job Identifier to reference
 *                        requested report on export queue.
 * @param object callback Error-first Callback.
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
AdvertiserReportLogBase.prototype.status = function (
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
 * @return {EventEmitter}   Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
AdvertiserReportLogBase.prototype.fetch = function (
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

module.exports = AdvertiserReportLogBase;