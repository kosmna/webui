import { TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';

const XLIFF = `<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="f4661fab0bda1dae3620088f290a8f086a6ca26e" datatype="html">
        <source>{VAR_SELECT, select, other {deeply nested} }</source>
        <target>{VAR_SELECT, select, other {profondément imbriqué} }</target>
        <context-group purpose="location">
          <context context-type="sourcefile">file.ts</context>
          <context context-type="linenumber">1</context>
        </context-group>
      </trans-unit>
      <trans-unit id="78e9f3aab47c6cf393131413e0c51dedaa37766b" datatype="html">
        <source>This is a test <x id="INTERPOLATION" equiv-text="{{ok}}"/> !</source>
        <target>Ceci est un test <x id="INTERPOLATION" equiv-text="{{ok}}"/> !</target>
        <context-group purpose="location">
          <context context-type="sourcefile">src/app/app.component.ts</context>
          <context context-type="linenumber">1</context>
        </context-group>
      </trans-unit>
      <trans-unit id="9161da7236814a71c5fec94eb42161651f6b4967" datatype="html">
        <source>This is a test message <x id="ICU" equiv-text="{sex, select, other {...}}"/></source>
        <target>Ceci est un message de test <x id="ICU" equiv-text="{sex, select, other {...}}"/></target>
        <context-group purpose="location">
          <context context-type="sourcefile">file.ts</context>
          <context context-type="linenumber">1</context>
        </context-group>
      </trans-unit>
      <trans-unit id="custom" datatype="html">
        <source>Custom message <x id="ICU" equiv-text="{sex, select, other {...}}"/> !!</source>
        <target><x id="ICU" equiv-text="{sex, select, other {...}}"/> et personnalisé !!</target>
        <context-group purpose="location">
          <context context-type="sourcefile">file.ts</context>
          <context context-type="linenumber">1</context>
        </context-group>
      </trans-unit>
    </body>
  </file>
</xliff>
`;



   export const I18nTestProviders = [
      {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
      {provide: TRANSLATIONS, useValue: XLIFF},
      I18n
    ];



