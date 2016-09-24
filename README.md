# our-wedding-heroes

[![Build Status](https://travis-ci.org/InsidersByte/our-wedding-heroes.svg)](https://travis-ci.org/InsidersByte/our-wedding-heroes)
[![Code Climate](https://codeclimate.com/github/InsidersByte/honeymoon-gift-list/badges/gpa.svg)](https://codeclimate.com/github/InsidersByte/honeymoon-gift-list)
[![bitHound Overall Score](https://www.bithound.io/github/InsidersByte/our-wedding-heroes/badges/score.svg)](https://www.bithound.io/github/InsidersByte/our-wedding-heroes)  
[![Dependency Status](https://david-dm.org/insidersbyte/our-wedding-heroes.svg)](https://david-dm.org/insidersbyte/our-wedding-heroes)
[![devDependency Status](https://david-dm.org/insidersbyte/our-wedding-heroes/dev-status.svg)](https://david-dm.org/insidersbyte/our-wedding-heroes#info=devDependencies)

A wedding website with a honeymoon gift list.

## Requirements

* [NodeJS v6](https://nodejs.org/en/)
* [MongoDB v3](https://www.mongodb.org/downloads)

## Install

1.  **Clone the repo**

    ```bash
    $ git clone https://github.com/InsidersByte/our-wedding-heroes.git
    $ cd our-wedding-heroes
    ```
    
2. **Install dependencies**

    ```bash
    $ npm install
    ```
    
3. **Make sure MongoDB is running**

    ```bash
    $ lsof -iTCP:27017 -sTCP:LISTEN
    ```
    
4. **Start the server**

    ```bash
    $ npm start
    ```
    
    > run `npm run start:dev` to use nodemon
    
5.  **Run the setup**
    
    visit [http://localhost:8080/admin/setup](http://localhost:8080/admin/setup)
