import { ApplicationThemes } from '@app/ui-theming/models';
/**
 * Application Config
 * Add theme name to env variable
 * default theme will be applied if not specified
 * Theme service uses this config to set up theme
 *
 */
export const Application_Themes: ApplicationThemes = {
  litmus: {
    title: 'Demo',
    favicon: 'litmus',
    logoURL: './assets/LitmusDemoLogo.svg',
    smLogoURL: './assets/LitmusLogoSmall.svg',

    default: {
      themeClass: 'loop-theme',
    },
    dark: {
      themeClass: 'loop-dark-theme',
    },
  },

  parker: {
    title: 'Voice of the Machine Edge',
    favicon: 'parker',
    logoURL: './assets/VOMTaglin.svg',
    smLogoURL: './assets/VOMLogoEdge.svg',

    default: {
      themeClass: 'parker-theme',
    },
    dark: {
      themeClass: 'parker-dark-theme',
    },
  },

  edgeline: {
    title: 'HPE OTLink Platform',
    favicon: 'edgeline',
    logoURL: './assets/hpe_otlink_logo.svg',
    smLogoURL: './assets/hpe_element_logo.svg',

    default: {
      themeClass: 'edgeline-theme',
    },
    dark: {
      themeClass: 'edgeline-dark-theme',
    },
  },
};
