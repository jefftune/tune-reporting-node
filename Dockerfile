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

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm

RUN npm --version

RUN pwd
RUN ls -al

RUN echo $WORKSPACE

# Install node module dependencies
RUN npm install

# Perform mocha tests
RUN make api_key=demoadv test