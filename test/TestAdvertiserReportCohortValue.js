#!/usr/bin/env node
/**
 * TestAdvertiserReportCohortValue.js, Test of TUNE Reporting API.
 *
 * @module tune-reporting
 * @submodule test
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

require('../lib/helpers/Date');

var
  config = require('../config.js'),
  tuneReporting = require('../lib'),
  AdvertiserReportCohortValue = tuneReporting.api.AdvertiserReportCohortValue,
  EndpointBase = tuneReporting.base.endpoints.EndpointBase,
  SessionAuthenticate = tuneReporting.api.SessionAuthenticate,
  expect = require('chai').expect;

describe('test AdvertiserReportCohortValue', function () {
  this.timeout(60000);
  var
    advertiserReport,
    apiKey,
    csvJobId,

    // Set start date to the start of one week ago.
    startDate = new Date().setOneWeekAgo().setStartTime().getIsoDateTime(),
    endDate = new Date().setYesterday().setEndTime().getIsoDateTime(),

    strResponseTimezone = 'America/Los_Angeles',
    arrayFieldsRecommended = null;

  before(function () {
    apiKey = process.env.API_KEY;
    config.set('tune.reporting.auth_key', apiKey);
    config.set('tune.reporting.auth_type', 'api_key');
    advertiserReport = new AdvertiserReportCohortValue();
  });

  it('fields recommended', function (done) {
    advertiserReport.getFields(
      EndpointBase.TUNE_FIELDS_RECOMMENDED,
      function (error, response) {
        expect(error).to.be.null;
        expect(response).to.be.not.null;
        arrayFieldsRecommended = response;
        expect(arrayFieldsRecommended).to.be.not.empty;
        done();
      }
    );
  });

  it('count', function (done) {

    var
      mapParams = {
        'start_date': startDate,
        'end_date': endDate,
        'cohort_type': 'click',
        'cohort_interval': 'year_day',
        'filter': '(publisher_id > 0)',
        'group': 'site_id,publisher_id',
        'response_timezone': strResponseTimezone
      };

    advertiserReport.count(
      mapParams,
      function (error, response) {
        expect(error).to.be.null;
        expect(response).to.be.not.null;
        expect(response.getHttpCode()).eql(200);
        done();
      }
    );
  });

  it('find', function (done) {

    var
      mapParams = {
        'start_date': startDate,
        'end_date': endDate,
        'fields': arrayFieldsRecommended,
        'group': 'site_id,publisher_id',
        'filter': '(publisher_id > 0)',
        'limit': 5,
        'page': null,
        'sort': null,
        'cohort_type': 'click',
        'cohort_interval': 'year_day',
        'aggregation_type': 'cumulative',
        'response_timezone': strResponseTimezone
      };

    advertiserReport.find(
      mapParams,
      function (error, response) {
        expect(error).to.be.null;
        expect(response).to.be.not.null;
        expect(response.getHttpCode()).eql(200);
        done();
      }
    );
  });

  it('export CSV', function (done) {

    var
      mapParams = {
        'start_date': startDate,
        'end_date': endDate,
        'fields': arrayFieldsRecommended,
        'group': 'site_id,publisher_id',
        'filter': '(publisher_id > 0)',
        'limit': 5,
        'page': null,
        'sort': null,
        'cohort_type': 'click',
        'cohort_interval': 'year_day',
        'aggregation_type': 'cumulative',
        'response_timezone': strResponseTimezone
      };

    advertiserReport.export(
      mapParams,
      function (error, response) {
        expect(error).to.be.null;
        expect(response).to.be.not.null;
        expect(response.getHttpCode()).eql(200);

        csvJobId = response.toJson().responseJson.data.job_id;
        expect(csvJobId).to.be.not.null;
        expect(csvJobId).to.be.a('string');
        expect(csvJobId).to.be.not.empty;

        done();
      }
    );
  });

  it('statusCsvReport', function (done) {
    advertiserReport.status(
      csvJobId,
      function (error, response) {
        expect(error).to.be.null;
        expect(response).to.be.not.null;
        done();
      }
    );
  });
});