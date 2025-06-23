// Global type declarations for Ateliê Dmax project

// Extend Window interface to include custom properties
interface Window {
  autoDetector?: any;
  debugAutoDetector?: () => Promise<void>;
  getDetectionStats?: () => Promise<any>;
  Vue?: any;
}

// Vue.js component interface
interface VueInstance {
  $set(target: any, key: string | number, value: any): any;
  $emit(event: string, ...args: any[]): any;
}

// Declare global Vue
declare const Vue: any;
