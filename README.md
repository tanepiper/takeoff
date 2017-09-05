# Takeoff: Rapid Prototyping Environment

<img src="docs/assets/logo.png" width="200px" align="left" style="margin-right:20px" />

Takeoff is a rapid prototyping environment that uses docker to minimise the hassle out of setting up frontend, backend and database servers.

Within seconds you'll have a hot-reloading frontend and backend which allows you to make changes without the need to usually restart the server.

## How to run

Clone or fork this this repository:

    git clone https://github.com/tanepiper/takeoff.git

Then run `npm install` in the root, this creates the basic bootstrap needed to run things. Next:

    > npm run build:dev
    > npm run up:dev

> *in the future there will be support for custom names here*

You should now have a server running at [http://localhost](http://localhost). You can access the API via [http://localhost/api](http://localhost/api).

The default user is `admin` and password is `password`.  Do not expect this to be a fully secure environment.

> *Disclaimer: If you build an app with this you wish you deploy, you are responsible for your own security.*

## Architecture

You will find 5 folders and some files:

    -|
     |- api
     |- app
     |- config
     |- docker
     |- scripts
     |- README.md
     |- package.json

There are some convenience NPM scripts that get the environment going:

> `npm run build:dev`
> : this command runs the docker compose file which creates the initial environment

> `npm run up:dev`
> : this command runs the development enviromnent on localhost

Inside the docker folder and several docker files which create the environments.

The default environments are listed below with the main environments from their docker files.  Full components will be listed soon.

|name   |packages  |version|description|
|----   |-------   |-------|-----------|
|api    |node      |8.4.0  |Hapi-powered API that comes pre-build with a user and authentication plugin, uses nodemon for changes.|
|app    |node      |8.4.0  |Webpack/React app that is hot-reloaded on changes|
|db     |postgres  |9.5    |Postgres database|
|server |ngnix     |1.13.3 |Ngnix Proxy|

Run via docker compose, you can begin to add plugins to the Hapi server. You have JWT auth out of the box for endpoints with `admin` and `user` scopes available.

## What you get

Out of the box you get an nodemon-hot-reloading, Hapi-powered API that is already set up to accept plugins.  On the frontend you get a single page hot-reloading React app.  Connecting the two of them is a basic authentication that gives a [JSON Web Token (JWT)](https://jwt.io).

The app has basic login page and when authenticated you get access to the user screen where you can view users, you can also log out.

The basic app shows how you can build your own features.  You get a Postgres database out of the box using Sequelize.  This can easily be replaced with any database or adapter (and I plan to ship more options).

## Documentation

* [API](api/README.md)

### React App

The React App uses React Hot Reloder, React Router v4 and Redux along with a custom API middleware to easily create your components and stores.

The main app is bootstrapped in `index.js` and then handles the `<Router>` and `<Provider>` wrappers to the app for Router and Redux.

## References

* This document environment was based on the tutorial [Dockerize your app and keep hot-reloading !](https://blog.bam.tech/developper-news/dockerize-your-app-and-keep-hot-reloading) but adding more utilities and making it easier to work as a starter kit.
* [Blog post announcing Takeoff](https://medium.com/@tanepiper/takeoff-a-rapid-development-environment-designed-for-hack-days-9a45ae891366)
* Logo made with [LogoMakr](http://logomakr.com)

## Future Ideas

* Provide other hot loading frontend frameworks (Angular, Vue)
* Improve dashboard of main app
* Improve documentation
* Provide more built in plugins and apps
