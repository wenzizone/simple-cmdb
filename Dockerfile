FROM alpine:latest
MAINTAINER wenzizone <wenzizone@126.com>

EXPOSE 8989

# install require package
RUN apk update \
    && apk add py-pip nodejs git \
    && pip install django \
    && npm install -g bower \
    && rm -rf /var/cache/apk/*

COPY . /opt/cmdb/
RUN rm -rf /opt/cmdb/.git

RUN cd /opt/cmdb/static \
    && bower install --allow-root -f

# clean up unuse package
RUN npm uninstall -g bower \
    && apk update \
    && apk del nodejs git py-pip \
    && rm -rf /var/cache/apk/*

WORKDIR /opt/cmdb

ENTRYPOINT ["/bin/sh","entrypoint.sh"]