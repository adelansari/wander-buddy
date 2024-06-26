# Symfony-MAMP

Symfony-MAMP is a set of docker images that include Starter-Kit for a MAMP stack ([Symfony6](https://symfony.com/), [macOS](https://www.apple.com/macos/monterey/), [Apache](https://www.apache.org/), [MySQL](https://www.mysql.com/), [PHP8](https://www.php.net/) and [phpMyAdmin](https://www.phpmyadmin.net/)) all in one handy package.

---

## Using the image

## Installation
- Inside `backend` directory:
    ```shell
    cp .env.example .env && cp web/.env.example web/.env
    docker-compose up --build
    ```
- If there are errors:
  Navigate to `web` directory and run:
  ```bash
  composer update
  composer install
  ```


- Symfony 6 will run on [http://localhost:8007](http://localhost:8007)
- phpMyAdmin will run on [http://localhost:9082](http://localhost:9082)