import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


import './app/core/extensions/lodash.extension'


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
