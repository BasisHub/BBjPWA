# BBj PWA

BBj PWA is a node based cli to convert any DWC application to a [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps). 

## Installation

You will need the following things properly installed on your computer.

* [Node.js](http://nodejs.org/) (with NPM)
* [NPM](https://www.npmjs.com/get-npm)

```
npm install -g BasisHub/BBjPWA
```

## Interface 

```
Usage: cli [options] <output> <program-name>

Arguments:
  output                           The output directory where the files will be generated
  program-name                     The program name as registered in the Enterprise Manager

Options:
  -V, --version                    output the version number
  -n, --name <value>               The name of the web application as it is usually displayed to the user
  -sn, --short-name <value>        The name of the web application displayed to the user if there is not enough space to display name
  -d, --description <value>        The description member is a string in which developers can explain what the application does
  -c, --theme-color <value>        A string that defines the default theme color for the application. This sometimes affects how the OS displays the site
  -bg, --background-color <value>  A placeholder background color for the application page to display before its stylesheet is loaded. This value is used by the user agent to draw the background
                                   color of a shortcut when the manifest is available before the stylesheet has loaded
  -i, --icon <value>               An image file that can serve as application icon for different contexts
  --icon-landscape-only [value]    Only generate landscape splash screens (default: false)
  --icon-portrait-only [value]     Only generate portrait splash screens (default: false)
  --icon-quality <value>           Image quality: 0...100 (Only for JPG) (default: 70)
  --icon-favicon [value]           Generate favicon image and HTML meta tag (default: true)
  --icon-maskable [value]          Declare icons in manifest file as maskable icons (default: true)
  --icon-background <value>        Page background to use when image source is provided (css value) (default: "transparent")
  --icon-opaque [value]            Shows white as canvas background and generates images without transparency (default: true)
  --icon-padding <value>           Padding to use when image source provided (css value) (default: "10%")
  -s, --silent                     Run the generate command in silent mode
  -sw, --service-worker            Generate a service worker for the application (default: false)
  -h, --help                       display help for command
```

## Enterprise Manager Configuration

If you are generating a service worker then in the enterprise manager you need to add the following custom header 
for the `root` context.

![2022-04-29 16_41_32-localhost_8888_bbjem_emapp](https://user-images.githubusercontent.com/4313420/165967424-f7c73701-57b0-4ded-8e86-0d1dd04127d9.png)
