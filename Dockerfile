
FROM golang:1.20.4

RUN apt-get update && apt-get install -y \
    git \
    wget \
    unzip \
    curl

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 16.12.0

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# confirm installation
RUN node -v
RUN npm -v

# Set the working directory
WORKDIR /app

# Create dists
COPY frontend/. ./
RUN npm i
RUN npm run build

# Install GO hx711 service
COPY backend/*.go ./
COPY backend/github/*.go ./github/
COPY backend/handlers/*.go ./handlers/
COPY backend/models/*.go ./models/
COPY backend/go.mod backend/go.sum ./
RUN go mod download
RUN go build -o main ./

# Install lgpio C++ dependency
RUN wget http://abyz.me.uk/lg/lg.zip && \
    unzip lg.zip && \
    rm lg.zip && \
    cd lg && \
    make && \
    make install && \
    cd ..

# Install hx711 C++ dependency
RUN git clone https://github.com/myarcane/hx711 && \
    cd hx711 && \
    make && \
    make install

ENV LD_LIBRARY_PATH="/usr/local/lib"

# Install the small C++ scale program
COPY backend/main.cpp ./
RUN g++ -Wall -o prog main.cpp -lhx711 -llgpio

# Expose port 8000
EXPOSE 8000

CMD ["/app/main"]