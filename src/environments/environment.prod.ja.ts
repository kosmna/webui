import { environment as devEnv } from './environment.prod';

/**
 *  Production Environment for Demo (full Demo)
 *  Japanese locale
 */
export const environment = Object.assign({}, devEnv, {
    locale: 'ja'
  });
