import { environment as devEnv } from './environment.dev';

export const environment = Object.assign({}, devEnv, {
    themeName: 'parker',
    parker: true
  });
