import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimations} from "@angular/platform-browser/animations";

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {WebMessagingService} from "./shared/services/web-messaging.service";
import {rxStompServiceFactory} from "./shared/stomp/rx-stomp-service-factory";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    {
      // service for receiving and broadcasting websocket messages
      provide: WebMessagingService,
      useFactory: rxStompServiceFactory
    }
  ]
};
