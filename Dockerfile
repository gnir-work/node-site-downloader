FROM node:8.16-alpine

WORKDIR /opt/node-site-downloder

# Install only dependencies without dev dependencies
ENV NODE_ENV="production"

COPY ./package.json ./package.json
COPY ./index.js ./index.js
COPY ./libs ./libs

RUN npm i 

ENTRYPOINT [ "./index.js" , "--outputFolder", "/data/content"] 