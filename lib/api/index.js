#!/usr/bin/env node
/**
 * Classes that define root TUNE Advertiser Report endpoints.
 *
 * @module tune-reporting
 * @submodule api
 * @main tune-reporting
 *
 * @category  tune-reporting-node
 *
 * @author    Jeff Tanner <jefft@tune.com>
 * @copyright 2015 TUNE, Inc. (http://www.tune.com)
 * @license   http://opensource.org/licenses/MIT The MIT License (MIT)
 * @version   $Date: 2015-12-11 22:34:11 $
 * @link      http://developers.mobileapptracking.com @endlink
 */

function initializer() {}

initializer.AdvertiserReportActuals = require('./AdvertiserReportActuals');
initializer.AdvertiserReportLogClicks = require('./AdvertiserReportLogClicks');
initializer.AdvertiserReportLogEventItems = require('./AdvertiserReportLogEventItems');
initializer.AdvertiserReportLogEvents = require('./AdvertiserReportLogEvents');
initializer.AdvertiserReportLogInstalls = require('./AdvertiserReportLogInstalls');
initializer.AdvertiserReportLogPostbacks = require('./AdvertiserReportLogPostbacks');
initializer.AdvertiserReportCohortValues = require('./AdvertiserReportCohortValues');
initializer.AdvertiserReportCohortRetention = require('./AdvertiserReportCohortRetention');

initializer.Export = require('./Export');
initializer.SessionAuthenticate = require('./SessionAuthenticate');

module.exports = initializer;