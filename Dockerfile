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

# using nvm because Node 0.12 is not currently easily installable
RUN git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
RUN source ~/.nvm/nvm.sh && nvm install 0.12 && nvm use 0.12 && ln -s ~/.nvm/versions/node/v0.12.0/bin/node /usr/bin/node

# Install Node.js
RUN yum install nodejs \
    node --version

# Install Node package manager
RUN yum install npm \
    npm --version

# Install node module dependencies
RUN npm install

# Perform mocha tests
RUN make api_key=demoadv test