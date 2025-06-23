/**
 * Vue 3 + TypeScript Global Type Definitions
 * Para uso com CDN (sem npm/bundler)
 */

// Vue 3 Global interface para CDN
declare global {
  const Vue: {
    // Core API
    createApp: (options?: any) => VueApp;
    reactive: <T extends object>(target: T) => T;
    ref: <T>(value: T) => { value: T };
    computed: <T>(getter: () => T) => { value: T };
    watch: (source: any, callback: any, options?: any) => void;
    watchEffect: (effect: () => void) => void;
    
    // Lifecycle
    onMounted: (callback: () => void) => void;
    onUpdated: (callback: () => void) => void;
    onUnmounted: (callback: () => void) => void;
    onBeforeMount: (callback: () => void) => void;
    onBeforeUpdate: (callback: () => void) => void;
    onBeforeUnmount: (callback: () => void) => void;
    
    // Utilities
    nextTick: (callback?: () => void) => Promise<void>;
    toRefs: <T extends object>(object: T) => { [K in keyof T]: { value: T[K] } };
    unref: <T>(ref: T | { value: T }) => T;
    
    // Vue 2 compatibility
    component?: (name: string, definition: any) => void;
  };

  interface VueApp {
    component: (name: string, definition: any) => VueApp;
    mount: (selector: string | Element) => any;
    config: {
      globalProperties: Record<string, any>;
    };
  }

  interface Window {
    Vue?: typeof Vue;
    ProductGalleryApp?: VueApp;
    autoDetector?: any;
    ProductGalleryComponent?: any;
  }
}

// Vue Component interfaces
export interface VueComponentSetup {
  (): any;
}

export interface VueComponent {
  setup?: VueComponentSetup;
  template?: string;
  props?: string[] | Record<string, any>;
  emits?: string[] | Record<string, any>;
}

export {};
