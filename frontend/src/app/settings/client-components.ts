// This helps TypeScript understand client components
export {}; // Make this file an external module
declare global {
    namespace React {
      interface FunctionComponent<P = {}> {
        client?: boolean;
      }
    }
  }