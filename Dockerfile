# TUNE Reporting SDK for Node
# Dockerfile for Jenkins CI
# Update:  $Date: 2015-04-17 16:00:00 $

FROM docker-dev.ops.tune.com/itops/base_centos6:latest

MAINTAINER jefft@tune.com

# EPEL (Extra Packages for Enterprise Linux) repository that
# is available for CentOS and related distributions.

RUN yum -y update && \
    yum -y install tar && \
    yum -y clean all

## Dependency Installation
RUN curl -sL https://rpm.nodesource.com/setup | bash - && \
  yum install -y which redhat-lsb-core wget nodejs gcc-c++ make kernel-devel
  
# Install Node.js and npm
RUN yum install -y npm && \
    npm --version && \
    node --version && \
    mkdir -p /data/tune-reporting-node && \
    mkdir -p /var/has/data/tune-reporting-node
  
COPY . /data/tune-reporting-node

CMD echo "image tunesdk/tune-reporting-node-setup"