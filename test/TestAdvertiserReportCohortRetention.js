#!/usr/bin/env node
/**
 * TestAdvertiserReportCohortRetention.js, Test of TUNE Reporting API
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
 * @version   $Date: 2015-04-05 13:42:19 $
 * @link      http://developers.mobileapptracking.com @endlink
 */
"use strict";

require('../lib/helpers/Date');

var
  config = require('../config.js'),
  tuneReporting = require('../lib'),
  AdvertiserReportCohortRetention = tuneReporting.api.AdvertiserReportCohortRetention,
  EndpointBase = tuneReporting.base.endpoints.EndpointBase,
  SessionAuthenticate = tuneReporting.api.SessionAuthenticate,
  expect = require('chai').expect;

describe('test AdvertiserReportCohortRetention', function () {
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
    advertiserReport = new AdvertiserReportCohortRetention();
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
      mapQueryString = {
        'start_date': startDate,
        'end_date': endDate,
        'cohort_type': 'click',
        'interval': 'year_day',
        'filter': '(install_publisher_id > 0)',
        'group': 'site_id,install_publisher_id',
        'response_timezone': strResponseTimezone
      };

    advertiserReport.count(
      mapQueryString,
      function (error, response) {
        expect(error).to.be.null;
        expect(response).to.be.not.null;
        expect(response.getHttpCode()).eql(200);
        done();
      }
    );
  });

  it('find', function (done) {
    expect(arrayFieldsRecommended).to.be.not.null;
    expect(arrayFieldsRecommended).to.be.not.empty;

    var
      mapQueryString = {
        'start_date': startDate,
        'end_date': endDate,
        'fields': arrayFieldsRecommended,
        'group': 'site_id,install_publisher_id',
        'filter': '(install_publisher_id > 0)',
        'limit': 5,
        'page': null,
        'sort': null,
        'cohort_type': 'click',
        'interval': 'year_day',
        'response_timezone': strResponseTimezone
      };

    advertiserReport.find(
      mapQueryString,
      function (error, response) {
        expect(error).to.be.null;
        expect(response).to.be.not.null;
        expect(response.getHttpCode()).eql(200);
        done();
      }
    );
  });

  it('exportReport CSV', function (done) {

    var
      mapQueryString = {
        'start_date': startDate,
        'end_date': endDate,
        'fields': arrayFieldsRecommended,
        'group': 'site_id,install_publisher_id',
        'filter': '(install_publisher_id > 0)',
        'cohort_type': 'click',
        'interval': 'year_day',
        'response_timezone': strResponseTimezone
      };

    advertiserReport.exportReport(
      mapQueryString,
      function (error, response) {
        expect(error).to.be.null;
        expect(response).to.be.not.null;

        csvJobId = response.toJson().responseJson.data.job_id;
        expect(csvJobId).to.be.not.null;
        expect(csvJobId).to.be.a('string');
        expect(csvJobId).to.be.not.empty;

        done();
      }
    );
  });

  it('statusCsvReport', function (done) {
    advertiserReport.statusReport(
      csvJobId,
      function (error, response) {
        expect(error).to.be.null;
        expect(response).to.be.not.null;
        expect(response.getHttpCode()).eql(200);
        done();
      }
    );
  });
});