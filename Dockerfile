FROM alpine:latest
MAINTAINER wenzizone <wenzizone@126.com>

EXPOSE 8989

RUN apk update \
    && apk add py-pip \
    && pip install django \
    && rm -rf /var/cache/apk/*

COPY . /opt/cmdb/
RUN rm -rf /opt/cmdb/.git

WORKDIR /opt/cmdb

ENTRYPOINT ["/bin/sh","entrypoint.sh"]