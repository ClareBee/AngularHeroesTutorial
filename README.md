# AngularTourOfHeroes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.
___

<img src="" alt="heroes">
<img src="" alt="top 4">
<img src="" alt="details">

___

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Learning notes

- `@Input()` decorator on child component makes property available for binding by parent component

- components => data presentation, delegating data access to services
- dependency injection => modularity via `@Injectables()` decorator, registering provicers & injecting service into component constructor
- services are singletons within the scope of an injector 
hierarchical injection system - nested injectors common in angular

> When you configure an injector with a provider, you associate that provider with a DI token. The injector maintains an internal token-provider map that it references when asked for a dependency. The token is the key to the map. *https://angular.io/guide/dependency-injection*

Angular's HttpClient methods return RxJS Observables => re: methods asynchronous signature

By convention, the module class name is AppRoutingModule and it belongs in the `app-routing.module.ts` in the `src/app` folder.

>`imports: [ RouterModule.forRoot(routes) ]`
The method is called forRoot() because you configure the router at the application's root level. The `forRoot()` method supplies the service providers and directives needed for routing, and performs the initial navigation based on the current browser URL.

- HttpClient = all methods return an RxJS Observable of something
- To catch errors, "pipe" observable result from `http.get()` through an RxJS `catchError()` operator.

RxJS Subjects

- `switchMap()` preserves the original request order while returning only the observable from the most recent HTTP method call.


[RxJS](https://rxjs-dev.firebaseapp.com/)
> RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code. 

From the website:
   - **Observable**: represents the idea of an invokable collection of future values or events.
   - **Observer**: is a collection of callbacks that knows how to listen to values delivered by the Observable.
   - **Subscription**: represents the execution of an Observable, is primarily useful for cancelling the execution.
   - **Operators**: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
   - **Subject**: is the equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
   - **Schedulers**: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.
