FROM node:8.16-alpine

WORKDIR /opt/node-site-downloder

# Install only dependencies without dev dependencies
ENV NODE_ENV="production"

# Only if package.json has changed we want to install the packages again
COPY ./package.json ./package.json
RUN npm i 

COPY ./index.js ./index.js
COPY ./libs ./libs

ENTRYPOINT [ "./index.js" , "--outputFolder", "/data/content"] 