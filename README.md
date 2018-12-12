# MediaPress Frontend
[![CircleCI](https://circleci.com/gh/Xyloagency/mediapress-frontend.svg?style=shield&circle-token=b997ee5d1594ce70ef0b168d7fb1c57b9adb6ab2)](https://circleci.com/gh/Xyloagency/mediapress-frontend) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/1418dbeae5954ed78936d9401e4a7bb0)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Xyloagency/mediapress-frontend&amp;utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/1418dbeae5954ed78936d9401e4a7bb0)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=Xyloagency/mediapress-frontend&utm_campaign=Badge_Coverage)

This repo contains all the code required to build the HTML5/ES6 frontend for mediapress.

## Requirements

In order to build or run dev mode you will need the following packages installed.

- [NodeJS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Git](https://www.gitkraken.com/)
- [Docker](https://www.docker.com/) (Optional, but usefull for running the backend)

## How to build

Firstly clone the repo with git and move to the folder:
```bash
git clone git@github.com:Xyloagency/mediapress-frontend.git && cd mediapress-frontend
```

Then gather/build all the dependencies:
```bash
yarn
```

Then run the follow to startup the dev server:
```bash
yarn run dev
```

Or to build the compiled static assets to `dist/` run:
```bash
yarn run build
```

## Yarn Scripts

All scripts can be run with `yarn run [command]`

- **[build]** - Builds a production ready version to `dist/`
- **[dev]** - Runs a development version of the frontend on port `8080`
- **[lint]** - Runs a lint check on all code (add --fix for lint fixing)
- **[test]** - Runs the test suite
- **[cover]** - Runs the test coverage suite
- **[cover:publish]** - uploads coverage report to CodeCov (Only for CI use)
- **[publish]** - Docker publish command

## Packages Used

- [Mithril](https://mithril.js.org/) - Handles the rendering/redrawing and view logic
- [Popmotion](https://popmotion.io/learn/get-started/) - Used in the animations for tweening composition

## Project Layout

- \_\_tests\_\_/ - Test cases
- dist - Compiled files to be served from production servers
- src - Main Source folder
  - [config](./src/config) - All Configuration including active menus, future i18n, etc.
  - [model](./src/model) - Defines all common Model structures with related functions
  - [lib](./src/lib/) - Library of resuable code
  - [reducer](./src/reducer/) - All Redux Reducer logic
  - [sass](./src/sass/) - All scss/sass styles are within
  - [view](./src/view/) - All Base mithril components and view Logic
    - **objects** - All re-usable Components/Views should be kept here (Aligning to sass components)
    - **dashboard** - All Dashboard Related Views
    - **project** - All Project related Views
  
For more detailed information on styling, refer to the README under [src/sass]('src/sass')

## Testing the project

To test a specific module, simple use `yarn test [FileName]` without the extension or path to test a specific file
