import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

interface CustomToken {
  token?: string;
  email?: string;
  id?: string;
}

export interface CustomSession extends DefaultSession {
  token?: string;
  email?: string;
  id?: string;
}

interface UserType {
  email?: string;
  id?: string;
  token?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        try {
          const res = await axios.post(
            "http://localhost:3001/auth/register-or-login",
            {
              email: profile.email,
              option: "google",
            },
            { headers: { "Content-Type": "application/json" } }
          );

          if (res.data.success) {
            return {
              id: res.data.newUser._id,
              email: res.data.newUser.email,
              token: res.data.token,
            };
          }

          return res.data;
        } catch (err) {
          if (axios.isAxiosError(err)) {
            const message = err?.response?.data?.message;
            throw new Error(message);
          }
        }
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        option: { label: "Option", type: "text" },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.option
        )
          return null;

        try {
          const res = await axios.post(
            "http://localhost:3001/auth/register-or-login",
            {
              email: credentials.email,
              password: credentials.password,
              option: "manual",
            },
            { headers: { "Content-Type": "application/json" } }
          );

          if (res.data.success) {
            return {
              id: res.data.newUser._id,
              email: res.data.newUser.email,
              token: res.data.token,
            };
          }
          return res.data;
        } catch (err) {
          if (axios.isAxiosError(err)) {
            const message = err?.response?.data?.message;
            throw new Error(message);
          }
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("user", user);
        const customUser = user as UserType;
        token.id = user.id;
        token.email = user.email;
        token.token = customUser.token;
      }
      return token;
    },

    async session({ session, token }) {
      const customSession = session as CustomSession;
      const customToken = token as CustomToken;
      customSession.token = customToken.token;
      customSession.email = customToken.email;
      customSession.id = customToken.id;
      return customSession;
    },
  },

  pages: {
    signIn: "/sign-in",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
