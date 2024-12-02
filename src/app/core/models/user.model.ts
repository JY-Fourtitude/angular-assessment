// src/app/core/models/user.model.ts
export interface User {
    id: number;
    username: string;
    email: string;
    password?:string;
    token?: string; // Optional token for JWT authentication
  }
  
  // Optional: Create an index.ts file in the models folder for easier imports
  // src/app/core/models/index.ts
  export * from './user.model';