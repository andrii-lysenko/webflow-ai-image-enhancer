export type AIImage = {
  data: string;
  mimeType: string;
};

// Auth & User Types
export interface TokenResponse {
  sessionToken: string;
}

export interface DecodedToken {
  user: {
    firstName: string;
    email: string;
  };
  exp: number;
}

// JWT Decoded Token Type
export interface DecodedToken {
  user: User;
  exp: number;
  // Add other JWT claims as needed
  iat?: number;
  iss?: string;
}

export interface User {
  firstName: string;
  email: string;
}

export interface StoredUser extends User {
  sessionToken: string;
  exp: number;
}

// Site Types
export interface Site {
  id: string;
  displayName: string;
  createdOn: string;
  lastUpdated: string;
  lastPublished: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}
