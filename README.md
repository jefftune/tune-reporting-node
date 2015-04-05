<h2>tune-reporting</h2>
<h2>TUNE Reporting SDK for Node</h2>
<h3>Incorporate TUNE Reporting services.</h3>
<h4>Update:  $Date: 2015-04-05 13:42:19 $</h4>
<h4>Version: 1.0.0</h4>
===

<a id="TOP"></a>
### Table of Contents

<ul>
    <li><a href="#sdk_overview">Overview</a>
        <ul>
            <li><a href="#sdk_overview_available">Available TUNE Reporting SDKs</a></li>
            <li><a href="#sdk_overview_mobile">TUNE SDKs for Mobile Apps</a></li>
            <li><a href="#sdk_overview_dev_community">Developers Community</a></li>
        </ul>
    </li>
    <li><a href="#sdk_install">SDK Installation</a>
        <ul>
            <li><a href="#sdk_install_prereq">Prerequisites</a>
                <ul>
                    <li><a href="#sdk_install_prereq_env">Environment</a></li>
                    <li><a href="#sdk_install_prereq_ini">node.ini</a></li>
                    <li><a href="#sdk_install_prereq_apikey">Environment</a></li>
                </ul>
            </li>
            <li><a href="#sdk_install_choices">Choices</a>
                <ul>
                    <li><a href="#sdk_installation_npm">Composer</a></li>
                    <li><a href="#sdk_install_method_zip">ZIP</a></li>
                    <li><a href="#sdk_prerequisites_api_key">Environment</a></li>
                </ul>
            </li>
            <li><a href="#sdk_install_library">Library</a></li>
            <li><a href="#sdk_install_config">Configuration</a></li>
        </ul>
    </li>

    <li><a href="#sdk_gendoc">SDK Generated Documentation</a>
        <ul>
            <li><a href="#sdk_gendoc_yuidoc">YUIdoc</a></li>
        </ul>
    </li>

    <li><a href="#sdk_advertiser_reporting_overview">Advertiser Reporting Overview</a>
    </li>

    <li><a href="#sdk_exporting_reports">Exporting Advertiser Reports</a>
    </li>

    <li><a href="#sdk_sources">SDK Sources</a>
        <ul>
            <li><a href="#sdk_sources_lib">Library</a></li>
            <li><a href="#sdk_sources_examples">Examples</a></li>
            <li><a href="#sdk_sources_tests">Tests</a></li>
        </ul>
    </li>

    <li><a href="#sdk_classes">SDK Classes</a>
        <ul>
            <li><a href="#sdk_classes_service">TUNE Management Service Classes</a></li>
            <li><a href="#sdk_report_readers">Helper Classes</a></li>
            <li><a href="#sdk_classes_exceptions">Exception Classes</a></li>
        </ul>
    </li>

    <li>
        <a href="#sdk_methods">Advertiser Reporting Methods</a>
        <ul>
            <li><a href="#sdk_method_count"><code>count()</code></a></li>
            <li><a href="#sdk_method_find"><code>find()</code></a></li>
            <li><a href="#sdk_method_export"><code>export()</code></a></li>
            <li><a href="#sdk_method_status"><code>status()</code></a></li>
            <li><a href="#sdk_method_fetch"><code>fetch()</code></a></li>
            <li><a href="#sdk_method_fields"><code>fields()</code></a></li>
        </ul>
    </li>

    <li><a href="#sdk_reporting_fields">Advertiser Reporting Fields</a>
    </li>

    <li>
        <a href="#sdk_parameters">Advertiser Reporting Parameters</a>
        <ul>
            <li><a href="#sdk_parameter_fields"><code>fields</code></a></li>
            <li><a href="#sdk_parameter_group"><code>group</code></a></li>
            <li><a href="#sdk_parameter_sort"><code>sort</code></a></li>
            <li><a href="#sdk_parameter_filter"><code>filter</code></a></li>
        </ul>
    </li>

    <li><a href="#sdk_license">MIT License</a>
    </li>

    <li><a href="#sdk_issues">SDK Issues</a>
    </li>
</ul>

<p>
<a href="#TOP">
<img alt="Return to Top" src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/b_top.gif" border="0">
</a>
</p>

<!-- Overview -->

<a id="sdk_overview" name="sdk_overview"></a>
### Overview

The **TUNE Reporting SDKs** addressed in this posting are for creating hosted applications which require handling requests to **TUNE Advertiser Report services** with utility focus is upon Advertiser Reporting endpoints.

Even though the the breadth of the Management API goes beyond just reports, it is these reporting endpoints that our customers primarily access.

The second goal of the SDKs is to assure that our customers’ developers are using best practices in gathering reports in the most optimal way.

<a id="sdk_overview_available" name="sdk_overview_available"></a>
#### Available TUNE Reporting SDKs

Supported programming languages for TUNE Reporting SDKs are:

<ul>
    <li><b>PHP</b>: <a href="https://github.com/MobileAppTracking/tune-reporting-php" target="_blank">tune-reporting-php</a></li>
    <li><b>Python</b>: <a href="https://github.com/MobileAppTracking/tune-reporting-python" target="_blank">tune-reporting-python</a></li>
    <li><b>Java</b>: <a href="https://github.com/MobileAppTracking/tune-reporting-java" target="_blank">tune-reporting-java</a></li>
    <li><b>Node.js</b>: <a href="https://github.com/MobileAppTracking/tune-reporting-node" target="_blank">tune-reporting-node</a></li>
    <li><b>Go</b>: Coming soon</li>
    <li><b>C#</b>: Coming soon</li>
</ul>

<a id="sdk_overview_mobile" name="sdk_overview_mobile"></a>
#### TUNE SDKs for Mobile Apps

The **TUNE Reporting SDKs** should absolutely not be included within Mobile Apps.

All information pertaining to **TUNE SDKs for Mobile Apps** are found [here](http://developers.mobileapptracking.com/sdks/).

<a id="sdk_overview_dev_community" name="sdk_overview_dev_community"></a>
#### Developers Community

Developer Community portal for MobileAppTracking™ (MAT), the industry leader in mobile advertising attribution and analytics. From API documentation to best practices, get everything you need to be successful with MAT.

[https://developers.mobileapptracking.com](https://developers.mobileapptracking.com)

Additional positions on TUNE Reporting SDKs can be found here:

[https://developers.mobileapptracking.com/tune-reporting-sdks/](https://developers.mobileapptracking.com/tune-reporting-sdks/)

<p>
<a href="#TOP">
<img alt="Return to Top" src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/b_top.gif" border="0">
</a>
</p>

<!-- Installation -->

<a id="sdk_install" name="sdk_install"></a>
### SDK Installation

This section detail what is required to use this SDK and how to install it for usage.

<a id="sdk_install_prereq" name="sdk_install_prereq"></a>
#### Installation Prerequisites

<a id="sdk_install_prereq_env" name="sdk_install_prereq_env"></a>
##### Environment

These are the basic requirements to use this SDK:

    * node >= 0.10.*
    * npm >= 1.4.*

<a id="sdk_install_prereq_apikey" name="sdk_install_prereq_apikey"></a>
##### Generate API Key

To use SDK to access Advertiser Reporting endpoints of TUNE Advertiser Report, it requires a MobileAppTracking API Key: [Generate API Key](http://developers.mobileapptracking.com/generate-api-key/).

<a id="sdk_install_choices" name="sdk_install_choices"></a>
#### Installation Choices

You can install **tune-reporting-node** via *npm* or by downloading the source from github.

<a id="sdk_installation_npm" name="sdk_installation_npm"></a>
##### Via npm:

It is available on [npm](https://www.npmjs.com/): [*tune-reporting*](https://www.npmjs.com/package/tune-reporting)

Install as follows

```bash
    $ npm install tune-reporting
```

<a id="sdk_install_method_zip" name="sdk_install_method_zip"></a>
##### Via ZIP file:

[Click here to download the source code
(.zip)](https://github.com/MobileAppTracking/tune-reporting-node/archive/master.zip) for `tune-reporting`.

```bash
    $ git clone git@github.com:MobileAppTracking/tune-reporting-node
    $ cd tune-reporting-node
    $ npm install .
```

<a id="sdk_install_config" name="sdk_install_config"></a>
#### TUNE Reporting SDK Configuration

##### SDK Configuration file

The TUNE Reporting SDK configuration is set within file ```./config.js```.

And the appropriate environment settings:

```
config
├── development.json
├── production.json
└── test.json
```

With generated API_KEY from TUNE MobileAppTracking Platform account, replace `UNDEFINED`.

```
; TUNE MobileAppTracking Platform generated API Key. Replace UNDEFINED.
tune.reporting.auth_key=UNDEFINED
; TUNE Reporting Authentication Type: api_key OR session_token.
tune.reporting.auth_type=api_key
; Validate use TUNE Management API fields used within action parameters.
tune.reporting.verify_fields_boolean=false
; TUNE reporting export status sleep (seconds).
tune.reporting.status.sleep=10
; TUNE reporting export fetch timeout (seconds).
tune.reporting.status.timeout=240
; TUNE reporting export fetch verbose output.
tune.reporting.status.verbose=false
```

##### SDK Configuration module

The TUNE Reporting SDK reads configuration through module ```./config.js``` with the
current environment SDK configuration file.

```javascript
  var
    authKey = config.get('tune.reporting.auth_key'),
    authType = config.get('tune.reporting.auth_type');
```

By default, configuration is assumed using ```api_key``` authentication type.

To override 'api_key' authentication type:

```javascript
    config.set('tune.reporting.auth_key', apiKey);
    config.set('tune.reporting.auth_type', 'api_key');
```

To override authentication type using ```session_token```:

```javascript
    config.set('tune.reporting.auth_key', sessionToken);
    config.set('tune.reporting.auth_type', 'session_token');
```

If you wish to generate your own session_token, class ```SessionAuthentication``` is provided:

```javascript
  var
    apiKey = config.get('tune.reporting.auth_key'),
    sessionAuthenticate = new SessionAuthenticate();

    sessionAuthenticate.getSessionToken(apiKey, function (error, response) {
      if (error) {
        return next(error);
      }

      console.log(' Status: "success"');
      sessionToken = response.getData();
      console.log(' session_token:');
      console.log(sessionToken);
      return next();
    });
```

and you're good to go!

<p>
<a href="#TOP">
<img alt="Return to Top" src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/b_top.gif" border="0">
</a>
</p>

<!-- Generated Documentation -->

<a id="sdk_gendoc" name="sdk_gendoc"></a>
### SDK Generated Documentation

SDK code is well commented and to see full documentation of its source using the provided Makefile commands that initiate code documentation generators.

<a id="sdk_gendoc_yuidoc" name="sdk_gendoc_yuidoc"></a>
#### Node.jsdoc

The following will generate [YUIdoc](http://yui.github.io/yuidoc/) from Node.js codebase:

This code documentation generation may require npm installation of [YUIdoc](http://yui.github.io/yuidoc/).

<pre lang="bash">
    $ make docs-yuidoc
</pre>

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/TuneReporting_Node_YUIdoc.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/TuneReporting_Node_YUIdoc-400x132.png" alt="Tune-Reporting Node.js Node.jsdoc Generated" width="400" height="222">
</a>

<p>
<a href="#TOP">
<img alt="Return to Top" src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/b_top.gif" border="0">
</a>
</p>

<p>&nbsp;</p>
<a id="sdk_advertiser_reporting_overview" name="sdk_advertiser_reporting_overview"></a>
### Advertiser Reporting Overview

The utility focus of the SDKs is upon the <a href="/advertiser-reporting-endpoints/">Advertiser Reporting endpoints</a>. Even though the the breadth of the Management API goes beyond just reports, it is these endpoints that our customers primarily access. The second goal of the SDKs is to assure that our customers' developers are using best practices in gathering reports in the most optimal way.

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/tune_advertiser_reporting_classes.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/tune_advertiser_reporting_classes.png" alt="Tune Advertiser Reporting Classes" width="500" height="350" /></a>

The endpoints interfaced by TUNE API SDKs provide access in gathering four types of reports:

<dl>
<dt>Log Reports</dt>
<dd>
Log reports provide measurement records for each Click, Install, Event, Event Item and Postback. Instead of being aggregated, the data is on a per transaction / request basis. MobileAppTracking&trade; (MAT) uses these logs to generate the aggregated data for the Actuals and Cohort reports. Note that we don’t provide Log reports for Impressions and Opens currently.

Advertiser Reporting classes that perform Log Reports are:
<ul>
    <li><code>AdvertiserReportLogClicks</code>: <a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__clicks/">/advertiser/stats/clicks/</a></li>
    <li><code>AdvertiserReportLogEventItems</code>:<a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__event__items/">/advertiser/stats/event/items/</a></li>
    <li><code>AdvertiserReportLogEvents</code>:<a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__events/">/advertiser/stats/events/</a></li>
    <li><code>AdvertiserReportLogInstalls</code>:<a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__installs/">/advertiser/stats/installs/</a></li>
    <li><code>AdvertiserReportLogPostbacks</code>:<a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__postbacks/">/advertiser/stats/postbacks/</a></li>
</ul>

</dd>
<dt>Actuals Report</dt>
<dd>
The Actuals report gives you quick insight into the performance of your apps and advertising partners (publishers). Use this report for reconciliation, testing, debugging, and ensuring that all measurement and attribution continues to operate smoothly. MAT generates this report by aggregating all the logs of each request (MAT updates the report every 5 minutes).

Actuals report endpoint include: <a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats/">/advertiser/stats/</a>: Reports' class <a href="#sdk-advertiser-report-actuals"><code>AdvertiserReportActuals</code></a>

Advertiser Reporting class that perform Actuals Reports is:
<ul>
    <li><code>AdvertiserReportActuals</code>: <a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats/">/advertiser/stats/</a></li>
</ul>
</dd>
<dt>Cohort Report</dt>
<dd>
The Cohort report analyzes user behavior back to click date time (Cohort by Click) or to install date time (Cohort by Install). Depending on whether you view the results based on click or install, the data in the report is vastly different.

Advertiser Reporting class that perform Cohort Reports is:
<ul>
    <li><code>AdvertiserReportCohortValue</code>: <a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__ltv">/advertiser/stats/ltv</a></li>
</ul>
</dd>
<dt>Retention Report</dt>
<dd>
The Retention report shows you how many of your installed users open or engage with your app over time (how users continue to get value from the app). AdvertiserReportCohortRetention reports are particularly good for evaluating the quality of users as opposed to the quantity of users (as in the case of user acquisition campaigns). For more information about retention reports, please visit <a href="http://support.mobileapptracking.com/entries/42179044-Running-AdvertiserReportCohortRetention-Reports">Running AdvertiserReportCohortRetention Reports</a>.

Advertiser Reporting class that perform Retention Reports are:
<ul>
    <li><code>AdvertiserReportCohortRetention</code>: <a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__retention">/advertiser/stats/retention</a></li>
</ul>
</dd>
</dl>

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/tune_management_service_reporting_endpoints.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/tune_management_service_reporting_endpoints.png" alt="Management API Advertiser Reports covered by TUNE Reporting SDKs." width="592" height="292" /></a>

<p>
<a href="#TOP">
<img alt="Return to Top" src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/b_top.gif" border="0">
</a>
</p>

<a id="sdk_exporting_reports" name="sdk_exporting_reports"></a>
### Exporting Advertiser Reports
Currently, there are two different ways of handling advertiser report exports. Both approaches require (A) an action to request that a report be exported and (B) another action to request the report status (if ready to be exported), and if ready, then provide a URL to download the completed report.

Logs and Actuals reports all request an export using action <code>find_export_queue.json</code>, which returns a <code>job_id</code>. You then pass the <code>job_id</code> onto another endpoint <code>Export::download.json</code>, which performs the status checking and report URL retrieval.

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/management-api-report-exports1.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/management-api-report-exports1-600x569.png" alt="Exporting logs and actuals reports." width="600" height="569" /></a>

Cohort and AdvertiserReportCohortRetention reports all request an export using action <code>export.json</code>, which also returns a <code>job_id</code>. You then pass the <code>job_id</code> onto another action <code>status.json</code>, which performs the status checking and report URL retrieval.

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/management-api-insight-report-exports.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/management-api-insight-report-exports-600x459.png" alt="Export cohort and retention reports." width="600" height="459" /></a>

<p>
<a href="#TOP">

<img alt="Return to Top" src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/b_top.gif" border="0">
</a>
</p>

<!-- Sources -->

<a id="sdk_sources" name="sdk_sources"></a>
### SDK Sources

The key contents of SDK is **src**, which contains the library; followed by the **examples**, and **tests**.

File **Makefile** provides shortcuts for executing examples and tests.

```
.
├── AUTHORS.md
├── CHANGES.md
├── config
│   ├── development.json
│   ├── jsdoc.json
│   ├── nodelint.js
│   ├── production.json
│   ├── test.json
│   └── yuidoc.json
├── config.js
├── docs
├── examples
├── index.js
├── lib
├── Makefile
├── package.json
├── README.md
└── test
```

<a id="sdk_sources_lib" name="sdk_sources_lib"></a>
#### Library

File **index.js** is the root of this Library.

Library folder **lib** contains the key functionality related to **Advertiser Reporting classes** are defined within folder **/lib/api/**.

Client classes that connect with the **TUNE Advertiser Report Service** are defined within folder **/lib/base/service/**.

Helper class for both the Library and Examples are defined within folder **/lib/helpers/**.

```
lib/
├── api
│   ├── AdvertiserReportActuals.js
│   ├── AdvertiserReportCohortRetention.js
│   ├── AdvertiserReportCohortValue.js
│   ├── AdvertiserReportLogClicks.js
│   ├── AdvertiserReportLogEventItems.js
│   ├── AdvertiserReportLogEvents.js
│   ├── AdvertiserReportLogInstalls.js
│   ├── AdvertiserReportLogPostbacks.js
│   ├── Export.js
│   ├── index.js
│   └── SessionAuthenticate.js
├── base
│   ├── endpoints
│   │   ├── AdvertiserReportActualsBase.js
│   │   ├── AdvertiserReportBase.js
│   │   ├── AdvertiserReportCohortBase.js
│   │   ├── AdvertiserReportLogBase.js
│   │   ├── EndpointBase.js
│   │   └── index.js
│   ├── index.js
│   └── service
│       ├── index.js
│       ├── TuneServiceClient.js
│       ├── QueryStringBuilder.js
│       ├── TuneServiceRequest.js
│       └── TuneServiceResponse.js
├── helpers
│   ├── Date.js
│   ├── index.js
│   ├── InvalidArgument.js
│   ├── LogicError.js
│   ├── NotImplemented.js
│   ├── ReportReaderCSV.js
│   ├── ReportReaderJSON.js
│   ├── String.js
│   ├── TuneSdkError.js
│   └── TuneServiceError.js
└── index.js
```

<a id="sdk_sources_examples" name="sdk_sources_examples"></a>
#### SDK Examples

Run the following script to view execution of all examples:
```bash
    $ make examples api_key=[API_KEY]
```

Each Advertiser Report class defined in **/lib/api/** has an example:

```
examples/
├── ExampleAdvertiserReportActuals.js
├── ExampleAdvertiserReportCohortRetention.js
├── ExampleAdvertiserReportCohortValue.js
├── ExampleAdvertiserReportLogClicks.js
├── ExampleAdvertiserReportLogEventItems.js
├── ExampleAdvertiserReportLogEvents.js
├── ExampleAdvertiserReportLogInstalls.js
├── ExampleAdvertiserReportLogPostbacks.js
└── ExampleTuneManagementClient.js
```

<a id="sdk_sources_tests" name="sdk_sources_tests"></a>
#### SDK Tests


Run the following script to view execution of all unittests:
```bash
    $ make test api_key=[API_KEY]
```

Each Advertiser Report class defined in **/lib/api/** has a test:

```
test/
├── TestAdvertiserReportActuals.js
├── TestAdvertiserReportCohortRetention.js
├── TestAdvertiserReportCohortValue.js
├── TestAdvertiserReportLogClicks.js
├── TestAdvertiserReportLogEventItems.js
├── TestAdvertiserReportLogEvents.js
├── TestAdvertiserReportLogInstalls.js
├── TestAdvertiserReportLogPostbacks.js
└── TestTuneManagementClient.js
```

<p>
<a href="#TOP">
<img alt="Return to Top" src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/b_top.gif" border="0">
</a>
</p>

<!-- Classes -->
<a id="sdk_classes" name="sdk_classes"></a>
### SDK Classes

<!-- TUNE Advertiser Report Service -->
<a id="sdk_classes_service" name="sdk_classes_service"></a>
#### TUNE Advertiser Report Service Classes

<ul>
    <li><code>TuneServiceClient</code> - Connects with <a href="http://developers.mobileapptracking.com/management-api/" target="_blank">TUNE Advertiser Report Service</a></li>
    <li><code>TuneServiceRequest</code> - Defines request to TUNE Advertiser Report Service containing:
        <ul>
            <li>Controller / Endpoint</li>
            <li>Action</li>
            <li>Query String Parameters
                <ul>
                    <li>API Key</li>
                </ul>
            </li>
        </ul>
    </li>
    <li><code>TuneServiceResponse</code> - Complete response from TUNE Advertiser Report Service containing:
        <ul>
            <li>Status Code</li>
            <li>Data</li>
            <li>Errors</li>
        </ul>
    </li>
</ul>

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/tune_reporting_service_classes.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/tune_reporting_service_classes.png" alt="TUNE Management Service Classes" width="217" height="163" /></a>

<!-- Example Helpers -->
<a id="sdk_report_readers" name="sdk_report_readers"></a>
#### Report Readers Classes

<ul>
    <li><code>ReportReaderCSV</code> - Reads exported CSV report using downloaded URL.</li>
    <li><code>ReportReaderJSON</code> - Reads exported JSON report using downloaded URL.</li>
</ul>

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/tune_reporting_reader_classes.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/tune_reporting_reader_classes.png" alt="Report Reader Helper Classes." width="217" height="163" title="Click to Expand" /></a>

<!-- Exceptions -->
<a id="sdk_classes_exceptions" name="sdk_classes_exceptions"></a>
#### Custom Exceptions Classes

<ul>
    <li><code>TuneSdkException</code> - Exception thrown if error occurs within TUNE Reporting SDK.</li>
    <li><code>TuneServiceException</code> - Exception thrown if error condition is returned from TUNE Management Service.</li>
</ul>

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/tune_reporting_exceptions.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/tune_reporting_exceptions.png" alt="Custom Exceptions." width="217" height="163" title="Click to Expand" /></a>


<a id="sdk_methods" name="sdk_methods"></a>
### Advertiser Reporting Methods

<strong>Important to note on Sample Code:</strong> The example provided pertain to only Advertiser Reports class <code>AdvertiserReportLogClicks</code>. The fields used theses sample primarily pertain to the available fields for the record and related records for the the associated endpoint <a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__clicks/">/advertiser/stats/clicks</a> of this class. Do not expect that these fields will be available if used with other Advertiser Records classes.

The benefit of using TUNE Reporting API SDKs is it provides the same interface across all advertiser reports. The following class diagram lists what are all the expected functions. The signature of the expected parameters for each function will be consistent with the action it is interfacing.

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/management-sdk-class.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/management-sdk-class-600x262.png" alt="Report classes available methods." width="600" height="262" title="Click to Expand" /></a>

<a id="sdk_method_count" name="sdk_method_count"></a>
##### Method <code>count()</code>

Finds all existing records matching provided filter criteria and returns total count. It returns a populated instance of <code>class Response</code>, class of TUNE Reporting API SDK, with <strong>record count</strong>.

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/management-api-action-count.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/management-api-action-count-700x247.png" alt="Function count()" width="700" height="247" title="Click to Expand" /></a>

<!-- Node.js -->
```javascript
    var
      advertiserReport = new AdvertiserReportLogClicks(),
      mapQueryString = {
        'start_date': startDate,
        'end_date': endDate,
        'filter': null,
        'response_timezone': strResponseTimezone
      };

    advertiserReport.count(
      mapQueryString,
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
        console.log(response.toJson().responseJson.data);

        console.log('\n');
        console.log(util.format(' Count: %d', count));
        return next();
      }
    );
```

<a id="sdk_method_find" name="sdk_method_find"></a>
##### Method <code>find()</code>

Gathers all existing records that match filter criteria and returns an array of found model data. Even though calling the action <code>find.json</code> is commonly used for gathering data, however it is not the preferred way of gathering full reports. It returns a populated instance of <code>class Response</code> with <strong>records</strong>.

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/management-api-action-find.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/management-api-action-find-700x511.png" alt="Function find()" width="700" height="511" title="Click to Expand" /></a>

<!-- Node.js -->
```javascript
    var
      advertiserReport = new AdvertiserReportLogClicks(),
      mapQueryString = {
        'start_date': startDate,
        'end_date': endDate,
        'fields': arrayFieldsRecommended,
        'filter': null,
        'limit': 5,
        'page': null,
        'sort': { 'created': 'DESC' },
        'response_timezone': strResponseTimezone
      };

    advertiserReport.find(
      mapQueryString,
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
        return next();
      }
    );
```

<a id="sdk_method_export" name="sdk_method_export"></a>
##### Method <code>export()</code>fieldsRecommended

Provides the same signature as function find(), accept parameters <code>limit</code> and <code>page</code>, because this function's intent is to request export of a full report. It returns a populated instance of <code>class Response</code> with <strong>job identifier</strong> of report in queue and ready to be processed. Format of content can be requested to be either CSV or JSON.

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/management-api-action-export.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/management-api-action-export-700x338.png" alt="Function export()" width="700" height="338" title="Click to Expand" /></a>

<!-- Node.js -->
```javascript
    var
      advertiserReport = new AdvertiserReportLogClicks(),
      mapQueryString = {
        'start_date': startDate,
        'end_date': endDate,
        'fields': arrayFieldsRecommended,
        'filter': null,
        'format': 'json',
        'response_timezone': strResponseTimezone
      };

    advertiserReport.exportReport(
      mapQueryString,
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

        jsonJobId = response.toJson().responseJson.data;

        console.log('\n');
        console.log(util.format(' JSON Report Job ID: "%s"', jsonJobId));
        return next();
      }
    );
```

<a id="sdk_method_status" name="sdk_method_status"></a>
##### Method <code>status()</code>


As discussed in <a href="#exporting-reports">Exporting Advertise Reports</a>, for gathering report export status records' classes <strong>Cohort (AdvertiserReportCohortValue)</strong> and <strong>AdvertiserReportCohortRetention</strong> uses it own method <code>status()</code>. Its purpose is the same as method <code>Export::download()</code>.


<a id="sdk_method_fetch" name="sdk_method_fetch"></a>
##### Method <code>fetch()</code>

A helper function that creates a threaded worker that handles the status request appropriate to it class. This function handles the polling of the service waiting for status of "complete" and its "report url". Upon completion, fetch downloads data into a reader that parses the contents that is appropriate requested content format type, CSV or JSON.

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/management-api-action-fetch.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/management-api-action-fetch-700x337.png" alt="Function fetch()" width="700" height="337" title="Click to Expand" /></a>

<!-- Node.js -->
```javascript
    var
      advertiserReport = new AdvertiserReportLogClicks(),
      requestFetch = advertiserReport.fetchReport(
        csvJobId
      );

    requestFetch.once('success', function onSuccess(response) {
      if ((response.getHttpCode() !== 200) || (response.getErrors() !== null)) {
        next(response);
      } else {

        console.log('\n');
        console.log(' Status: "success"');
        console.log(' TuneServiceResponse:');
        console.log(response.toString());

        csvReportUrl = advertiserReport.parseResponseReportUrl(response);

        console.log('\n');
        console.log(util.format(' CSV Report URL: "%s"', csvReportUrl));

        next();
      }
    });

    requestFetch.once('error', function onError(response) {
      return next(response);
    });
```

<a id="sdk_method_fields" name="sdk_method_fields"></a>
##### Method <code>fields()</code>

Method <strong>fields()</strong> returns a listing of all the fields that can be used that can be used by that report endpoint, which will include all the field of its immediate record and all its related records.

<!-- Node.js -->
```javascript
    var advertiserReport = new AdvertiserReportLogClicks(
      apiKey,
      true
    );

    var fields_request = advertiserReport.getFields(
      EndpointBase.TUNE_FIELDS_RECOMMENDED
    );
    fields_request.once('success', function onSuccess(response) {
      console.log('\n');
      console.log(' Status: "success"');
      console.log(' TuneServiceResponse:');
      console.log(response);
      fieldsRecommended = response;
      next();
    });

    fields_request.once('error', function onError(response) {
      return next(response);
    });
```

<p>
<a href="#TOP">
<img alt="Return to Top" src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/b_top.gif" border="0">
</a>
</p>

<a id="sdk_reporting_fields" name="sdk_reporting_fields"></a>
### Advertiser Reporting Fields

It is important to understand that every endpoint has its own unique set of fields based upon the model its data is associated with, and the model's related entities.

Making a request with a field name that does not exist with the endpoint's set of available fields can cause a service error. So it is important to make sure that the field names used within method parameter type <code>fields</code>, <code>filter</code>, <code>sort</code>, and <code>group</code> are appropriate to the endpoint it is calling.

Two helpful functions that come with every report class are <code>define()</code> and <code>fields()</code>. Every advertiser reports endpoint has a different data model associated with it. With that, what fields are available are not consistent across records. So use these functions to understand available field choices.

Function <code>define()</code> returns a complete metadata mapping of the endpoint, and function <code>fields()</code> returns a complete listing of all field names of the model associated with the endpoint function was called through, and endpoint's related entities' field names.

In addition, the constructor for every advertiser records' class has a bool parameter <code>validate</code> which checks that the field names used within parameter values are valid.

Another tool is to pre-build your request using <a href="/management-api/explorer/root/">Management API Root Endpoints Explorer</a>.

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/api_explorer_record_fields.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/api_explorer_record_fields-600x436.png" alt="API Explorer -- Record and Related Record&#039;s Fields for a specific endpoint." width="600" height="436" title="Click to Expand" /></a>

<ul>
    <li>AdvertiserReportActuals' fields: <a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats/">/advertiser/stats fields</a></li>
    <li>AdvertiserReportCohortRetention' fields: <a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__retention/">/advertiser/stats/retention fields</a></li>
    <li>AdvertiserReportCohortValue' fields: <a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__ltv/">/advertiser/stats/ltv fields</a></li>
    <li>AdvertiserReportLogClicks' fields: <a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__clicks/">/advertiser/stats/clicks fields</a></li>
    <li>AdvertiserReportLogEventItems' fields: <a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__event__items/">/advertiser/stats/event/items fields</a></li>
    <li>AdvertiserReportLogEvents' fields: <a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__events/">/advertiser/stats/events fields</a></li>
    <li>AdvertiserReportLogInstalls' fields: <a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__installs/">/advertiser/stats/installs fields</a></li>
    <li>AdvertiserReportLogPostbacks' fields: <a href="http://developers.mobileapptracking.com/management-api/explorer/root/endpoint/#/advertiser__stats__postbacks/">/advertiser/stats/postbacks fields</a></li>
</ul>

<p>
<a href="#TOP">
<img alt="Return to Top" src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/b_top.gif" border="0">
</a>
</p>


<a id="sdk_parameters" name="sdk_parameters"></a>
### Advertiser Reporting Parameters

Most of the functions provided for the record classes have the following parameters in common. All of these parameters are based upon knowledge of available fields for that endpoint, which are discovered using endpoint's functions <code>define()</code> and <code>fields()</code>.

<p>&nbsp;</p>
<a id="sdk_parameter_fields" name="sdk_parameter_fields"></a>
##### Parameter <code>fields</code>

Parameter <strong>fields</strong> can either be an array of field names, or a string containing comma-delimited field named:

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/parameter-fields.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/parameter-fields.png" alt="Parameter fields" width="655" height="121" /></a>

<p>&nbsp;</p>
<a id="sdk_parameter_group" name="sdk_parameter_group"></a>
##### Parameter <code>group</code>

Parameter <strong>group</strong> is the same as parameter <code>fields</code> can either be an array of field names, or a string containing comma-delimited field named:

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/parameter-group.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/parameter-group.png" alt="Parameter group" width="655" height="121" /></a>

<p>&nbsp;</p>
<a id="sdk_parameter_sort" name="sdk_parameter_sort"></a>
##### Parameter <code>sort</code>

Parameter <strong>sort</strong> is a dictionary (associative array), where the key is the field name and value is the expected sort direction of either <code>"DESC"</code> or <code>"ASC"</code>.

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/parameter-sort.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/parameter-sort-700x107.png" alt="Parameter sort" width="700" height="107" /></a>

<p>&nbsp;</p>
<a id="sdk_parameter_filter" name="sdk_parameter_filter"></a>
##### Parameter <code>filter</code>

Parameter <strong>filter</strong> is a string that contains a set of query expressions based upon matching conditions to endpoint's fields. It is especially important to to provide an invalid field name because that will cause request to fail.

<a href="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/parameter-filter.png">
<img src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/parameter-filter-700x350.png" alt="Parameter filter" width="700" height="350" /></a>

<p>
<a href="#TOP">
<img alt="Return to Top" src="https://raw.githubusercontent.com/MobileAppTracking/tune-reporting-node/master/docs/images/b_top.gif" border="0">
</a>
</p>

<!-- Licenses -->

<a id="sdk_license" name="sdk_license"></a>
### License

[MIT License](http://opensource.org/licenses/MIT)

<a id="sdk_issues" name="sdk_issues"></a>
### Reporting Issues

Report issues using the [Github Issue Tracker](https://github.com/MobileAppTracking/tune-reporting-node/issues) or Email [sdk@tune.com](mailto:sdk@tune.com).
