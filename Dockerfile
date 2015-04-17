# TUNE Reporting SDK for Node
# Dockerfile for Jenkins CI
# Update:  $Date: 2014-12-23 20:14:14 $

FROM docker-dev.ops.tune.com/itops/base_centos6:latest

MAINTAINER Jeff Tanner jefft@tune.com

# EPEL (Extra Packages for Enterprise Linux) repository that
# is available for CentOS and related distributions.

RUN yum -y update && \
    yum -y install tar && \
    yum -y clean all

RUN npm --version

RUN pwd

RUN ls -al

# Install node module dependencies
RUN npm install

# Perform mocha tests
RUN make api_key=demoadv test