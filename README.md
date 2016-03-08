# UI-DonderStarter
Boilerplate for general UI package development using gulp, sass and bower

## Features
- Gulp;
- Bower to manage dependencies;
- CSS pre-compile through SASS;
- JShint;
- SASS and JS minification and concatenation;
- Handlebars for template concatenation;
- Localhost server deploy;
- Synchronized browser testing;
- Atomic design pattern;

## Requirements
- [nodejs](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Install
Install the dependencies with `npm install` or `sudo npm install`. Then just run `npm run gulp`.

## Modular approach
This UI boilerplate is based on atomic design methodology. The components are divided into **Atoms**, **Molecules**, **Organisms** & **Pages**, thus, using a modular development approach. More information on each component is found on their respective folders. There is also a **global** folder containing header & footer placeholders for your head & footer code, that will automatically be included on each page. More information on this design patter can be found [here](http://patternlab.io/about.html).

## Development workflow overview
- **Atoms** will include the smaller components;
- **Molecules** are components that will include atom components;
- **Organisms** are bigger components that will include molecules & atoms;
- **Pages** are page templates that are built through the usage of all components put together. Will include the code from head.html & foot.html automatically
- **head.html** is the placeholder for all head scripts, links and any code that should be placed on top of an HTML template;
- **foot.html** is the placeholder for all the scripts that should be placed on the bottom of an HTML template;

## Adding packages
The donderstarters are setup so you can easily add external packages to your project, while making it easier to manage dependencies. Doing
`bower install <package-name>` will add the package to the src/vendor folder. You can browse for available bower packages through [bower search page](http://bower.io/search/), and general documentation on bower in [bower.io](http://bower.io/).

After adding the package, you need to include it into the build process (gulpfile.js:44) and into your foot.html file, making it available in every template page you make.

## Gulp tasks
- **npm run gulp** will build the files inside the /dist folder and perform a watch. You are ready to start developing
- **npm run clean** will clean the dist folder
- **npm run build** will build the files inside the /dist folder without triggering a watch
- **npm run update** will update dependencies and run build

## NOTE:
If tasks are not working try deleting the node_modules folder and run `npm install` again.

### Run in browser

Run the command:

`npm run static`

Open your browser at `http://127.0.0.1:8080/`

## Notice
The final release state is not deployed yet. It will include image processing, minification & other validations.

## Kudos
Special thanks to [marocas](https://github.com/marocas) for the design patern base.