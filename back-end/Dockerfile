FROM php:8.2-fpm

# Instalar dependências do Laravel
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Configurar permissões
RUN chown -R www-data:www-data /var/www/html

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000
