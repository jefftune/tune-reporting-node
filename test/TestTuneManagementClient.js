#!/usr/bin/env node
/**
 * TestTuneManagementClient.js, Tests of TUNE Management API Client.
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
 * @version   $Date: 2015-01-08 13:24:24 $
 * @link      http://developers.mobileapptracking.com @endlink
 */
"use strict";

var
  config = require('../config.js'),
  tuneReporting = require('../lib'),
  SessionAuthenticate = tuneReporting.api.SessionAuthenticate,
  TuneServiceClient = tuneReporting.base.service.TuneServiceClient,
  TuneServiceRequest = tuneReporting.base.service.TuneServiceRequest,
  _ = require('lodash'),
  util = require('util'),
  async = require('async'),
  stackTrace = require('stack-trace'),
  expect = require('chai').expect,
  assert = require('chai').assert,
  spy = require('sinon').spy,
  client,
  eventEmitterStub,
  callbackSpy,
  clock;

describe('test TuneServiceClient', function () {
  var
    apiKey,
    client = undefined;

  before(function () {
    apiKey = process.env.TUNE_REPORTING_API_KEY;
    config.set('tune.reporting.auth_key', apiKey);
    config.set('tune.reporting.auth_type', 'api_key');
    client = new TuneServiceClient(
      'account/users',
      'find',
      apiKey,
      'api_key',
      {
        'limit' : 5,
        'filter' : "(first_name LIKE '%a%')"
      }
    );
  });

  describe('check instance', function () {
    it('client created', function (done) {
      assert(client);
      done();
    });
    it('client getRequest', function (done) {
      assert(client.getRequest());
      done();
    });
    it('client getController', function (done) {
      expect(client.getRequest()).to.have.property('controller');
      expect(client.getRequest().getController()).to.be.a('string');
      expect(client.getRequest().getController()).to.be.not.empty;
      done();
    });
    it('client getAction', function (done) {
      expect(client.getRequest()).to.have.property('action');
      expect(client.getRequest().getAction()).to.be.a('string');
      expect(client.getRequest().getAction()).to.be.not.empty;
      done();
    });
    it('api key', function (done) {
      assert(apiKey);
      done();
    });
  });

  it('make request using callback', function (done) {
    client.getClientRequest(function (error, response) {
      done();
    });
  });

  it('make request using events', function (done) {
    var clientRequest = client.getClientRequest();
    clientRequest.on('success', function onSuccess(response) {
      done();
    });

    clientRequest.on('error', function onError(response) {
      done();
    });
  });

  it('make request using sinon spy', function (done) {
    var
      callbackSpy = spy(),
      clientRequest = client.getClientRequest(callbackSpy);

    clientRequest.on('success', function onSuccess(response) {
      done();
    });

    clientRequest.on('error', function onError(response) {
      done();
    });
  });
});