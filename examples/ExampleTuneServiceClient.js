#!/usr/bin/env node
/**
 * Examples of TUNE Reporting API
 *
 * @module examples
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

var
  config = require('../config.js'),
  tuneReporting = require('../lib'),
  _ = require('lodash'),
  util = require('util'),
  async = require('async'),
  stackTrace = require('stack-trace'),
  SessionAuthenticate = tuneReporting.api.SessionAuthenticate,
  TuneServiceClient = tuneReporting.base.service.TuneServiceClient,
  InvalidArgument = tuneReporting.helpers.InvalidArgument,
  client;

function conclude(status, response) {
  console.log('\n');
  console.log(' Status: "' + status + '"');
  console.log(' TuneServiceResponse:');
  console.log(response.toString());
}

try {
  var
    apiKey,
    authKey = config.get('tune.reporting.auth_key'),
    authType = config.get('tune.reporting.auth_type'),
    sessionAuthenticate = new SessionAuthenticate(),
    sessionToken,
    client = new TuneServiceClient(
      'account/users',
      'find',
      authKey,
      authType,
      {
        'limit' : 5,
        'filter' : "(first_name LIKE '%a%')"
      }
    );

  if (!authKey || !_.isString(authKey) || (0 === authKey.length)) {
    throw new InvalidArgument(
      'authKey'
    );
  }
  if (!authType || !_.isString(authType) || (0 === authType.length)) {
    throw new InvalidArgument(
      'authType'
    );
  }
  apiKey = authKey;

  async.series({
    taskStartExample: function (next) {
      console.log('\n');
      console.log('======================================================'.blue.bold);
      console.log(' Begin: TUNE Service Client                           '.blue.bold);
      console.log('======================================================'.blue.bold);
      console.log('\n');
      next();
    },
    taskSessionToken: function (next) {
      console.log('\n');
      console.log('==========================================================');
      console.log(' Get Session Token.                                       ');
      console.log('==========================================================');
      console.log('\n');

      sessionAuthenticate.getSessionToken(apiKey, function (error, response) {
        if (error) {
          return next(error);
        }

        console.log(' Status: "success"');
        console.log(' TuneServiceResponse:');
        console.log(response.toJson().responseJson.data);

        sessionToken = response.toJson().responseJson.data;
        console.log(' session_token:');
        console.log(sessionToken);
        return next();
      });
    },
    taskRequestViaCallback: function (next) {
      console.log('\n');
      console.log('==========================================================');
      console.log(' Handle TUNE Reporting API Client Request callback.       ');
      console.log('==========================================================');

      var
        clientRequest = client.getClientRequest(function (error, response) {
          if (error) {
            console.log('\n');
            console.log(' Callback: "error"');
            console.log(error);
            next(error);
          } else {
            console.log('\n');
            console.log(' Callback: "success"');
            console.log(' TuneServiceResponse:');
            console.log(response.toJson());
            next();
          }
        });
    },
    taskRequest: function (next) {
      console.log('\n');
      console.log('==========================================================');
      console.log(' TUNE Service Client Request.                      ');
      console.log('==========================================================');
      console.log('\n');

      var
        clientRequest = client.getClientRequest();

      clientRequest.on('success', function onSuccess(response) {
        console.log('\n');
        console.log(' Event: "success"');
        console.log(' TuneServiceResponse:');
        console.log(response.toJson().responseJson.data);
        next();
      });

      clientRequest.on('error', function onError(response) {
        console.log('\n');
        console.log(' Event: "error"');
        console.log(response);
        return next(response);
      });
    },
    taskRequestSessionToken: function (next) {
      console.log('==========================================================');
      console.log(' TUNE Service Client Request session_token.        ');
      console.log('==========================================================');
      console.log('\n');

      config.set('tune.reporting.auth_key', sessionToken);
      config.set('tune.reporting.auth_type', 'session_token');

      var
        clientRequest = client.getClientRequest();

      clientRequest.on('success', function onSuccess(response) {
        console.log('\n');
        console.log(' Event: "success"');
        console.log(' TuneServiceResponse:');
        console.log(response.toJson().responseJson.data);
        next();
      });

      clientRequest.on('error', function onError(response) {
        console.log('\n');
        console.log(' Event: "error"');
        console.log(response);
        return next(response);
      });
    },
    taskEndExample: function (next) {
      console.log('\n');
      console.log('======================================================'.green.bold);
      console.log(' End Example                                          '.green.bold);
      console.log('======================================================'.green.bold);
      console.log('\n');
      next();
    }
  },
    function (err) {

      if (err) {
        console.log('\n');
        console.log(' Status: "error"'.red);
        console.log(' TuneServiceResponse:');
        console.log(err);
      }
    });

} catch (err) {

  console.log('\n');
  console.log(' Exception: "error"'.red);
  console.log(err);
  console.log(stackTrace.parse(err));
}