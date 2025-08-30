// types/auth.d.ts - Updated version
import { Account, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface IUserComplete {
  id: string;
  email: string;
  name: string;
  role: string;
  slugKey: string;
  isAdmin: boolean;
  isBlocked: boolean;
  isPaid: boolean;
  hasFlorist: boolean;
  company?: string;
  contactPersonName?: string;
  picture?: { type: string; path: string; originalName: string };
  permissions: {
    createObituary: boolean;
    assignKeeper: boolean;
    sendGifts: boolean;
    sendMobile: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface IUser extends User {
  auth: Account | null;
  token: string;
  refreshToken: string | null;
  user: IUserComplete; // Full user object
}

export interface ICallback {
  token: JWT;
  account: Account | null;
  user: IUser;
}

export interface ISessionUser {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: string;
  me: IUserComplete;
  isAdmin?: boolean;
} 

declare module "next-auth" {
  interface Session {
    user: ISessionUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    me: IUserComplete;
  }
}