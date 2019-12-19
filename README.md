# AngularTourOfHeroes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

@Input() decorator on child component makes property available for binding by parent component

components => data presentation, delegating data access to services
dependency injection => modularity via @Injectables() decorator, registering provicers & injecting service into component constructor
services are singletons within the scope of an injector 
hierarchical injection system - nested injectors common in angular

> When you configure an injector with a provider, you associate that provider with a DI token. The injector maintains an internal token-provider map that it references when asked for a dependency. The token is the key to the map. *https://angular.io/guide/dependency-injection*

Angular's HttpClient methods return RxJS Observables => re: methods asynchronous signature
