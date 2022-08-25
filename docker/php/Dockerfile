FROM php:8.1.0-cli
WORKDIR "/app"

RUN curl -sL https://raw.githubusercontent.com/nodesource/distributions/master/deb/setup_18.x | bash

RUN apt-get update && apt-get install vim -y && \
    apt-get install openssl -y && \
    apt-get install libcurl4-openssl-dev -y && \
    apt-get install libssl-dev -y && \
    apt-get install wget -y && \
    apt-get install git -y && \
    apt-get install nodejs -y && \
    apt-get install zip -y && \
    apt-get install procps -y && \
    apt-get install supervisor -y && \
    apt-get install htop -y

RUN pecl install redis
RUN docker-php-ext-install pcntl mysqli pdo pdo_mysql

RUN docker-php-ext-enable pcntl
RUN docker-php-ext-enable redis

RUN curl -fsSL https://get.pnpm.io/install.sh | bash
RUN npm install -g pnpm

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

#RUN pnpm install

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
RUN composer install

CMD ["/usr/bin/supervisord","-c","/etc/supervisor/supervisord.conf"]
