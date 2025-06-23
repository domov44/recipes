import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      // Configuration importante pour SSR
      withRouterConfig({
        onSameUrlNavigation: 'reload' // Recharger si même URL
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled'
      })
    ),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay())
  ]
};
