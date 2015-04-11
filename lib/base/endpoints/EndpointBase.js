#!/usr/bin/env node
/**
 * Classes that define TUNE Advertiser Report endpoints base functionality.
 *
 * @module tune-reporting
 * @submodule endpoints
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
  config = require('../../../config.js'),
  InvalidArgument = require('../../helpers').InvalidArgument,
  TuneSdkError = require('../../helpers').TuneSdkError,
  TuneServiceError = require('../../helpers').TuneServiceError,
  _ = require('lodash'),
  util = require('util'),
  clone = require('clone'),
  async = require('async'),
  prettyjson = require('prettyjson'),
  TuneServiceClient = require('../service').TuneServiceClient,
  EventEmitter = require('events').EventEmitter;

require('../../helpers/String');

/**
 * TUNE MobileAppTracking Service endpoints base class.
 *
 * @class EndpointBase
 * @constructor
 * @extends EventEmitter
 *
 * @param string   controller   TUNE Advertiser Report endpoint name.
 * @param boolean  useConfig    Use SDK Configuration.
 */
function EndpointBase(
  controller,
  useConfig
) {
  EventEmitter.call(this);
  if (!controller ||
    !_.isString(controller) ||
    (controller.length === 0)
  ) {
    throw new InvalidArgument('Parameter "controller" is not defined.');
  }

  this.controller = controller;
  this.fields = undefined;
  this.useConfig = useConfig;
  this.modelName = undefined;
}

// Inherit the prototype methods from one constructor into another.
// The prototype of constructor will be set to a new object created from
// superConstructor.
util.inherits(EndpointBase, EventEmitter);

/**
 * Undetermined what fields to return for this endpoint.
 *
 * @property TUNE_FIELDS_UNDEFINED
 *
 * @type integer
 * @static
 * @final
 */
EndpointBase.TUNE_FIELDS_UNDEFINED     = 0;

/**
 * Return all fields for this endpoint.
 *
 * @property TUNE_FIELDS_ALL
 *
 * @type integer
 * @static
 * @final
 */
EndpointBase.TUNE_FIELDS_ALL           = 1;

/**
 * Return only the fields of this endpoint, no related fields.
 *
 * @property TUNE_FIELDS_ENDPOINT
 *
 * @type integer
 * @static
 * @final
 */
EndpointBase.TUNE_FIELDS_ENDPOINT      = 2;

/**
 * Return only the default fields of this endpoint.
 *
 * @property TUNE_FIELDS_DEFAULT
 *
 * @type integer
 * @static
 * @final
 */
EndpointBase.TUNE_FIELDS_DEFAULT       = 4;

/**
 * Return only the related fields of this endpoint.
 *
 * @property TUNE_FIELDS_RELATED
 *
 * @type integer
 * @static
 * @final
 */
EndpointBase.TUNE_FIELDS_RELATED       = 8;

/**
 * Return only the fields of this endpoint, and only immediate relate fields.
 *
 * @property TUNE_FIELDS_MINIMAL
 *
 * @type integer
 * @static
 * @final
 */
EndpointBase.TUNE_FIELDS_MINIMAL       = 16;

/**
 * Return only the recommended fields of this endpoint.
 *
 * @property TUNE_FIELDS_RECOMMENDED
 *
 * @type integer
 * @static
 * @final
 */
EndpointBase.TUNE_FIELDS_RECOMMENDED   = 32;

/**
 * Allowed directions for query string parameter 'sort'.
 *
 * @property SORT_DIRECTIONS
 *
 * @type array
 * @static
 * @final
 */
EndpointBase.SORT_DIRECTIONS = [
  'DESC',
  'ASC'
];

/**
 * Allowed operations for query string parameter 'filter'.
 *
 * @property FILTER_OPERATIONS
 *
 * @type array
 * @static
 * @final
 */
EndpointBase.FILTER_OPERATIONS = [
  '=',
  '!=',
  '<',
  '<=',
  '>',
  '>=',
  'IS',
  'NOT',
  'NULL',
  'IN',
  'LIKE',
  'RLIKE',
  'REGEXP',
  'BETWEEN'
];

/**
 * Allowed conjunctions for query string parameter 'filter'.
 *
 * @property FILTER_CONJUNCTIONS
 *
 * @type array
 * @static
 * @final
 */
EndpointBase.FILTER_CONJUNCTIONS = [
  'AND',
  'OR'
];

/**
 * Allowed report formats for query string parameter export 'format'.
 *
 * @property REPORT_EXPORT_FORMATS
 *
 * @type array
 * @static
 * @final
 */
EndpointBase.REPORT_EXPORT_FORMATS = [
  'csv',
  'json'
];

/**
 * Determine if string has balanced parentheses.
 *
 * @method parenthesesAreBalanced
 * @static
 *
 * @param String string
 *
 * @return {Boolean} String has balanced parentheses.
 */
EndpointBase.parenthesesAreBalanced = function (string) {
  var parentheses = "[]{}()",
    stack = [],
    i,
    character,
    bracePosition;

  for (i = 0; i < string.length; i++) {
    character = string[i];
    bracePosition = parentheses.indexOf(character);

    if (bracePosition !== -1) {
      if (bracePosition % 2 === 0) {
        stack.push(bracePosition + 1); // push next expected brace position
      } else {
        if (stack.length === 0 || stack.pop() !== bracePosition) {
          return false;
        }
      }
    }
  }

  return stack.length === 0;
};

/**
 * Get controller property for this request.
 *
 * @property getController
 * @type string
 */
EndpointBase.prototype.getController = function () {
  return this.controller;
};

/**
 * Get Authentication Key.
 *
 * @property getAuthKey
 * @type string
 */
EndpointBase.prototype.getAuthKey = function () {
  if (this.useConfig) {
    return config.get('tune.reporting.auth_key');
  }
  return undefined;
};

/**
 * Get Authentication Type.
 *
 * @property getAuthType
 * @type string
 */
EndpointBase.prototype.getAuthType = function () {
  if (this.useConfig) {
    return config.get('tune.reporting.auth_type');
  }
  return undefined;
};

/**
 * Get controller action property for this request.
 *
 * @property getValidateFields
 * @type boolean
 */
EndpointBase.prototype.getValidateFields = function () {
  return this.validateFields;
};

/**
 * Get model name for this endpoint.
 *
 * @property getModelName
 * @return {String}
 */
EndpointBase.prototype.getModelName = function () {
  if (!this.fields || (0 === this.fields.length)) {
    this._requestEndpointFields();
  }

  return this.modelName;
};

/**
 * Get list of recommended fields for endpoint.
 *
 * @property getFieldsRecommended
 * @protected
 * @return {Array}
 */
EndpointBase.prototype.getFieldsRecommended = function () {
  return [];
};

/**
 * Call action for this endpoint.
 *
 * @method request
 *
 * @param string   action         TUNE Advertiser Report endpoint's action name
 * @param dict     mapQueryString Action's query string parameters
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 */
EndpointBase.prototype.getEndpointRequest = function (
  action,
  mapQueryString
) {
  if (!action ||
    !_.isString(action) ||
    (action.length === 0)
  ) {
    throw new InvalidArgument('Parameter "action" is not defined.');
  }

  var
    client = new TuneServiceClient(
      this.controller,
      action,
      this.getAuthKey(),
      this.getAuthType(),
      mapQueryString
    ),
    clientRequest = client.getClientRequest();

  return clientRequest;
};

/**
 * Provide complete definition for this endpoint by calling action 'define'.
 *
 * @method getDefine
 *
 * @param object callback               Error-first Callback.
 */
EndpointBase.prototype.getDefine = function (callback) {
  var endpointRequest = this.getEndpointRequest('define');

  // Success event response
  endpointRequest.once('success', function onSuccess(response) {
    callback(null, response);
  });

  // Error event response
  endpointRequest.once('error', function onError(response) {
    callback(response, null);
  });
};

/**
 * Get all fields for an endpoint.
 *
 * @method getFields
 *
 * @param integer enumFieldsSelection   What subset of fields for this endpoint
 *                                        to return.
 * @param object callback               Error-first Callback.
 */
EndpointBase.prototype.getFields = function (
  enumFieldsSelection,
  callback
) {
  return this.getFieldsFiltered(enumFieldsSelection, callback);
};

/**
 * Get all fields for an endpoint.
 *
 * @method getFields
 *
 * @param integer enumFieldsSelection   What subset of fields for this endpoint
 *                                        to return.
 *
 * @return {EventEmitter} Event containing array of fields.
 * @uses EventEmitter
 */
EndpointBase.prototype.getFieldsFiltered = function (
  enumFieldsSelection,
  callback
) {
  var
    self = clone(this),
    fields,
    fields_filtered;

  if (enumFieldsSelection & EndpointBase.TUNE_FIELDS_RECOMMENDED) {
    fields = self.getFieldsRecommended();

    if (!fields || (0 === fields.length)) {
      if (typeof callback !== 'undefined') {
        callback(new TuneSdkError("No fields found for TUNE_FIELDS_RECOMMENDED."), null);
      }
      self.emit('error', new TuneSdkError("No fields found for TUNE_FIELDS_RECOMMENDED."));
    } else {
      self.response = fields;
      if (typeof callback !== 'undefined') {
        callback(null, self.response);
      }
      self.emit('success', self.response);
    }

    return self;
  }

  try {
    // Start the request

    async.series({
      get_fields: function (next) {
        if (!this.fields || (0 === this.fields.length)) {
          var fields_request = self._requestEndpointFields();

          fields_request.once('tune_endpoint_fields_success', function (fields_response) {
            self.fields = fields_response;
            next();
          });

          fields_request.once('tune_endpoint_fields_error', function (fields_response) {
            next(fields_response);
          });
        }
      },
      filter_fields: function (next) {
        if ((enumFieldsSelection & EndpointBase.TUNE_FIELDS_ALL) ||
          (!(enumFieldsSelection & EndpointBase.TUNE_FIELDS_DEFAULT) &&
          (enumFieldsSelection & EndpointBase.TUNE_FIELDS_RELATED))
        ) {
          self.response = _.keys(self.fields);
          next();
          return;
        }

        fields_filtered = {};

        _.each(self.fields, function (field_info, field_name) {
          if (((enumFieldsSelection & EndpointBase.TUNE_FIELDS_ENDPOINT) ||
            !(enumFieldsSelection & EndpointBase.TUNE_FIELDS_DEFAULT)) &&
            !field_info.related
          ) {
            fields_filtered[field_name] = field_info;
            return;
          }

          if (!(enumFieldsSelection & EndpointBase.TUNE_FIELDS_RELATED) &&
            !(enumFieldsSelection & EndpointBase.TUNE_FIELDS_MINIMAL) &&
            field_info.related
          ) {
            return;
          }

          if ((enumFieldsSelection & EndpointBase.TUNE_FIELDS_DEFAULT) &&
            field_info['default']
          ) {
            fields_filtered[field_name] = field_info;
            return;
          }

          if ((enumFieldsSelection & EndpointBase.TUNE_FIELDS_RELATED) &&
            field_info.related
          ) {
            fields_filtered[field_name] = field_info;
            return;
          }
        });

        fields = _.keys(fields_filtered);

        // Provide all immediate fields for this endpoint if
        // requested default fields but none were found.
        if ((enumFieldsSelection & EndpointBase.TUNE_FIELDS_DEFAULT) &&
          (!fields || (0 === fields.length))
        ) {
          next(new TuneSdkError("No fields found for TUNE_FIELDS_DEFAULT."));
          return;
        }

        self.response = fields;
        next();
      }
    },
      function (err) {
        if (err) {
          if (typeof callback !== 'undefined') {
            callback(err, null);
          }
          self.emit('error', err);
        } else {
          if (typeof callback !== 'undefined') {
            callback(null, self.response);
          }
          self.emit('success', self.response);
        }
      });
  } catch (err) {
    if (typeof callback !== 'undefined') {
      callback(err, null);
    }
    self.emit('error', err);
  }

  return self;
};

/**
 * Fetch all fields from model and related models of this endpoint.
 *
 * @method _requestEndpointFields
 * @private
 *
 * @return {EventEmitter} Event containing array of fields
 * @uses EventEmitter
 */
EndpointBase.prototype._requestEndpointFields = function (callback) {
  var
    self = clone(this),
    mapQueryString = {
      'controllers': this.controller,
      'details': 'modelName,fields'
    },
    client = new TuneServiceClient(
      'apidoc',
      'get_controllers',
      this.getAuthKey(),
      this.getAuthType(),
      mapQueryString
    ),
    clientRequest = client.getClientRequest();

  clientRequest.on('success', function onSuccess(response) {
    var
      data = response.getData(),
      requestUrl = response.getRequestUrl(),
      endpoint = this.controller,
      endpoint_metadata,
      fields,
      fields_found = {},
      related_fields = {},
      fields_found_merged = {};

    if (!data || (0 === data.length)) {
      self.fields_response = new TuneServiceError(
        util.format(
          'Failed to get fields for endpoint: "%s" "%s"',
          endpoint,
          requestUrl
        )
      );
      if (typeof callback !== 'undefined') {
        callback(self.fields_response, null);
      }
      self.emit('tune_endpoint_fields_error', self.fields_response);
    } else {
      endpoint_metadata = data[0];
      fields       = endpoint_metadata.fields;

      this.modelName = endpoint_metadata.modelName;

      _.each(fields, function (field, index) {
        var
          field_name = field.name,
          field_related,
          related_property,
          related_field_name;

        if (field.related) {
          if (field.type === 'property') {
            related_property = field_name;
            if (!related_fields.hasOwnProperty(related_property)) {
              related_fields[related_property] = [];
            }
            return;
          }

          field_related = field_name.split('.');
          related_property = field_related[0];
          related_field_name = field_related[1];

          if (!related_fields.hasOwnProperty(related_property)) {
            related_fields[related_property] = [];
          }

          related_fields[related_property].push(related_field_name);
          return;
        }

        fields_found[field_name] = {
          'default' : field.fieldDefault,
          'related': false
        };
      });

      _.each(fields_found, function (field_info, field_name) {
        fields_found_merged[field_name] = field_info;
        if ((field_name !== '_id') && field_name.endsWith('_id')) {
          var related_property =  field_name.substring(0, field_name.length - 3);
          if (related_fields.hasOwnProperty(related_property) &&
            (0 < related_fields.related_property.length)
          ) {
            _.each(related_fields.related_property, function (
              related_field_info,
              related_field_name
            ) {
              // Not including duplicate data.
              if (related_field_name === 'id') {
                return;
              }

              var related_property_field_name = related_property + '.' + related_field_name;

              fields_found_merged[related_property_field_name] = {
                'default' : field_info['default'],
                'related': true
              };
            });
          } else {
            fields_found_merged[related_property + '.name'] = {
              'default' : field_info['default'],
              'related': true
            };
          }
        }
      });

      if (typeof callback !== 'undefined') {
        callback(null, fields_found_merged);
      }
      self.emit('tune_endpoint_fields_success', fields_found_merged);
    }
  });

  clientRequest.on('error', function onError(response) {
    var
      error = new TuneServiceError(
        util.format(
          'Connection failure: Service Code: %d, Service Message: "%s", Request URL: "%s"',
          response.serviceStatusCode,
          response.message,
          response.requestUrl
        )
      );

    if (typeof callback !== 'undefined') {
      callback(error, null);
    }
    self.emit('tune_endpoint_fields_error', error);
  });

  return self;
};

/**
 * Validate query string parameter 'fields' having valid endpoint's fields.
 *
 * @method validateFields
 * @protected
 *
 * @param array|string fields
 *
 * @return {String}
 * @throws TuneSdkError
 */
EndpointBase.prototype.validateFields = function (mapQueryString) {

  if (!mapQueryString.hasOwnProperty('fields')) {
    throw new InvalidArgument(
      'Key "fields" not provided.'
    );
  }

  var fields = mapQueryString.fields;

  if (!fields || (!_.isString(fields) && !_.isArray(fields))) {
    throw new InvalidArgument(
      'Invalid Key "fields" provided.'
    );
  }

  if (_.isString(fields)) {
    fields = fields.replace(/\s+/g, '');
    fields = fields.split(',');
  }

  if (!_.isArray(fields) || (0 === fields.length)) {
    throw new InvalidArgument(
      'Invalid Key "fields" provided.'
    );
  }

  //if (this.verifyFields) {
  //  // TODO
  //}

  mapQueryString.fields = fields.join(',');

  return mapQueryString;
};

/**
 * Validate query string parameter 'group' having valid endpoint's fields.
 *
 * @method validateGroup
 * @protected
 *
 * @param array|string group
 *
 * @return {String}
 * @throws TuneSdkError
 */
EndpointBase.prototype.validateGroup = function (mapQueryString) {

  if (!mapQueryString.hasOwnProperty('group')) {
    throw new InvalidArgument(
      'Key "group" not provided.'
    );
  }

  var group = mapQueryString.group;

  if (!group || (!_.isString(group) && !_.isArray(group))) {
    throw new InvalidArgument(
      'Invalid parameter "group" provided.'
    );
  }

  if (_.isString(group)) {
    group = group.replace(/\s+/g, '');
    group = group.split(',');
  }

  if (!_.isArray(group) || (0 === group.length)) {
    throw new InvalidArgument(
      'Invalid parameter "group" provided.'
    );
  }

  //if (this.verifyFields) {
  //  // TODO
  //}

  mapQueryString.group = group.join(',');
  return mapQueryString;
};

/**
 * Validate query string parameter 'sort' having valid
 * endpoint's fields and direction.
 *
 * @method validateSort
 * @protected
 *
 * @param array|string group
 *
 * @return {String}
 * @throws TuneSdkError
 */
EndpointBase.prototype.validateSort = function (mapQueryString) {

  if (!mapQueryString.hasOwnProperty('sort')) {
    throw new InvalidArgument(
      'Key "sort" not provided.'
    );
  }

  var sort = mapQueryString.sort;

  if (!sort) {
    throw new InvalidArgument(
      'Invalid parameter "sort" provided.'
    );
  }

  var sortValidated = {};

  _.each(sort, function (sortDirection, sortField) {
    sortField = sortField.trim();
    sortDirection = sortDirection.trim().toUpperCase();

    //if (this.verifyFields) {
    //  // TODO
    //}

    if (!_.contains(EndpointBase.SORT_DIRECTIONS, sortDirection)) {
      throw new InvalidArgument(
        'Parameter "sort" contains an invalid direction: ' + sortDirection
      );
    }

    sortValidated[sortField] = sortDirection;
  });

  mapQueryString.sort = sortValidated;

  return mapQueryString;
};

/**
 * Validate query string parameter 'filter' having valid endpoint's fields
 * and filter expressions.
 *
 * @method validateFilter
 * @protected
 *
 * @param string filter
 *
 * @return {String}
 */
EndpointBase.prototype.validateFilter = function (mapQueryString) {

  if (!mapQueryString.hasOwnProperty('filter')) {
    throw new InvalidArgument(
      'Key "filter" not provided.'
    );
  }

  var filter = mapQueryString.filter;

  if (!filter || !_.isString(filter)) {
    throw new InvalidArgument(
      'Invalid parameter "filter" provided.'
    );
  }

  // Remove extra spaces
  filter = filter.replace(/\s{2,}/g, ' ');

  if (!EndpointBase.parenthesesAreBalanced(filter)) {
    throw new InvalidArgument(
      'Invalid parameter "filter" provided: "' + filter + '"'
    );
  }

  var
    filterConditionals = filter,
    filterParts,
    filterQuotedValueRegex = new RegExp(/\'[\w\%\$\@\.\-\_]+\'/),
    filterNumberValueRegex = new RegExp(/[\d\.]+/),
    regexFilterField = new RegExp(/[a-zA-Z0-9\.\_]+/);

  filterConditionals = filterConditionals.replace(/\(/g, ' ');
  filterConditionals = filterConditionals.replace(/\)/g, ' ');
  filterConditionals = filterConditionals.replace(/\s\s+/g, ' ');
  filterConditionals = filterConditionals.trim();

  filterParts = filterConditionals.split(' ');

  _.each(filterParts, function (filterPart) {
    filterPart = filterPart.trim();

    if (_.isString(filterPart) && (0 === filterPart.length)) {
      return;
    }
    if (filterQuotedValueRegex.test(filterPart)) {
      return;
    }
    if (filterNumberValueRegex.test(filterPart)) {
      return;
    }
    if (_.contains(EndpointBase.FILTER_OPERATIONS, filterPart)) {
      return;
    }
    if (_.contains(EndpointBase.FILTER_CONJUNCTIONS, filterPart)) {
      return;
    }
    if (_.isString(filterPart) &&
      (0 < filterPart.length) &&
      regexFilterField.test(filterPart)
    ) {
      return;
    }
    throw new InvalidArgument(
      util.format(
        'Invalid parameter "filter" provided: "%s": "%s": "%s"',
        filter,
        filterPart,
        typeof filterPart
      )
    );
  });

  mapQueryString.filter = util.format('(%s)', filter);

  return mapQueryString;
};

/**
 * Validate pagination parameter 'limit'.
 *
 * @method validateLimit
 * @protected
 *
 * @param integer limit
 *
 * @return {Integer}
 */
EndpointBase.prototype.validateLimit = function (mapQueryString) {

  if (!mapQueryString.hasOwnProperty('limit')) {
    throw new InvalidArgument(
      'Key "limit" not provided.'
    );
  }

  var limit = mapQueryString.limit;

  if (!_.isNumber(limit) || (0 > limit)) {
    throw new InvalidArgument(
      util.format('Invalid parameter "limit" provided: "%s"', limit)
    );
  }

  return mapQueryString;
};

/**
 * Validate pagination parameter 'page'.
 *
 * @method validatePage
 * @protected
 *
 * @param integer page
 *
 * @return {Integer}
 */
EndpointBase.prototype.validatePage = function (mapQueryString) {

  if (!mapQueryString.hasOwnProperty('page')) {
    throw new InvalidArgument(
      'Key "page" not provided.'
    );
  }

  var page = mapQueryString.page;

  if (!_.isNumber(page) || (0 > page)) {
    throw new InvalidArgument(
      util.format('Invalid parameter "page" provided: "%s"', page)
    );
  }

  return mapQueryString;
};

/**
 * Validate report format used at export request.
 *
 * @method validateFormat
 * @protected
 *
 * @param string format
 *
 * @return {String}
 */
EndpointBase.prototype.validateFormat = function (mapQueryString) {

  if (!mapQueryString.hasOwnProperty('format')) {
    throw new InvalidArgument(
      'Key "format" not provided.'
    );
  }

  var format = mapQueryString.format;

  if (!_.isString(format) || (0 === format.length)) {
    throw new InvalidArgument(
      util.format('Invalid parameter "format" provided: "%s"', format)
    );
  }

  format = format.trim().toLowerCase();

  if (!_.contains(EndpointBase.REPORT_EXPORT_FORMATS, format)) {
    throw new InvalidArgument(
      util.format('Invalid parameter "format" provided: "%s"', format)
    );
  }

  mapQueryString.format = format;

  return mapQueryString;
};

/**
 * Validate that provided string is either "YYYY-MM-DD' or "YYYY-MM-DD HH:MM:SS.
 *
 * @method validateDateTime
 * @protected
 *
 * @param string paramName
 * @param string dateTime
 *
 * @return {Boolean}
 * @throws InvalidArgument
 */
EndpointBase.prototype.validateDateTime = function (mapQueryString, paramName) {

  if (!mapQueryString.hasOwnProperty(paramName)) {
    throw new InvalidArgument(
      'Key "' + paramName + '" not provided.'
    );
  }

  var dateTime = mapQueryString[paramName];

  if (!dateTime || !_.isString(dateTime) || (0 === dateTime.length)) {
    throw new InvalidArgument('Parameter "' + paramName + '" is not valid.');
  }

  var
    regexDate = /^\d{4}\-\d{2}\-\d{2}$/,
    regexDateTime = /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/;

  if (regexDate.test(dateTime)) {
    return mapQueryString;
  }

  if (regexDateTime.test(dateTime)) {
    return mapQueryString;
  }

  throw new TuneSdkError(
    util.format('Invalid parameter "%s" provided: "%s"', paramName, dateTime)
  );
};

/**
 * Validates given fieldNames of options object
 * @param  object options      options object to be veirified
 * @param  Array paramNames    paramNames to be validated
 *
 * @return {Boolean}
 * @throws InvalidArgument
 */
EndpointBase.prototype.validateOptionalParams = function (options, paramNames) {
  if (typeof options === 'undefined' || options === null) {
    throw new InvalidArgument(
      'options object cannot be empty'
    );
  }
  var self = this;
  _.forEach(paramNames, function (paramName) {
    if (options[paramName]) {
      switch (paramName) {
      case 'startDate':
        self.validateDateTime(options, 'start_date');
        break;
      case 'endDate':
        self.validateDateTime(options, 'end_date');
        break;
      default:
        var validateFuncName = 'validate' + paramName.charAt(0).toUpperCase() + paramName.slice(1);
        var validateFunc = self[validateFuncName];
        if (validateFunc && typeof validateFunc === 'function') {
          options[paramName] = validateFunc.call(self, options);
        }
      }
    }
  });
  return true;
};

/**
 * Helper function for fetching report document given provided job identifier.
 *
 * Requesting for report url is not the same for all report endpoints.
 *
 * @method fetchRecords
 * @protected
 *
 * @param string    exportController      Controller for report export status.
 * @param string    exportAction          Action for report export status.
 * @param string    jobId                 Job Identifier of report on queue.
 * @param bool      verbose               For debugging purposes only.
 * @param int       sleep                 How long worker should sleep
 *                                            before next status request.
 * @param object    callback              Error-first Callback.
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 *
 * @throws InvalidArgument
 * @throws TuneServiceError
 */
EndpointBase.prototype._statusReport = function (
  exportController,
  exportAction,
  jobId
) {
  if (!exportController ||
    !_.isString(exportController) ||
    (0 === exportController.length)
  ) {
    throw new InvalidArgument(
      'exportController'
    );
  }
  if (!exportAction ||
    !_.isString(exportAction) ||
    (0 === exportAction.length)
  ) {
    throw new InvalidArgument(
      'exportAction'
    );
  }
  if (!jobId || !_.isString(jobId) || (0 === jobId.length)) {
    throw new InvalidArgument(
      'job_id'
    );
  }

  var
    mapQueryString = {
      'job_id': jobId
    },
    client = new TuneServiceClient(
      exportController,
      exportAction,
      this.getAuthKey(),
      this.getAuthType(),
      mapQueryString
    ),
    clientRequest = client.getClientRequest();

  return clientRequest;
};

/**
 * Helper function for fetching report document given provided job identifier.
 *
 * Requesting for report url is not the same for all report endpoints.
 *
 * @method fetchRecords
 * @protected
 *
 * @param string    exportController      Controller for report export status.
 * @param string    exportAction          Action for report export status.
 * @param string    jobId                 Job Identifier of report on queue.
 *                                        before next status request.
 *
 * @return {EventEmitter} Event containing service response.
 * @uses EventEmitter
 * @uses TuneServiceResponse
 *
 * @throws InvalidArgument
 * @throws TuneServiceError
 */
EndpointBase.prototype._fetchReport = function (
  exportController,
  exportAction,
  jobId,
  response
) {
  if (!exportController ||
    !_.isString(exportController) ||
    (0 === exportController.length)
  ) {
    throw new InvalidArgument(
      'exportController'
    );
  }
  if (!exportAction ||
    !_.isString(exportAction) ||
    (0 === exportAction.length)
  ) {
    throw new InvalidArgument(
      'exportAction'
    );
  }
  if (!jobId || !_.isString(jobId) || (0 === jobId.length)) {
    throw new InvalidArgument(
      'job_id'
    );
  }
  var
    sleep = config.get('tune.reporting.status.sleep'),
    verbose = config.get('tune.reporting.status.verbose'),
    timeout = config.get('tune.reporting.status.timeout'),
    self = clone(this),
    status = null,
    timeComplete = 0,
    percentComplete = 0,
    attempt = 0,
    done = false,
    statusResponse = null,
    mapQueryString = {
      'job_id': jobId
    },
    client = new TuneServiceClient(
      exportController,
      exportAction,
      this.getAuthKey(),
      this.getAuthType(),
      mapQueryString
    );

  if (sleep && (!_.isNumber(sleep) || (0 > sleep))
  ) {
    throw new InvalidArgument('Parameter "sleep" is not valid.');
  }

  if (timeout && (!_.isNumber(timeout) || (0 > timeout))
  ) {
    throw new InvalidArgument('Parameter "timeout" is not valid.');
  }

  if (verbose && !_.isBoolean(verbose)
  ) {
    throw new InvalidArgument('Parameter "verbose" is not valid.');
  }

  self.response = response;

  try {
    // Start the request
    async.until(
      function () {
        if (status && verbose) {
          console.log(
            util.format(
              '%d: status: %s, percent complete: %d',
              attempt,
              status,
              percentComplete
            )
          );
        }
        return done;
      },
      function (next) {
        if (timeout > 0) {
          if (timeComplete >= timeout) {
            done = true;
            next();
            return;
          }
          timeComplete = timeComplete + sleep;
        }
        var clientRequest = client.getClientRequest();

        clientRequest.once('success', function onSuccess(response) {
          statusResponse = response;

          var
            responseHttpCode = statusResponse.getHttpCode(),
            response_errors = statusResponse.getErrors(),
            response_data = statusResponse.getData();
          // Failed to get successful service response.
          if ((responseHttpCode !== 200) || (response_errors !== null)) {
            next(statusResponse);
            return;
          }

          // Failed to get data.
          if (!response_data) {
            next(statusResponse);
            return;
          }

          // Failed to get status.
          if (!response_data.hasOwnProperty('status')) {
            next(statusResponse);
            return;
          }

          // Get status.
          status = response_data.status;
          percentComplete = response_data.percent_complete;
          if ((status === 'fail') || (status === 'complete')) {
            done = true;
            next();
            return;
          }

          attempt += 1;
          setTimeout(next, sleep * 1000); // milliseconds
          return;
        });

        clientRequest.once('error', function onError(statusResponse) {
          next(statusResponse);
        });
      },
      function (err) {
        if (err) {
          self.response = err;
          self.emit('error', self.response);
        } else {
          self.response = statusResponse;
          self.emit('success', self.response);
        }
      }
    );

  } catch (err) {
    self.response = err;
    self.emit('error', self.response);
  }

  return self;
};

/**
 * Helper function for parsing export status response to gather report jobId.
 *
 * @method parseResponseReportJobId
 *
 * @param string response
 *
 * @return {String} Report job identifier within export queue.
 * @throws InvalidArgument
 * @throws TuneServiceError
 */
EndpointBase.prototype.parseResponseReportJobId = function (response) {
  if (!response) {
    throw new TuneServiceError("Parameter 'response' is not defined.");
  }
  var
    data = response.getData(),
    jobId;
  if (!data) {
    throw new TuneServiceError(
      util.format('Report request failed to get export data, response: "%s"', response.toString())
    );
  }
  jobId = data;
  if (!_.isString(jobId) || (0 === jobId.length)) {
    throw new TuneSdkError(
      util.format('Report request failed return "job_id": "%s"', response.toString())
    );
  }

  return jobId;
};

/**
 * Helper function for parsing export status response to gather report url.
 *
 * @method parseResponseReportUrl
 *
 * @param string response
 *
 * @return {String} Report URL for download.
 * @throws InvalidArgument
 * @throws TuneServiceError
 */
EndpointBase.prototype.parseResponseReportUrl = function (response) {
  if (!response) {
    throw new TuneServiceError("Parameter 'response' is not defined.");
  }
  var
    data = response.getData(),
    report_url;

  if (!data) {
    throw new TuneServiceError(
      util.format(
        'Report request failed to get export data, response: "%s"',
        response.toString()
      )
    );
  }

  if (!data.hasOwnProperty('data')) {
    throw new TuneServiceError(
      util.format(
        'Export data response does not contain "data": response: "%s"',
        prettyjson.render(data, {}, 2)
      )
    );
  }

  if (!data.data) {
    throw new TuneServiceError(
      util.format(
        'Export "data" is empty: response: "%s"',
        prettyjson.render(data, {}, 2)
      )
    );
  }

  if (!data.data.hasOwnProperty('url')) {
    throw new TuneServiceError(
      util.format(
        'Export "data" response does not contain "url": response "%s"',
        prettyjson.render(data.data, {}, 2)
      )
    );
  }

  report_url = data.data.url;
  if (!_.isString(report_url) || (0 === report_url.length)) {
    throw new TuneSdkError(
      util.format('Report request failed return report_url: "%s"', response.toString())
    );
  }

  return report_url;
};

/**
 * For debug purposes, provide string representation of this object.
 *
 * @method toString
 *
 * @return {String}
 */
EndpointBase.prototype.toString = function () {
  return util.format(
    'Endpoint "%s"',
    this.controller
  );
};

module.exports = EndpointBase;