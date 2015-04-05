#!/usr/bin/env node
/**
 * Classes that define TUNE Advertiser Report service access.
 *
 * @module tune-reporting
 * @submodule service
 * @main tune-reporting
 *
 * @category  tune-reporting-node
 *
 * @author    Jeff Tanner <jefft@tune.com>
 * @copyright 2015 TUNE, Inc. (http://www.tune.com)
 * @license   http://opensource.org/licenses/MIT The MIT License (MIT)
 * @version   $Date: 2015-01-07 15:32:40 $
 * @link      http://developers.mobileapptracking.com @endlink
 */
"use strict";

// Dependencies
var helpers = require('../../helpers'),
  _ = require('lodash'),
  prettyjson = require('prettyjson'),
  util = require('util');

/**
 * TUNE MobileAppTracking Management API full service response.
 *
 * @class TuneServiceResponse
 * @constructor
 *
 * @param string requestUrl           TUNE Advertiser Report request URL.
 * @param string responseJson         TUNE Advertiser Report Service full
 *                                    response.
 * @param array  responseHeaders      TUNE Advertiser Report Service
 *                                    response HTTP headers.
 * @param string responseHttpCode     TUNE Advertiser Report Service response
 *                                    HTTP code.
 */
function TuneServiceResponse(
  requestUrl,
  responseJson,
  responseHeaders,
  responseHttpCode
) {
  this.requestUrl = requestUrl;
  this.responseJson = responseJson;
  this.responseHeaders = responseHeaders;
  this.responseHttpCode = responseHttpCode;
}

/**
 * Convert full response to string.
 *
 * @method toString
 * @return {String}
 */
TuneServiceResponse.prototype.toString = function () {
  var string =
        '\nrequest_url:\t ' + this.requestUrl
      + '\nstatus_code:\t ' + this.getStatusCode()
      + '\nresponse_size:\t ' + this.getResponseSize()
      + '\ndata:\n' + prettyjson.render(this.getData(), {}, 2)
      + '\nhttp_code:\t\t' + this.getHttpCode()
      + '\nheaders:\n' + prettyjson.render(
        JSON.parse(JSON.stringify(this.getHeaders())),
        {},
        2
      ),
    errors = this.getErrors(),
    debugs = this.getDebugs();

  if (errors) {
    string = string + '\nerrors:\n' + prettyjson.render(
      JSON.parse(JSON.stringify(errors)),
      {},
      2
    );
  }
  if (debugs) {
    string = string + '\ndebugs:\t\t' + prettyjson.render(
      JSON.parse(JSON.stringify(debugs)),
      {},
      2
    );
  }
  return string;
};

/**
 * Get property of request URL used to generate this response.
 *
 * @property getRequestUrl
 * @return {String}
 */
TuneServiceResponse.prototype.getRequestUrl = function () {
  return this.requestUrl;
};

/**
 * Get property of full JSON response provided by
 * TUNE Advertiser Report service.
 *
 * @method getJSON
 * @return {Array}
 */
TuneServiceResponse.prototype.getJSON = function () {
  return this.responseJson;
};

/**
 * Get property of HTTP status code returned from service proxy.
 *
 * @method getHeaders
 * @return mixed
 */
TuneServiceResponse.prototype.getHeaders = function () {
  return this.responseHeaders;
};

/**
 * Get property of HTTP status code returned from service proxy response.
 *
 * @method getHttpCode
 * @return {Integer}
 */
TuneServiceResponse.prototype.getHttpCode = function () {
  return this.responseHttpCode;
};

/**
 * Get property of data JSON response provided by TUNE Advertiser Report service.
 *
 * @method getData
 * @return {Array}
 */
TuneServiceResponse.prototype.getData = function () {
  if (this.responseJson &&
    this.responseJson.hasOwnProperty('data')
  ) {
    return this.responseJson.data;
  }
  return null;
};

/**
 * TUNE Advertiser Report's response value pertaining to its key 'response_size'.
 *
 * @method getResponseSize
 * @return {Integer}
 */
TuneServiceResponse.prototype.getResponseSize = function () {
  if (this.responseJson &&
    this.responseJson.hasOwnProperty('response_size')
  ) {
    return this.responseJson.response_size;
  }
  return null;
};

/**
 * TUNE Advertiser Report's response value pertaining to its key 'status_code'.
 *
 * @method getStatusCode
 * @return {Integer}
 */
TuneServiceResponse.prototype.getStatusCode = function () {
  if (this.responseJson &&
    this.responseJson.hasOwnProperty('status_code')
  ) {
    return this.responseJson.status_code;
  }
  return null;
};

/**
 * TUNE Advertiser Report's response value pertaining to its key 'errors'
 * only if service experienced an error.
 *
 * @method getErrors
 * @return {Array}
 */
TuneServiceResponse.prototype.getErrors = function () {
  if (this.responseJson &&
    this.responseJson.hasOwnProperty('errors')
  ) {
    return this.responseJson.errors;
  }
  return null;
};

/**
 * TUNE Advertiser Report's response value pertaining to its key 'debugs'
 * only if request's query string expressed for service to
 * provide debug information.
 *
 * @method getDebugs
 * @return {Array}
 */
TuneServiceResponse.prototype.getDebugs = function () {
  if (this.responseJson &&
    this.responseJson.hasOwnProperty('debugs')
  ) {
    return this.responseJson.debugs;
  }
  return null;
};

/**
 * Convert response to parsable JSON object.
 *
 * @method toJson
 * @return {JSON}
 */
TuneServiceResponse.prototype.toJson = function () {
  return JSON.parse(JSON.stringify(this));
};

module.exports = TuneServiceResponse;