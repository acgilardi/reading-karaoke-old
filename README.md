# Big Start Angular2 Seed

[![Dependency Status](https://david-dm.org/appmite/big-start-angular2-seed.svg)](https://david-dm.org/appmite/big-start-angular2-seed)
[![devDependency Status](https://david-dm.org/appmite/big-start-angular2-seed/dev-status.svg)](https://david-dm.org/appmite/big-start-angular2-seed#info=devDependencies)
[![Build Status](https://travis-ci.org/appmite/big-start-angular2-seed.png)](https://travis-ci.org/appmite/big-start-angular2-seed)

An Angular 2.0 web application seed project. Inspired by [Minko Gechev's Seed Project](https://github.com/mgechev/angular2-seed)

# How to start
See [My appMite Blog](http://appmite.com/big-start-with-angular2/) for more details about this project.
**Note** This project requires node v4.x.x or higher and npm 2.14.7.

```bash
git clone https://github.com/appmite/big-start-angular2-seed.git
cd big-start-angular2-seed
npm install       # or `npm run reinstall` if you get an error
npm start         # start with --env dev
npm run docs      # api document for app
```

# Directory Structure

```
.
├── LICENSE
├── README.md
├── app
│   ├── assets
│   │   ├── img
│   │   │   └── smile.png
│   │   └── main.css
│   ├── bootstrap.ts
│   ├── components
│   │   ├── about
│   │   │   ├── about.html
│   │   │   ├── about.ts
│   │   │   └── about_spec.ts
│   │   ├── app
│   │   │   ├── app.css
│   │   │   ├── app.html
│   │   │   ├── app.ts
│   │   │   └── app_spec.ts
│   │   └── home
│   │       ├── home.css
│   │       ├── home.html
│   │       ├── home.ts
│   │       └── home_spec.ts
│   ├── index.html
│   └── services
│       ├── name_list.ts
│       └── name_list_spec.ts
├── travis.yml
├── dist
│   └── dev
│       ├── assets
│       │   └── img
│       │       └── smile.png
│       ├── bootstrap.js
│       ├── components
│       │   ├── about
│       │   │   └── about.js
│       │   ├── app
│       │   │   └── app.js
│       │   └── home
│       │       └── home.js
│       ├── index.html
│       └── services
│           └── name_list.js
├── gulpfile.ts
├── karma.conf.js
├── package.json
├── test
│   ├── components
│   │   ├── about
│   │   │   ├── about.js
│   │   │   └── about_spec.js
│   │   ├── app
│   │   │   ├── app.js
│   │   │   └── app_spec.js
│   │   └── home
│   │       ├── home.js
│   │       └── home_spec.js
│   └── services
│       ├── name_list.js
│       └── name_list_spec.js
├── test-main.js
├── tools
│   ├── config.ts
│   ├── tasks
│   │   ├── build.bundles.ts
│   │   ├── build.deps.ts
│   │   ├── build.docs.ts
│   │   ├── build.html_css.prod.ts
│   │   ├── build.img.dev.ts
│   │   ├── build.index.ts
│   │   ├── build.js.dev.ts
│   │   ├── build.js.prod.ts
│   │   ├── build.sass.dev.ts
│   │   ├── build.test.ts
│   │   ├── check.versions.ts
│   │   ├── clean.ts
│   │   ├── karma.start.ts
│   │   ├── npm.ts
│   │   ├── serve.docs.ts
│   │   ├── server.start.ts
│   │   ├── tsd.ts
│   │   ├── tslint.ts
│   │   ├── watch.dev.ts
│   │   ├── watch.serve.ts
│   │   └── watch.test.ts
│   ├── typings
│   ├── utils
│   │   ├── server.ts
│   │   ├── tasks-tools.ts
│   │   ├── template-injectables.ts
│   │   └── template-locals.ts
│   └── utils.ts
├── tsconfig.json
├── tsd.json
└── tslint.json

```

# Configuration

Default application server configuration

```javascript 
var PORT             = 5555;
var LIVE_RELOAD_PORT = 4002;
var DOCS_PORT        = 4003;
var APP_BASE         = '/';
```

Configure at runtime

```bash
npm start -- --port 8080 --reload-port 4000 --base /my-app/
```

# How to extend?

If you want to use your custom libraries:

```bash
npm install my-library --save
vim tools/config.js
```
Add reference to the installed library in `NPM_DEPENDENCIES`:

```ts
export const NPM_DEPENDENCIES = [
  { src: 'systemjs/dist/system-polyfills.js', dest: LIB_DEST },


  { src: 'bootstrap/dist/css/bootstrap.min.css', inject: true, dest: CSS_DEST }
  // ...
  { src: 'my-library/dist/bundle.js', inject: true, dest: LIB_DEST }
];

```
- `src` - relative to `node_modules`
- `inject` - indicates whether the library should be injected (if not you have to include it manually in `index.html`)
- `dest` - your library will be copied to this location. Used for the production build.

**Do not forget to add a reference to the type definition inside the files where you use your custom library.**

# Running test

```bash
npm test

# Debug - In two different shell windows
npm run build.test.watch      # 1st window
npm run karma.start           # 2nd window
```

# License
MIT
