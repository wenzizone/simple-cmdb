FROM alpine:latest
MAINTAINER wenzizone <wenzizone@126.com>

EXPOSE 8989

RUN apk add --update py-pip \
    && pip install django \
    && apk cache clean

COPY . /opt/cmdb/
RUN rm -rf /opt/cmdb/.git

WORKDIR /opt/cmdb

ENTRYPOINT ["/bin/sh","entrypoint.sh"]