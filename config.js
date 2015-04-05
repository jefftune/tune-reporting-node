#!/usr/bin/env node
/**
 * TUNE Reporting API module.
 *
 * @module tune-reporting
 * @main tune-reporting
 *
 * @category  tune-reporting-node
 *
 * @author    Jeff Tanner <jefft@tune.com>
 * @copyright 2015 TUNE, Inc. (http://www.tune.com)
 * @license   http://opensource.org/licenses/MIT The MIT License (MIT)
 * @version   $Date: 2015-01-07 18:08:35 $
 * @link      http://developers.mobileapptracking.com @endlink
 */

var
  fs = require("fs"),
  path = require("path"),
  convict = require("convict");

/**
 * load a config file if the configFile exists in given path
 *
 * @param  convict c         convict config isntance
 * @param  string configPath check if the given configPath exists.
 *
 * @return {Boolean}
 */
var loadConfigFile = function (c, configPath) {
  if (fs.existsSync(configPath)) {
    c.loadFile(configPath);
    return true;
  }

  var newPath = path.join(__dirname, configPath);
  if (fs.existsSync(configPath)) {
    c.loadFile(newPath);
    return true;
  }

  return false;
};


var config = convict({
  env: {
    doc: "TUNE Reporting SDK environment.",
    format: function (val) {
      if (!/(^prod|^test|^dev|^stage)/.test(val)) {
        throw new Error('Should be sensible environment value');
      }
    },
    default: "development",
    env: "NODE_ENV",
    arg: "env"
  },
  tune: {
    reporting: {
      auth_key: {
        doc: "TUNE Reporting Authentication Key: MobileAppTracking API_KEY or Session token.",
        format: String,
        default: "UNDEFINED",
        env: "TUNE_REPORTING_API_KEY",
        arg: "tune_reporting_auth_key"
      },
      auth_type: {
        doc: "TUNE Reporting Authentication Type: api_key OR session_token.",
        format: String,
        default: "api_key",
        arg: "tune_reporting_auth_type"
      },
      validate_fields: {
        doc: "Validate use TUNE Management API fields used within action parameters.",
        format: Boolean,
        default: false,
        arg: "tune_reporting_validate_fields"
      },
      status: {
        sleep: {
          doc: "TUNE reporting export status sleep (seconds).",
          format: "int",
          default: 10,
          arg: "tune_reporting_status_sleep"
        },
        timeout: {
          doc: "TUNE reporting export fetch timeout (seconds).",
          format: "int",
          default: 300,
          arg: "tune_reporting_status_timeout"
        },
        verbose: {
          doc: "TUNE reporting export fetch verbose output.",
          format: Boolean,
          default: false,
          arg: "tune_reporting_status_verbose"
        }
      }
    }
  }
});

// load environment dependent configurationk
loadConfigFile(
  config,
  path.join("./config/", config.get("env") + ".json")
);

// validate
config.validate();

module.exports = config;
