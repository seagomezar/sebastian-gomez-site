// Re-export the shared image loader so components that still pass
// loader={grpahCMSImageLoader} behave identically to the global next/image loader.
export { default as grpahCMSImageLoader } from './lib/imageLoader';

