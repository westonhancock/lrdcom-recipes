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

We are using Gulp (http://gulpjs.com/) (See gulpfile.js) for the build. We use Gulp to concatenate and minify the CSS/JS as well as to turn our application views into JS. Because load order is important in JS, the load order specified in the Gulpfile is important.

If you want to make changes, all the source files are in `/src` and the compiled files are on the root (don't edit these) `/js`, `/css`.

##### Compiling Files
To listen for and to compile files, go to the root and just run
```
gulp
```

### Loading onto Liferay
1. **Move CSS/JS:** After Gulp compiles, the `/js` and `/css` folder will have the compiled and production-ready code. Copy and paste that over to the respective web content holding the web content holding the application view.
2. **Move View:** Copy and paste over the contents of `index.html` (our application view) into the same web content.

### If you change the view...
If you want to change the HTML for any of the steps, just know it's pretty gnarly because we're not leveraging a templating engine (handlebars.js please?). Here's how to do it:

1. **Compile the view:**
In each of the steps, `view.html` has the html that you can edit. When you make a change, it will compile into `view.js`. You copy and paste the line with the stringified js into its respective controller (e.g. if you're compiling view in step1, go to step1/controller.js).

2. **Open up the respective controller.js:**

Note that the steps instatiation is at the top:
```
    steps.initStep(
        {
            html: <INSERT VIEW FROM VIEW.JS HERE>
        }
    );
```

**2. Insert the view:**
Insert the compiled view into the html property. That way, the application can render the HTML into the appropriate section.
