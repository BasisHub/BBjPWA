# BBj PWA

<p>
  <a href="https://github.com/BasisHub/BBjPWA/blob/master/README.md">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="BBjPullToRefresh is released under the MIT license." />
  </a>
  <a href="https://github.com/necolas/issue-guidelines/blob/master/CONTRIBUTING.md#pull-requests">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
</p>

BBjPWA is a node based cli to convert any DWC application to a [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps). The tool can generate for you the following resources:

- **Index page**: Your DWC app will be loaded through this page as an embed dwc app.
- **web app manifest**: The `manifest.json` is necessary for the web app to be downloaded and be presented to the user similarly to a native app. The file provides information about a web application in a JSON text file
- **Icons**: You can provide your app  icon and the tool will generate all required sizes to make the icons suitable for all platforms.
- **Service worker**: The service worker will cache your app resources on the fly, that includes images , styles , ...
- **Offline page**: The tool can also generate a offline page to be used when user goes offline.


https://user-images.githubusercontent.com/4313420/177752115-a431d3bd-83a4-49cc-bf01-6e61a7f40712.mp4


## Why PWA? 

PWA, commonly known as a progressive web app, is a type of web applications which works both as a web app and mobile app on 
any device. The aim of PWA is to deliver native liker user experience.

- They are responsive which means they adapt to the various screen sizes desktop , mobile , .. 
- They behave like if they were naive apps in terms of interactions. 
- They are exposed over the HTTPS protocol so they are secure. 
- They are installable. The user can save the app with the corresponding icon on the home screen. 
- They are shareable. The user can share the app via URL without installation.
- They can published on different stores (Apple Store , Google Play and Microsoft store).

## Installation

You will need the following things properly installed on your computer.

* [Node.js](http://nodejs.org/) (with NPM)
* [NPM](https://www.npmjs.com/get-npm)

```
npm install -g BasisHub/BBjPWA
```

## Interface 

```
Usage: bbj-pwa [options] <output> <program-name>

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

## EM Configurations

If you are generating the service worker then in the enterprise manager you need to add the following custom header 
in the `root` context.

* Log in to the EM
* Navigate to `Web -> Context Configuration`
* Select the `root` context
* Add new HTTP header in the `Custom HTTP headers` section. 

      Name: service-worker-allowed
      Value: /

## More Resources:

- [What are Progressive Web Apps?](https://web.dev/what-are-pwas/)
- [Introduction to progressive web apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Introduction)
- [PWA Builder](https://www.pwabuilder.com/)

## Contributing

Everyone is welcome to help contribute and improve this project. There are several
ways you can contribute:

* Reporting issues (please read [issue guidelines](https://github.com/necolas/issue-guidelines))
* Suggesting new features
* Writing or refactoring code
* Fixing [issues](https://github.com/BasisHub/BBjPWA/issues)
