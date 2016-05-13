# CSV to Hubspot Tool
This tool is a JS SPA app meant for Liferay.com to upload data to Hubspot forms from a csv file.

### Application Structure
The application is built with modules connected to an application shell. Each module has its own MVC pattern.

![alt tag](https://raw.githubusercontent.com/ryanschuhler/lrdcom-recipes/f5bb3987e2d00d4ee9729f039a55b7452da3ba31/6.2.x/csv-to-hubspot/assets/CSV-Hubspot-Architecture.png)

##### The Application Shell
The shell (core.js) will pull in some application-level assets e.g. `data.js`, `config.js`, and `ui.js`.

##### Our Modules
Moving to the right will have files increasing in dependency.

`utils/` has some utility modules that are used across the different modules
`steps/` has the logic/views for the different steps in the application. 

### Build (When you need to make changes)
*Gulp is set to listen for all file changes, so any saves you make on any file will automatically be compiled, making development easier*

We are using Gulp (http://gulpjs.com/) (See gulpfile.js) for the build. We use Gulp to concatenate and minify the CSS/JS as well as to turn our application views into JS. 

If you want to make changes, all the source files are in `/src` and the compiled files are on the root (don't edit these) `/js`, `/css`.

##### Compiling Files
To listen for and to compile files, go to the root and just run
```
gulp
```

### Loading onto Liferay
1. Move contents of index.vm in root folder to the Interaction Tool template.