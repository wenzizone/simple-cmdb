FROM alpine:latest
MAINTAINER wenzizone <wenzizone@126.com>

EXPOSE 8989

RUN apk update \
    && apk add py-pip nodejs git \
    && pip install django \
    && npm install -g bower \
    && rm -rf /var/cache/apk/*

COPY . /opt/cmdb/
RUN rm -rf /opt/cmdb/.git

RUN cd /opt/cmdb/static \
    && rm -rf bower_components.bak \
    && bower install --allow-root

WORKDIR /opt/cmdb

ENTRYPOINT ["/bin/sh","entrypoint.sh"]