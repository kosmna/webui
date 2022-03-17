# Demo WebUI
Version 2.0

A web interface for Demo, made using Angular 4, Material Design, and
TypeScript.

## Development Setup

Install `@angular/cli` globally via npm:

```
npm install -g @angular/cli
```

Then simply run `npm install` to install the necessary dependencies.

You can run the app in a live-reload config by running `npm run start`.

## Commands

### Angular CLI

Angular CLI comes with several commands to bootstrap development tasks. Examples:

* `ng build` - Compile and bundle the application, outputs to `/dist/`
* `ng serve` - Compile, bundle, and serve the application with live-reloading. Defaults to `http://localhost:4200/`
* `ng generate {type} {name}` - Scaffold some new item in the project,such as components, directives, modules, or services. Also has a shorthand `ng g`.
* `ng test` - Run unit tests with Karma
* `ng e2e` - Run end-to-end tests with Protractor
* `ng help` - List more options and descriptions of each

For more details, see [Angular CLI].

## Development Server

* `start` - starts dev server using proxy-config.
* `start:se` - starts dev server with Parker environments  using proxy-config.
* `start:ja` - starts dev server using japanese translations  and proxy-config.

## Building Different Versions

* `build` - runs ng build with default environment variables. Only used when testing build.
* `build:dev`,  `build-kosmyna-webui-dev` - Creates Demo development build. Includes development modules (settings module) and sourceMaps. Used on [edge02](https://edge02.litmusloop.com).
* `build:dev-ja`, `build-kosmyna-webui-dev-ja` - Japanese development build.
* `build:dev-full` - Concurrently builds development build and Japanese build.
* `build:le`, `build-kosmyna-webui-full`  -  Production build of **Demo full**.
* `build:le-ja`, `build-kosmyna-webui-full-ja` - Production build of Demo full in **Japanese**.
* `build:le-all` - Concurrently builds all Demo full with different languages.
* `build:le-lite`, `build-kosmyna-webui-lite` - Builds production build of **Demo Lite**
* `build:le-lite-ja`, `build-kosmyna-webui-lite-ja` -  Demo lite in **Japanese**.
* `build:le-lite-all` - Concurrently builds Japanese and English of Demo Lite.
* `build:se`, `build-scoutedge-webui-full` - Production Build of ScoutEdge,
* `build:se-lite`, `build-scoutedge-webui-lite` - Production Build of **ScoutEdge Lite**
* `build:functions` - builds Demo functions

For more information look at angular.json configurations.


## File Structure

* `/` - Root directory
  * `/e2e/` - Protractor end-to-end tests
  * `/src/` - App source code
    * `/app/` - The main app module
    * `/shared/` - shared module
    * `/core/` - core module
    * `/assets/` - Static assets bundled with the app (images, fonts, etc.)
    * `/environments/` - Dev/Prod environment configuration for builds.
    * `/locale/` - Files for i18n, translating messages

Angular (v2+) projects are organized by "modules" that contain components,
directives, pipes, services, classes, and so on. Each module imports
needed functionality and exports other functionality for other modules to
share, like libraries.

The Shared  module consists of common, pre-configured components that
represent Loop branding and style, such as a custom side-nav bar or a
chat widget. Use these instead of raw Material Design components when
designing the app. If you need a new component, try to extract the layout
and styles to a Shared  component and base it on that.

For a reference to those coming from Angular 1.x, see the [AngularJS to Angular Quick Reference].

## Tools and Libraries

This project is managed by [Angular CLI], a tool for building and
managing Angular projects. It has a number of helpful scaffolding,
testing, and building features that are invoked with commands. It is
configured using `.angular-cli.json`. Adding global styles (Material
theme, etc.) is also configured here.

The language used for this project is [TypeScript], a superset of ES6/7
syntax with optional static typing support. Code is compiled down to ES5
for running in the browser and is configured with polyfills for maximum
compatibility.

TypeScript code is linted using [TSLint], the TypeScript equivalent of
ESLint, configurable via `tslint.json`. The TypeScript compiler will also
detect errors while building and is configurable in each instance of
`tsconfig.json`.

The components in this project are based on Material Design guidelines,
and extend [Angular Material] as well as other Material-style libraries
as needed.

## Testing

[Karma] is used with [Jasmine] for unit testing individual components. When unit-testing a component, use its `.spec.ts` file and refer to the [Angular Testing docs] for details on how testing components works. Run `ng test` to run all Karma tests.

[Protractor] is used for end-to-end (e2e) testing, just like AngularJS (1.x).
Each Protractor test is located in the `/e2e/` folder

## Internationalization

For information on how to set up i18n, see [Angular i18n].

To extract translatable messages from the app once they are set up, run
`npm run i18n`. This will extract all translatable text from the **html only** to messages.xlf. Then it will merge new text to message.{language extension}.xlf. located in locale folder. The messages files in local folder is where all translated text will be held.

For translations in text `npm run ng-extractor` && `npm run i18n:merge`. Currently using [i18n-polyfill](https://github.com/ngx-translate/i18n-polyfill). This library is a speculative polyfill, it means that it's supposed to replace an API that is coming in the future.

The Loop UI module has a service called LocaleService. This handles the current language selected for the application and allows localizing API
URLs (appending `?locale={currentLocale}`) as well as changing the
current language.

## Development Process Notes

* When developing new components for the UI, consider having them
encapsulated in an independent module for reuse by other projects. For example: designing a new style of button directive. The button directive and all CSS can be stored in the Loop UI module and accessed through that.

* Before pushing your changes, use the `npm run errorcheck` script. To
ensure that there are no linting, testing, or build errors for the gitlab
pipeline and production, this simulates the gitlab pipeline on your
machine.

* Use TypeScript features to the fullest. Install TSLint on your machine and, if you are using an editor that supports it, any extensions to use TypeScript, TSLint, and the Angular Language Service. These will provide error checks inside your IDE or editor. Also, when editing code, make liberal use of class definitions for API models and never rely on the "any" or "object" types if you can help it.

* When naming css classes follow [BEM methodology](https://en.bem.info/methodology/css/).

[Angular CLI]: https://github.com/angular/angular-cli
[Angular i18n]: https://angular.io/docs/ts/latest/cookbook/i18n.html
[Angular Material]: https://material.angular.io/
[Angular Style Guide]: https://angular.io/docs/ts/latest/guide/style-guide.html
[Angular Testing docs]: https://angular.io/docs/ts/latest/guide/testing.html
[AngularJS to Angular Quick Reference]: https://angular.io/docs/ts/latest/cookbook/ajs-quick-reference.html
[Jasmine]: https://jasmine.github.io/2.4/introduction.html
[Karma]: https://karma-runner.github.io/
[Protractor]: http://www.protractortest.org/
[TSLint]: https://palantir.github.io/tslint/
[Typescript]: https://www.typescriptlang.org/

## License

Copyright (c) 2018 Litmus Automation Inc.

Redistribution and use in source and binary forms, with or without
modification, are NOT permitted.
