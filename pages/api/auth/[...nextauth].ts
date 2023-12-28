import NextAuth, { Account, DefaultUser, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

import axios from 'axios';

import type { AuthOptions } from 'next-auth';
// import type { JWT } from 'next-auth/jwt';

// async function refreshAccessToken(objectToken: JWT) {
//   try {
//     const { data } = await axios.post(`${process.env.BACK_URL}/v1/auth/refreshToken`, {
//       refresh_token: objectToken.refresh_token,
//     });
//     console.log("In Data: ", data)
//     return {
//       ...objectToken,
//       access_token: data.access_token,
//       refresh_token: data.refresh_token,
//     };
//   } catch (error: any) {
//     // console.log("OBJECT TOKEN ERROR: ", error)
//     return {
//       ...objectToken,
//       error: 'RefreshAccessTokenError' as const,
//     };
//   }
// }

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    
    // CredentialsProvider({
    //   name: 'credentials',
    //   credentials: {
    //     email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials, _req) {
    //     try {
    //       const res = await fetch(`${process.env.BACK_URL}/v1/users/login`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //           email: credentials?.email,
    //           password: credentials?.password,
    //         }),
    //       });
    //       const user = (await res.json()) as any;
    //       // If no error and we have user data, return it
    //       if (res.status === 200 && user) {
    //         return { ...user };
    //       } else {
    //         throw user.message;
    //       }
    //     } catch (error: any) {
    //       throw new Error(error);
    //     }
    //     // Return null if user data could not be retrieved
    //     return null;
    //   },
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt(todo: any) {
      console.log("JWT: ", todo)
      if(todo.account && todo.profile?.email_verified) {
        const body = {
          email: todo.profile.email,
          firstname: todo.profile.given_name,
          lastname: todo.profile.family_name
        }
        const res = await fetch(`${process.env.BACK_URL}/v2/users/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const user = (await res.json()) as any;
        console.log("Res: ", user)
        todo.token.access_token = user.access_token
        todo.token.google_token = todo.account.access_token
        todo.token.user_id = user.id
      }
      return todo.token;
    },
    async session({ session, token }: any) {
      session.access_token = token.access_token
      session.google_token = token.google_token
      session.user.id = token.user_id
      return session;
    },
    // async signIn(todo: any) {
    //   console.log("Account Todo: ", todo);
      
    //   if (todo.account.provider === "google" && todo.profile.email_verified) {
    //     return todo
    //     // && (profile.email.endsWith("@gmail.com") || profile.email.endsWith("@setandforget.io")) // delete this
    //   }
    //   return true // Do different verification for other providers that don't have `email_verified`
    // },
  },
};

// declare module 'next-auth/core/types' {
//   interface Session {
//     user: {
//       id?: string | null;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     };
//     access_token: string;
//     refresh_token: string;
//     expires: ISODateString | null;
//     error?: 'RefreshAccessTokenError';
//   }
// }

// declare module 'next-auth' {
//   interface User extends DefaultUser {
//     firstname: string;
//     lastname: string;
//     access_token: string;
//     refresh_token: string;
//   }
// }

// declare module 'next-auth/jwt' {
//   interface DefaultJWT {
//     access_token: string;
//     exp: number;
//     iat: number;
//     refresh_token: string;
//     error?: 'RefreshAccessTokenError';
//   }
// }

export default NextAuth(authOptions);
