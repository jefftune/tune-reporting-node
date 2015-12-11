#   Makefile
#
#   Copyright (c) 2015 TUNE, Inc.
#   All rights reserved.
#
#   Permission is hereby granted, free of charge, to any person obtaining a copy
#   of this software and associated documentation files (the "Software"), to deal
#   in the Software without restriction, including without limitation the rights
#   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#   copies of the Software, and to permit persons to whom the Software is
#   furnished to do so, subject to the following conditions:
#
#   The above copyright notice and this permission notice shall be included in
#   all copies or substantial portions of the Software.
#
#   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#   FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
#   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
#   THE SOFTWARE.
#
# category  TUNE_Reporting
# author    Jeff Tanner <jefft@tune.com>
# copyright 2014 TUNE, Inc. (http://www.tune.com)
# license   http://opensource.org/licenses/MIT The MIT License (MIT)
# version   $Date: 2015-12-11 22:34:11 $
# link      http://developers.mobileapptracking.com/tune-api-sdks/
#

export API_KEY=$(api_key)

clean:
	sudo rm -fR ./docs/jsdoc/*
	sudo rm -fR ./docs/yuidoc/*

examples:
	node ./examples/ExampleTuneServiceClient --env=test --tune_reporting_auth_key=$(api_key) --tune_reporting_auth_type=api_key
	node ./examples/ExampleAdvertiserReportLogClicks --env=test --tune_reporting_auth_key=$(api_key) --tune_reporting_auth_type=api_key
	node ./examples/ExampleAdvertiserReportLogEventItems --env=test --tune_reporting_auth_key=$(api_key) --tune_reporting_auth_type=api_key
	node ./examples/ExampleAdvertiserReportLogEvents --env=test --tune_reporting_auth_key=$(api_key) --tune_reporting_auth_type=api_key
	node ./examples/ExampleAdvertiserReportLogInstalls --env=test --tune_reporting_auth_key=$(api_key) --tune_reporting_auth_type=api_key
	node ./examples/ExampleAdvertiserReportLogPostbacks --env=test --tune_reporting_auth_key=$(api_key) --tune_reporting_auth_type=api_key
	node ./examples/ExampleAdvertiserReportActuals --env=test --tune_reporting_auth_key=$(api_key) --tune_reporting_auth_type=api_key
	node ./examples/ExampleAdvertiserReportCohortRetention --env=test --tune_reporting_auth_key=$(api_key) --tune_reporting_auth_type=api_key
	node ./examples/ExampleAdvertiserReportCohortValues --env=test --tune_reporting_auth_key=$(api_key) --tune_reporting_auth_type=api_key

test-install:
	npm install chai --save
	npm install convict --save
	npm install mocha --save
	npm install should --save
	npm install sinon --save

test:
	env NODE_ENV=test TUNE_REPORTING_API_KEY=$(api_key) ./node_modules/.bin/mocha

test-w:
	env NODE_ENV=test TUNE_REPORTING_API_KEY=$(api_key) ./node_modules/.bin/mocha \
		--growl \
		--watch

test-cov: lib-cov
	@INSTINCT_COV=1 $(MAKE) test REPORTER=html-cov > public/coverage.html

lib-cov:
	@jscoverage lib lib-cov

lint:
	nodelint --config config/nodelint.js ./lib/ ./examples/ | more

npm-install:
	npm install

npm-publish:
	npm publish

nvm-install:
	curl https://raw.githubusercontent.com/creationix/nvm/v0.10.0/install.sh | sh
	nvm ls-remote
	nvm install 0.10.33
	node -v
	npm -v

docs-jsdoc:
	node -v
	npm -v
	npm install ink-docstrap
	sudo rm -fR ./docs/jsdoc/*
	jsdoc -c config/jsdoc.json
	x-www-browser docs/jsdoc/index.html

docs-yuidoc:
	node -v
	npm -v
	sudo rm -fR ./docs/yuidoc/*
	yuidoc ./lib/ -c config/yuidoc.json
	x-www-browser docs/yuidoc/index.html

.PHONY: lint npm-install nvm-install docs-yuidoc test test-w examples