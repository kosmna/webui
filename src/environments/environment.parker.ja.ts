import { environment as devEnv } from './environment.parker';

/**
 *  Production Environment for Demo (full Demo)
 *  Japanese locale
 */
export const environment = Object.assign({}, devEnv, {
    locale: 'ja'
  });
