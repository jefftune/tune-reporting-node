#!/usr/bin/env node
// define global objects:
/*global describe, before, it*/

// define jslint-options:
/* jshint -W030 -W036 */

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
 * @copyright 2014 TUNE, Inc. (http://www.tune.com)
 * @license   http://opensource.org/licenses/MIT The MIT License (MIT)
 * @version   $Date: 2014-12-23 15:54:36 $
 * @link      http://developers.mobileapptracking.com/tune-reporting-sdks/ @endlink
 */
"use strict";

require('../lib/helpers/Date');

var
  tuneReporting = require('../lib'),
  AdvertiserReportCohortValue = tuneReporting.api.AdvertiserReportCohortValue,
  EndpointBase = tuneReporting.base.endpoints.EndpointBase,
  expect = require('chai').expect;

describe('test AdvertiserReportCohortValue', function () {
  this.timeout(30000);
  var
    advertiserReport,
    apiKey,
    csvJobId,

    // Set start date to the start of one week ago.
    startDate = new Date().setOneWeekAgo().setStartTime().getIsoDateTime(),
    endDate = new Date().setYesterday().setEndTime().getIsoDateTime(),

    strResponseTimezone = 'America/Los_Angeles',
    fieldsRecommended = null;

  before(function () {
    apiKey = process.env.API_KEY;
    advertiserReport = new AdvertiserReportCohortValue(
      apiKey
    );
  });

  it('fields recommended', function (done) {
    advertiserReport.getFields(
      EndpointBase.TUNE_FIELDS_RECOMMENDED,
      function (error, response) {
        expect(error).to.be.null;
        expect(response).to.be.not.null;
        fieldsRecommended = response;
        expect(fieldsRecommended).to.be.not.empty;
        done();
      }
    );
  });

  it('count', function (done) {
    advertiserReport.count(
      startDate,
      endDate,
      'click',                                        // cohortType
      'year_day',                                     // cohortInterval
      'site_id,publisher_id',                         // group
      '(publisher_id > 0)',                           // filter
      strResponseTimezone,
      function (error, response) {
        expect(error).to.be.null;
        expect(response).to.be.not.null;
        expect(response.getHttpCode()).eql(200);
        done();
      }
    );
  });

  it('find', function (done) {
    advertiserReport.find(
      startDate,
      endDate,
      'click',                                        // cohortType
      'year_day',                                     // cohortInterval
      'cumulative',                                   // aggregationType
      fieldsRecommended,                             // fields
      'site_id,publisher_id',                         // group
      '(publisher_id > 0)',                           // filter
      5,                                              // limit
      null,                                           // page
      null,                                           // sort
      strResponseTimezone,
      function (error, response) {
        expect(error).to.be.null;
        expect(response).to.be.not.null;
        expect(response.getHttpCode()).eql(200);
        done();
      }
    );
  });

  it('exportReport CSV', function (done) {
    advertiserReport.exportReport(
      startDate,
      endDate,
      'click',                                        // cohortType
      'year_day',                                     // cohortInterval
      'cumulative',                                   // aggregationType
      fieldsRecommended,                             // fields
      'site_id,publisher_id',                         // group
      '(publisher_id > 0)',                           // filter
      strResponseTimezone,
      function (error, response) {
        expect(error).to.be.null;
        expect(response).to.be.not.null;
        expect(response.getHttpCode()).eql(200);

        csvJobId = advertiserReport.parseResponseReportJobId(response);
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
        done();
      }
    );
  });
});