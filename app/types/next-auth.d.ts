declare module "next-auth" {
  interface Session {
    token?: string;
    email?: string;
    id?: string;
  }

  interface User {
    token?: string;
  }

  interface JWT {
    token?: string;
    email?: string;
    id?: string;
  }
}

export {};
