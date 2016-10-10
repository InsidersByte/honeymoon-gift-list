# our-wedding-heroes

[![Build Status](https://travis-ci.org/InsidersByte/our-wedding-heroes.svg)](https://travis-ci.org/InsidersByte/our-wedding-heroes)
[![Code Climate](https://codeclimate.com/github/InsidersByte/honeymoon-gift-list/badges/gpa.svg)](https://codeclimate.com/github/InsidersByte/honeymoon-gift-list)
[![bitHound Overall Score](https://www.bithound.io/github/InsidersByte/our-wedding-heroes/badges/score.svg)](https://www.bithound.io/github/InsidersByte/our-wedding-heroes)  
[![Dependency Status](https://david-dm.org/insidersbyte/our-wedding-heroes.svg)](https://david-dm.org/insidersbyte/our-wedding-heroes)
[![devDependency Status](https://david-dm.org/insidersbyte/our-wedding-heroes/dev-status.svg)](https://david-dm.org/insidersbyte/our-wedding-heroes#info=devDependencies)

A wedding website with a honeymoon gift list.

## Install

First, you'll need **Node.js v6** and **MongoDB v3**.

1.  **Clone the repo**

    ```bash
    $ git clone https://github.com/InsidersByte/our-wedding-heroes.git
    $ cd our-wedding-heroes
    ```
    
2. **Install dependencies**

    ```bash
    $ npm install
    ```
    
3. **Ensure MongoDB is running**

    ```bash
    $ lsof -iTCP:27017 -sTCP:LISTEN
    ```
    
4. **Start the server**

    ```bash
    $ npm start-dev
    ```
    
5.  **Run the setup**
    
    Navigate to [http://localhost:8080/admin](http://localhost:8080/admin)

## Docker Install

First, you'll need **Docker**.

1.  **Clone the repo**

    ```bash
    $ git clone https://github.com/InsidersByte/our-wedding-heroes.git
    $ cd our-wedding-heroes
    ```
    
2. **Build the images**

    ```bash
    $ docker-compose build
    ```
    
3. **Create the containers**

    ```bash
    $ docker-compose up -d
    ```
    
4. **Install your dependencies**

    ```bash
    $ docker-compose run web npm install
    ```
    
5. **Restart the website**

    ```bash
    $ docker-compose restart web
    ```
    
6.  **Run the setup**

    Navigate to [http://localhost:8080/admin](http://localhost:8080/admin)

## Deploying on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

