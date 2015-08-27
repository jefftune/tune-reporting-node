#!/usr/bin/env node
/**
 * ExampleAdvertiserReportActuals.js, Example of TUNE Reporting API.
 *
 * @module examples
 * @main tune-reporting
 *
 * @category  tune-reporting-node
 *
 * @author    Jeff Tanner <jefft@tune.com>
 * @copyright 2015 TUNE, Inc. (http://www.tune.com)
 * @license   http://opensource.org/licenses/MIT The MIT License (MIT)
 * @version   $Date: 2015-08-26 17:01:46 $
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
  async = require('async'),
  AdvertiserReportActuals = tuneReporting.api.AdvertiserReportActuals,
  EndpointBase = tuneReporting.base.endpoints.EndpointBase,
  InvalidArgument = tuneReporting.helpers.InvalidArgument,
  ReportReaderCSV = tuneReporting.helpers.ReportReaderCSV,
  SessionAuthenticate = tuneReporting.api.SessionAuthenticate,
  response;

require('../lib/helpers/Date');

try {
  var
    authKey = config.get('tune.reporting.auth_key'),
    authType = config.get('tune.reporting.auth_type'),
    sessionAuthenticate = new SessionAuthenticate(),
    sessionToken,
    advertiserReport = new AdvertiserReportActuals(),

    startDate = new Date().setOneWeekAgo().setStartTime().getIsoDateTime(),
    endDate = new Date().setYesterday().setEndTime().getIsoDateTime(),

    strResponseTimezone = 'America/Los_Angeles',
    arrayFieldsRecommended = null,
    csvJobId = null,
    csvReportUrl = null,
    jsonJobId = null,
    jsonReportUrl = null;

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

  async.series({
    taskStartExample: function (next) {
      console.log('\n');
      console.log('======================================================'.blue.bold);
      console.log(' Begin: TUNE Advertiser Report Actuals                '.blue.bold);
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

      if (authType == 'api_key') {
        sessionAuthenticate.getSessionToken(authKey, function (error, response) {
          if (error) {
            return next(error);
          }

          console.log(' Status: "success"');

          sessionToken = response.getData();
          console.log(' session_token:');
          console.log(sessionToken);

          config.set('tune.reporting.auth_key', sessionToken);
          config.set('tune.reporting.auth_type', 'session_token');

          return next();
        });
      }
    },
    taskFieldsRecommended: function (next) {
      console.log('\n');
      console.log('==========================================================');
      console.log(' Recommended Fields of Advertiser Report Actuals          ');
      console.log('==========================================================');
      console.log('\n');

      advertiserReport.getFields(
        EndpointBase.TUNE_FIELDS_RECOMMENDED,
        function (error, response) {
          if (error) {
            return next(error);
          }

          console.log(' Status: "success"');
          console.log(' Recommended Fields:');
          console.log(response);
          arrayFieldsRecommended = response;
          return next();
        }
      );
    },
    taskCount: function (next) {
      console.log('\n');
      console.log('==========================================================');
      console.log(' Count Advertiser Report Actuals                          ');
      console.log('==========================================================');
      console.log('\n');

      var
        mapParams = {
          'start_date': startDate,
          'end_date': endDate,
          'group': 'site_id,publisher_id',
          'filter': '(publisher_id > 0)',
          'response_timezone': strResponseTimezone
        };

      advertiserReport.count(
        mapParams,
        function (error, response) {
          if (error) {
            return next(error);
          }

          if ((response.getHttpCode() !== 200) ||
            (response.getErrors() !== null)
          ) {
            return next(response);
          }

          var count = response.getData();

          console.log(' Status: "success"');
          console.log(' TuneServiceResponse:');
          console.log(response.toJson().responseJson.data);

          console.log('\n');
          console.log(util.format(' Count: %d', count));
          return next();
        }
      );
    },
    taskFindFilter1: function (next) {
      console.log('\n');
      console.log('==========================================================');
      console.log(' Find Advertiser Report Actuals with Filter #1.           ');
      console.log('==========================================================');
      console.log('\n');

      var
        mapParams = {
          'start_date': startDate,
          'end_date': endDate,
          'fields': arrayFieldsRecommended,
          'group': 'site_id,publisher_id',
          'filter': '(publisher_id > 0)',
          'limit': 5,
          'page': null,
          'sort': { 'paid_installs': 'DESC' },
          'timestamp': 'datehour',
          'response_timezone': strResponseTimezone
        };

      advertiserReport.find(
        mapParams,
        function (error, response) {
          if (error) {
            return next(error);
          }

          if ((response.getHttpCode() !== 200) || (response.getErrors() !== null)) {
            return next(response);
          }

          console.log(' Status: "success"');
          console.log(' requestUrl:');
          console.log(response.toJson().requestUrl);

          console.log(' data:');
          console.log(response.toJson().responseJson.data);

          return next();
        }
      );
    },
    taskFindFilter2: function (next) {
      console.log('\n');
      console.log('==========================================================');
      console.log(' Find Advertiser Report Actuals with Filter #2.           ');
      console.log('==========================================================');
      console.log('\n');

      var
        mapParams = {
          'start_date': startDate,
          'end_date': endDate,
          'fields': arrayFieldsRecommended,
          'group': 'site_id,publisher_id',
          'filter': null,
          'limit': 5,
          'page': null,
          'sort': { 'paid_installs': 'DESC' },
          'timestamp': 'datehour',
          'response_timezone': strResponseTimezone
        };

      advertiserReport.find(
        mapParams,
        function (error, response) {
          if (error) {
            return next(error);
          }

          if ((response.getHttpCode() !== 200) || (response.getErrors() !== null)) {
            return next(response);
          }

          console.log(' Status: "success"');
          console.log(' requestUrl:');
          console.log(response.toJson().requestUrl);

          console.log(' data:');
          console.log(response.toJson().responseJson.data);
          return next();
        }
      );
    },
    taskFindFilter3: function (next) {
      console.log('\n');
      console.log('==========================================================');
      console.log(' Find Advertiser Report Actuals with Filter #3.           ');
      console.log('==========================================================');
      console.log('\n');
      var
        fields = [
          'site_id',
          'site.name',
          'publisher_id',
          'publisher.name',
          'publisher_sub_campaign_id',
          'publisher_sub_campaign.name',
          'ad_clicks_unique,installs',
          'events',
          'payouts',
          'revenues_usd',
          'publisher_sub_campaign.ref'
        ],
        mapParams = {
          'start_date': startDate,
          'end_date': endDate,
          'fields': fields,
          'group': 'site_id,publisher_id',
          'filter': '(publisher_id > 0)',
          'limit': 5,
          'page': null,
          'sort': { 'installs': 'DESC' },
          'timestamp': 'datehour',
          'response_timezone': 'UTC'
        };

      advertiserReport.find(
        mapParams,
        function (error, response) {
          if (error) {
            return next(error);
          }

          if ((response.getHttpCode() !== 200) || (response.getErrors() !== null)) {
            return next(response);
          }

          console.log(' Status: "success"');
          console.log(' requestUrl:');
          console.log(response.toJson().requestUrl);

          console.log(' data:');
          console.log(response.toJson().responseJson.data);
          return next();
        }
      );
    },
    taskFindFilter4: function (next) {
      console.log('\n');
      console.log('==========================================================');
      console.log(' Find Advertiser Report Actuals with Filter #4.           ');
      console.log('==========================================================');
      console.log('\n');
      var
        fields = [
          'site_id',
          'site.name',
          'publisher_id',
          'publisher_sub_ad.name',
          'publisher_sub_ad.ref',
          'publisher.name',
          'ad_impressions',
          'ad_clicks',
          'installs',
          'opens',
          'revenues_usd'
        ],
        mapParams = {
          'start_date': startDate,
          'end_date': endDate,
          'fields': fields,
          'group': 'site_id,publisher_id,publisher_sub_ad_ref',
          'filter': '(publisher_id > 0)',
          'limit': 5,
          'page': null,
          'sort': { 'installs': 'DESC' },
          'timestamp': 'datehour',
          'response_timezone': 'UTC'
        };

      advertiserReport.find(
        mapParams,
        function (error, response) {
          if (error) {
            return next(error);
          }

          if ((response.getHttpCode() !== 200) || (response.getErrors() !== null)) {
            return next(response);
          }

          console.log(' Status: "success"');
          console.log(' requestUrl:');
          console.log(response.toJson().requestUrl);

          console.log(' data:');
          console.log(response.toJson().responseJson.data);
          return next();
        }
      );
    },
    taskExportCsvReport: function (next) {
      console.log('\n');
      console.log('==========================================================');
      console.log(' Export Advertiser Report Actuals CSV report.             ');
      console.log('==========================================================');
      console.log('\n');

      var
        mapParams = {
          'start_date': startDate,
          'end_date': endDate,
          'fields': arrayFieldsRecommended,
          'group': 'site_id,publisher_id',
          'filter': '(publisher_id > 0)',
          'format': 'csv',
          'timestamp': 'datehour',
          'response_timezone': strResponseTimezone
        };

      advertiserReport.export(
        mapParams,
        function (error, response) {
          if (error) {
            return next(error);
          }

          if ((response.getHttpCode() !== 200) || (response.getErrors() !== null)) {
            return next(response);
          }

          console.log(' Status: "success"');
          console.log(' requestUrl:');
          console.log(response.toJson().requestUrl);

          console.log(' data:');
          console.log(response.toJson().responseJson.data);

          csvJobId = response.toJson().responseJson.data;

          console.log('\n');
          console.log(util.format(' CSV Report Job ID: "%s"', csvJobId));
          return next();
        }
      );
    },
    taskStatusCsvReport: function (next) {
      console.log('\n');
      console.log('==========================================================');
      console.log(' Status Advertiser Report Actuals Logs CSV report.        ');
      console.log('==========================================================');
      console.log('\n');

      advertiserReport.status(
        csvJobId,
        function (error, response) {
          if (error) {
            return next(error);
          }

          if ((response.getHttpCode() !== 200) || (response.getErrors() !== null)) {
            return next(response);
          }

          console.log(' Status: "success"');
          var json = response.toJson();
          console.log(json.responseJson.data);

          return next();
        }
      );
    },
    taskFetchCsvReport: function (next) {
      console.log('\n');
      console.log('==========================================================');
      console.log(' Fetch Advertiser Report Actuals CSV report.              ');
      console.log('==========================================================');
      console.log('\n');

      csvReportUrl = undefined;

      advertiserReport.fetch(
        csvJobId,
        function (error, response) {
          if (error) {
            return next(error);
          }

          if ((response.getHttpCode() !== 200) || (response.getErrors() !== null)) {
            return next(response);
          }

          console.log(' Status: "success"');
          console.log(' TuneServiceResponse:');
          console.log(response.toJson().responseJson.data);

          if (100 === response.toJson().responseJson.data.percent_complete) {
            csvReportUrl = advertiserReport.parseResponseReportUrl(response);

            console.log('\n');
            console.log(util.format(' CSV Report URL: "%s"', csvReportUrl));
          } else {
            console.log(' Fetch CSV Report not completed:');
            console.log(response.toJson().responseJson.data);
          }

          return next();
        }
      );
    },
    taskReadCsvReport: function (next) {

      console.log('\n');
      console.log('==========================================================');
      console.log(' Read Advertiser Report Actuals CSV report.               ');
      console.log('==========================================================');
      console.log('\n');
      console.log('Export URL: ', csvReportUrl);
      console.log('\n');

      if (csvReportUrl) {
        var
          csv_reader = new ReportReaderCSV(csvReportUrl),
          print_request = csv_reader.prettyprint(5);

        print_request.once('success', function onSuccess(response) {
          console.log(response);
          next();
        });

        print_request.once('error', function onError(response) {
          return next(response);
        });
      } else {
        console.log(' Failed to fetch CSV Report URL.');
      }
    },
    taskCountSessionToken: function (next) {
      console.log('\n');
      console.log('==========================================================');
      console.log(' Count Advertiser Report Actuals session_token            ');
      console.log('==========================================================');
      console.log('\n');

      config.set('tune.reporting.auth_key', sessionToken);
      config.set('tune.reporting.auth_type', 'session_token');

      var
        mapParams = {
          'start_date': startDate,
          'end_date': endDate,
          'group': 'site_id,publisher_id',
          'filter': '(publisher_id > 0)',
          'response_timezone': strResponseTimezone
        };

      advertiserReport.count(
        mapParams,
        function (error, response) {
          if (error) {
            return next(error);
          }

          if ((response.getHttpCode() !== 200) || (response.getErrors() !== null)) {
            return next(response);
          }

          var count = response.getData();

          console.log(' Status: "success"');
          console.log(' TuneServiceResponse:');
          console.log(response.toJson());

          console.log('\n');
          console.log(util.format(' Count: %d', count));
          return next();
        }
      );
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
        console.log('======================================================'.red);
        console.log(' Status: "error"'.red);
        console.log(err);
        console.log('======================================================'.red);
      }
    });
} catch (err) {
  console.log('\n');
  console.log('======================================================'.red);
  console.log(' Exception: "error"'.red);
  console.log(err);
  console.log(stackTrace.parse(err));
  console.log('======================================================'.red);
}