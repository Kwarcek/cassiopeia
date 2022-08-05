FROM php:8.1.0-cli
WORKDIR "/app"

RUN curl -sL https://raw.githubusercontent.com/nodesource/distributions/master/deb/setup_17.x | bash

RUN apt-get update && apt-get install vim -y && \
    apt-get install openssl -y && \
    apt-get install libcurl4-openssl-dev -y && \
    apt-get install libssl-dev -y && \
    apt-get install wget -y && \
    apt-get install git -y && \
    apt-get install nodejs -y && \
    apt-get install procps -y && \
    apt-get install supervisor -y && \
    apt-get install htop -y

RUN docker-php-ext-install pcntl
RUN docker-php-ext-enable pcntl

RUN curl https://www.npmjs.com/install.sh | bash -

RUN cd /tmp && git clone https://github.com/openswoole/swoole-src.git && \
    cd swoole-src && \
    git checkout v4.11.0 && \
    phpize  && \
    ./configure --enable-openssl --enable-swoole-curl --enable-http2 --enable-mysqlnd && \
    make && make install

RUN touch /usr/local/etc/php/conf.d/openswoole.ini && \
    echo 'extension=openswoole.so' > /usr/local/etc/php/conf.d/zzz_openswoole.ini

RUN apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

COPY ./docker/supervisor.conf /etc/supervisor/conf.d/server.conf
COPY . .

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

#RUN npm install

CMD ["/usr/bin/supervisord","-c","/etc/supervisor/supervisord.conf"]
