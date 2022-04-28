# BBj PWA

BBj PWA is a node based cli to convert any DWC application to a [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps). 

## Installation

You will need the following things properly installed on your computer.

* [Node.js](http://nodejs.org/) (with NPM)
* [NPM](https://www.npmjs.com/get-npm)

```
npm install -g BasisHub/BBjPWA
```

## Usage

```
bbj-pwa /bbj/htdocs/output pwa-name -sw -s
```

## Interface 

```
Arguments:
  output                           The output directory where the files will be generated.
  program-name                     The program name as registered in the Enterprise Manager

Options:
  -V, --version                    output the version number
  -pn, --program-name <value>      The program name as registered in the Enterprise Manager
  -n, --name <value>               The name of the web application as it is usually displayed to the user
  -sn, --short-name <value>        The name of the web application displayed to the user if there is not enough space to display name
  -d, --description <value>        The description member is a string in which developers can explain what the application does.
  -c, --theme-color <value>        A string that defines the default theme color for the application. This sometimes affects how the OS displays    
                                   the site
  -bg, --background-color <value>  A placeholder background color for the application page to display before its stylesheet is loaded. This value   
                                   is used by the user agent to draw the background color of a shortcut when the manifest is available before the   
                                   stylesheet has loaded.
  -i, --icon <value>               An image file that can serve as application icon for different contexts.
  -s, --silent                     Run the generate command in silent mode but
  -sw, --service-worker            Generate a service worker for the application (default: false)
  -h, --help                       display help for command
```
