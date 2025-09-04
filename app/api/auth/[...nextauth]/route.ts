import { ICallback, ISessionUser, IUser, IUserComplete } from "@/types/auth";

import axios from "axios";
import NextAuth from "next-auth";
import type { Account, AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<any> {
        if (typeof credentials !== "undefined") {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );
          if (res.status === 200 || res.status == 201) {
            return {
              token: res.data.token,
              user: res.data.user,
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    CredentialsProvider({
      name: "signin",
      id: "signIn",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<any> {
        if (typeof credentials !== "undefined") {
          try {
            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
              {
                email: credentials.email,
                password: credentials.password,
              }
            );
            if (res.status === 200 || res.status === 201) {
              return {
                token: res.data.token,
                user: res.data.user,
              };
            } else {
              return null;
            }
          } catch (error) {
            console.error("User login error:", error);
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    CredentialsProvider({
      name: "ghost-login",
      id: "ghost-login",
      credentials: {
        userId: { label: "User ID", type: "text" },
        adminId: { label: "Admin ID", type: "text" },
      },

      async authorize(credentials): Promise<any> {
        if (typeof credentials !== "undefined") {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/ghost-login`,
            {
              userId: credentials.userId,
              adminId: credentials.adminId,
            }
          );
          if (res.status === 200 || res.status == 201) {
            return {
              token: res.data.token,
              user: res.data.user,
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  debug: true,
  session: { strategy: "jwt", maxAge: 90 * 24 * 60 * 60 }, // ! session age ( 3 months)
  pages: {
    signIn: "/registracija",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      const currentUser = user as IUser;
      if (account && currentUser) {
        token.accessToken = currentUser.token as string;
        token.refreshToken = currentUser.refreshToken as string;
        token.me = currentUser.user as IUserComplete;

        return token;
      }

      // update token.me with explicit user data when client sends an update request
      if (trigger === "update") {
        token.me = session.user.me;
      }
      return token;
    },

    async session({ session, token, user }) {
      const currentUser = session.user as ISessionUser;
      if (currentUser) {
        currentUser.accessToken = token.accessToken as string;
        currentUser.refreshToken = token.refreshToken as string;
        currentUser.accessTokenExpires = token.exp as string;
        currentUser.isAdmin = token.isAdmin as boolean;
        currentUser.me = token.me as IUserComplete;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
