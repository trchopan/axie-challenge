import {App} from 'vue';
import {upperFirst, camelCase} from 'lodash';

export const registerComponents = (app: App) => {
  const components = import.meta.globEager('./**/*.vue');
  for (const component in components) {
    // Get PascalCase name of component
    const componentName = upperFirst(
      camelCase(
        // Gets the file name regardless of folder depth
        component
          .split('/')
          .pop()!
          .replace(/\.\w+$/, '')
      )
    );

    const componentConfig = components[component];

    // Register component globally
    app.component(componentName, componentConfig.default || componentConfig);
  }
};
