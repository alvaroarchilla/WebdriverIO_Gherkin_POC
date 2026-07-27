// 1. Importa defineConfig en lugar de tipos manuales
import { defineConfig } from '@wdio/config';

// 2. Exporta la config envuelta en defineConfig (sin necesidad de tipar manualmente)
export const config = defineConfig({
    // Tu configuración completa va aquí
    framework: 'cucumber',
    specs: ['./src/features/**/*.feature'],
    
    // ✅ capabilities funcionará perfectamente
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [ '--headless','--disable-gpu']
        }
    }],
    cucumberOpts: {
      require: ['./src/step-definitions/login.steps.ts'],
      requireModule: ['ts-node/register'],
  },
    
    // Timeouts
    maxInstances: 1,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    
    // Reporter (para ver bonito en consola)
    reporters: ['spec'],
});
