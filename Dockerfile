FROM node:7.5

ENV WORKSPACE /workspace

RUN apt-get update

RUN mkdir $WORKSPACE
WORKDIR $WORKSPACE

RUN npm init -y
RUN npm install gulp -g
RUN npm install gulp gulp-aglio rimraf gulp-ejs gulp-rename browser-sync

COPY entrypoint.sh entrypoint.sh
COPY gulpfile.js gulpfile.js
COPY aglioconfig.json aglioconfig.json

RUN mkdir -p apidocs published 

# sample document
COPY sample/sample.md apidocs/
COPY sample/layout.md apidocs/

RUN chmod +x ./entrypoint.sh

CMD ["/bin/sh", "./entrypoint.sh"]

