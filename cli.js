const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path')
const { program } = require('commander');
const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt')
const chalk = require('chalk');
const pwaAssetGenerator = require("pwa-asset-generator");
const workboxBuild = require("workbox-build");

const placeholder = (text) => chalk.italic.gray(text) + "\n:";
const success = (text) => console.log(chalk.green(text));
const getDefaultName = programName => programName.replace(/\s/g, '');
const getDefaultDescription = programName => programName.replace(/\s/g, '') + " PWA";

const translation = {
  output: 'The output directory whee the files will be generated.',
  programName: 'The program name as registered in the Enterprise Manager',
  name: 'The name of the web application as it is usually displayed to the user',
  shortName: 'The name of the web application displayed to the user if there is not enough space to display name',
  description: 'The description member is a string in which developers can explain what the application does.',
  themeColor: 'A string that defines the default theme color for the application. This sometimes affects how the OS displays the site',
  backgroundColor: 'A placeholder background color for the application page to display before its stylesheet is loaded. This value is used by the user agent to draw the background color of a shortcut when the manifest is available before the stylesheet has loaded.',
  icon: 'An image file that can serve as application icon for different contexts.',
  silent: 'Run the generate command in silent mode but',
  serviceWorker: 'Generate a service worker for the application',
  manifestExists: 'The manifest.json file already exists in the output directory , do you want to merge the new updates ?',
  indexExists: 'The index.html file already exists in the output directory , do you want to overwrite it ?',
  offlineExists: 'The offline.html file already exists in the output directory , do you want to overwrite it ?',
  serviceWorkerExists: 'The sw.js file already exists in the output directory , do you want to overwrite it ?',
}

const defaultAnswers = {
  programName: '',
  name: '',
  shortName: '',
  description: '',
  themeColor: '#0063cc',
  backgroundColor: '#ffffff',
  icon: path.resolve(`${__dirname}/assets/logo.png`),
};

const defaultQuestions = {
  name: {
    type: 'input',
    name: 'name',
    message: 'What is the name of your application\n',
    suffix: placeholder(translation.name),
    default(answers) {
      const { programName } = answers;
      return getDefaultName(programName || defaultAnswers.programName);
    },
  },
  shortName: {
    type: 'input',
    name: 'shortName',
    message: 'What is the short name of your application\n',
    suffix: placeholder(translation.shortName),
    default(answers) {
      const { programName } = answers;
      return getDefaultName(programName || defaultAnswers.programName);
    },
  },
  description: {
    type: 'input',
    name: 'description',
    message: 'What is the description of your application\n',
    suffix: placeholder(translation.description),
    default(answers) {
      const { programName } = answers;
      return getDefaultDescription(programName || defaultAnswers.programName);
    },
  },
  themeColor: {
    type: 'input',
    name: 'themeColor',
    message: 'What is the primary color of your application\n',
    suffix: placeholder(translation.themeColor),
    default() {
      return defaultAnswers.themeColor
    }
  },
  backgroundColor: {
    type: 'input',
    name: 'backgroundColor',
    message: "What is the color of your application's background\n",
    suffix: placeholder(translation.backgroundColor),
    default() {
      return defaultAnswers.backgroundColor
    }
  },
  icon: {
    type: 'file-tree-selection',
    name: 'icon',
    message: 'Choose your application icon\n',
    suffix: placeholder(translation.icon),
    enableGoUpperDirectory: true,
    onlyShowValid: true,
    root: __dirname,
    validate: (input) => {
      return ['.png', '.jpg', '.jpeg'].indexOf(path.extname(input).toLocaleLowerCase()) !== -1;
    },
    default() {
      return defaultAnswers.icon
    }
  },
};

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)
program
  .version('0.0.1')
  .argument('<output>', translation.output)
  .argument('<program-name>', translation.programName)
  .option('-pn, --program-name <value>', translation.programName)
  .option('-n, --name <value>', translation.name)
  .option('-sn, --short-name <value>', translation.shortName)
  .option('-d, --description <value>', translation.description)
  .option('-c, --theme-color <value>', translation.themeColor)
  .option('-bg, --background-color <value>', translation.backgroundColor)
  .option('-i, --icon <value>', translation.icon)
  .option('-s, --silent', translation.silent)
  .option('-sw, --service-worker', translation.serviceWorker, false)
  .action(async (output, programName, options) => {

    defaultAnswers.programName = programName;
    let answers = { ...defaultAnswers };

    if (options.silent) {
      if (!options.hasOwnProperty('name')) {
        defaultAnswers.name = options.name = getDefaultName(programName)
      }

      if (!options.hasOwnProperty('shortName')) {
        defaultAnswers.shortName = options.shortName = getDefaultName(programName)
      }

      if (!options.hasOwnProperty('description')) {
        defaultAnswers.description = options.description = getDefaultDescription(programName)
      }

      answers = { ...defaultAnswers };
    } else {
      const questions = _.omit(defaultQuestions, Object.keys(options));
      answers = { ...answers, ...await inquirer.prompt(Object.values(questions)) }
    }

    // generate manifest
    const manifestInputPath = path.resolve(`${__dirname}/assets/manifest.json.tpl`);
    const manifestOutputPath = path.resolve(`${output}/manifest.json`);
    let createManifest = true;
    let manifest = fs.readJsonSync(manifestOutputPath);

    if (fs.pathExistsSync(manifestOutputPath) && !options.silent) {
      const answers = await inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: translation.manifestExists,
        default: false
      }]);

      createManifest = answers.choice;
    }

    if (createManifest) {
      const manifestCompiled = _.template(fs.readFileSync(manifestInputPath, 'utf8'));
      fs.outputJsonSync(manifestOutputPath, {
        ...manifest,
        ...JSON.parse(manifestCompiled(answers))
      },{
        spaces: ' '
      });
      success('generate manifest');
    }

    // generate index.html
    const indexInputPath = path.resolve(`${__dirname}/assets/index.html.tpl`);
    const indexOutputPath = path.resolve(`${output}/index.html`);
    let createIndex = true;

    if (fs.pathExistsSync(indexOutputPath) && !options.silent) {
      const answers = await inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: translation.manifestExists,
        default: false
      }]);

      createIndex = answers.choice;
    }

    if (createIndex) {
      const indexCompiled = _.template(fs.readFileSync(indexInputPath, 'utf8'));
      fs.outputFileSync(indexOutputPath, indexCompiled({
        ...answers,
        ... { serviceWorker: options.serviceWorker }
      }));
      success('generate index page');
    }

    // generate index.html
    const offlineInputPath = path.resolve(`${__dirname}/assets/offline.html.tpl`);
    const offlineOutputPath = path.resolve(`${output}/offline.html`);
    let createOffline = true;

    if (fs.pathExistsSync(offlineOutputPath) && !options.silent) {
      const answers = await inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: translation.offlineExists,
        default: false
      }]);

      createOffline = answers.choice;
    }

    if (createOffline) {
      const offlineCompiled = _.template(fs.readFileSync(offlineInputPath, 'utf8'));
      fs.outputFileSync(offlineOutputPath, offlineCompiled(answers));
      success('generate offline page');
    }

    // generate service worker
    if (options.serviceWorker) {
      const swSrcInputPath = path.resolve(`${__dirname}/assets/sw-src.js.tpl`);
      let createSW = true;

      if (fs.pathExistsSync(path.resolve(`${output}/sw.js`)) && !options.silent) {
        const answers = await inquirer.prompt([{
          type: 'confirm',
          name: 'choice',
          message: translation.serviceWorkerExists,
          default: false
        }]);

        createSW = answers.choice;
      }

      if (createSW) {
        const swSrcOutputPath = path.resolve(`${output}/sw-src.js`);
        const swSrcCompiled = _.template(fs.readFileSync(swSrcInputPath, 'utf8'));
        fs.outputFileSync(swSrcOutputPath, swSrcCompiled(answers));

        await workboxBuild.injectManifest({
          globDirectory: output,
          globPatterns: [
            '**/*.{ico,png,jpg,jpeg,gif,html,json,js}'
          ],
          swSrc: `${output}/sw-src.js`,
          swDest: `${output}/sw.js`
        });

        fs.removeSync(swSrcOutputPath);
        success('generate service worker');
      }
    }

    // generate icons
    const iconsOutputPath = path.resolve(`${output}/images/manifest`);
    await pwaAssetGenerator.generateImages(answers.icon, iconsOutputPath, {
      scrape: false,
      splashOnly: false,
      portraitOnly: false,
      favicon: true,
      mstile: true,
      log: true,
      manifest: manifestOutputPath,
      index: indexOutputPath,
      log: false
    });
    success('generate icons');

    success('done.');
  })
  .parse(process.argv);