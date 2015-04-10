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
 * @version   $Date: 2015-04-10 11:10:41 $
 * @link      http://developers.mobileapptracking.com @endlink
 */
"use strict";

// Dependencies
var
  moduleinfo = require('../../../package.json'),
  EventEmitter = require('events').EventEmitter,
  clone = require('clone'),
  https = require('https'),
  _ = require('lodash'),
  util = require('util'),
  InvalidArgument = require('../../helpers').InvalidArgument,
  TuneServiceRequest = require('./TuneServiceRequest'),
  TuneServiceResponse = require('./TuneServiceResponse');

/**
 * TUNE MobileAppTracking Service client.
 *
 * @class TuneServiceClient
 * @constructor
 * @extends EventEmitter
 *
 * @param string   controller     TUNE Advertiser Report endpoint name.
 * @param string   action         TUNE Advertiser Report endpoint's action name.
 * @param string   authKey        TUNE Authentication Key.
 * @param string   authType       TUNE Authentication Type.
 * @param dict     mapQueryString Action's query string parameters.
 */
function TuneServiceClient(
  controller,
  action,
  authKey,
  authType,
  mapQueryString
) {
  EventEmitter.call(this);

  this.req = undefined;
  this.rep = undefined;

  if (!controller || !_.isString(controller) || (controller.length === 0)
  ) {
    throw new InvalidArgument('Parameter "controller" is not defined.');
  }
  if (!action || !_.isString(action) || (action.length === 0)
  ) {
    throw new InvalidArgument('Parameter "action" is not defined.');
  }
  if (mapQueryString && !_.isObject(mapQueryString)
  ) {
    throw new InvalidArgument('Parameter "mapQueryString" is not defined.');
  }

  this.req = new TuneServiceRequest(
    controller,
    action,
    authKey,
    authType,
    mapQueryString
  );
}

// Inherit the prototype methods from one constructor into another.
// The prototype of constructor will be set to a new object created from
// superConstructor.
util.inherits(TuneServiceClient, EventEmitter);

/**
 * Execute to send request to TUNE Advertiser Report, and determine success
 * or failure based upon its service's response.
 *
 * @method request
 *
 * @param callback response
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
TuneServiceClient.prototype.getClientRequest = function (callback) {

  var
    formattedError,
    // Set the headers
    headers = {
      'Content-Type':   'application/json; charset=utf-8',
      'User-Agent':     moduleinfo.name + '/' + moduleinfo.version
    },
    qs = this.req.getQueryStringMap(),
    req,
    self = clone(this),
    path = this.req.getPath(),
    success = false,

    // Configure the request
    options = {
      host: TuneServiceRequest.API_URL_BASE,
      port: 443,
      json: true,
      method: 'GET',
      headers: headers,
      path: path
    };

  try {
    req = https.request(options, function(res) {
      var
        data = "",
        body,
        error;

      res.on('data', function(chunk) {
        data += chunk;
      });

      res.on('end', function () {
        try {
          body = JSON.parse(data);
        } catch (err) {
          error = {};
          error.message = 'Unable JSON parse data.';
        }

        if (body && body.hasOwnProperty('status_code') &&
          ((body.status_code < 200 || body.status_code > 206))
        ) {
          error = {};
          error.serviceStatusCode = body.status_code;
          error.httpStatusCode = res.statusCode;
          error.requestUrl = self.req.getUrl();

          // response is null if server is unreachable
          if (body.hasOwnProperty('errors')) {
            if ((body.errors instanceof Array) &&
              (0 < body.errors.length) &&
              (typeof body.errors[0] !== 'undefined')
            ) {
              if (body.errors[0].hasOwnProperty('message')) {
                error.message = body.errors[0].message;
              }
            }

          } else {
            error.message = 'Unable to reach host.';
          }
        }

        if (error) {
          if (typeof callback !== 'undefined') {
            callback(error, null);
          }

          self.emit('error', error);
        } else {
          var
            response = new TuneServiceResponse(
              self.req.getUrl(),
              body,
              res.headers,
              res.statusCode
            );

          if (typeof callback !== 'undefined') {
            callback(null, response);
          }
          self.emit('success', response);
        }
      });
    });

    req.on('error', function(err) {
      if (typeof callback !== 'undefined') {
        callback(err);
      }
      self.emit('error', err);
    });

    req.end();
  } catch (err) {
    if (typeof callback !== 'undefined') {
      callback(err);
    }
    self.emit('error', err);
  }

  return self;
};

/**
 * Get request property for this request.
 *
 * @property getRequest
 * @return {TuneServiceRequest} object
 * @uses TuneServiceRequest
 */
TuneServiceClient.prototype.getRequest = function () {
  return this.req;
};

/**
 * Get response property for this request.
 *
 * @property getResponse
 * @return {TuneServiceResponse} object
 * @uses TuneServiceResponse
 */
TuneServiceClient.prototype.getResponse = function () {
  return this.rep;
};

module.exports = TuneServiceClient;