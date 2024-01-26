import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideRouter, withEnabledBlockingInitialNavigation} from "@angular/router";
import {appRoutes} from "./app/app.routes";

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation())]
}).catch((err) => console.error(err));
