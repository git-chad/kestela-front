import NextAuth, { Account, DefaultUser, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

import type { AuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

async function refreshAccessToken(objectToken: JWT) {
  try {
    const { data } = await axios.post(`${process.env.BACK_URL}/v1/auth/refreshToken`, {
      refresh_token: objectToken.refresh_token,
    });
    console.log("In Data: ", data)
    return {
      ...objectToken,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };
  } catch (error: any) {
    // console.log("OBJECT TOKEN ERROR: ", error)
    return {
      ...objectToken,
      error: 'RefreshAccessTokenError' as const,
    };
  }
}

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    maxAge: 1 * 8 * 60 * 60, // 8 hrs
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _req) {
        try {
          const res = await fetch(`${process.env.BACK_URL}/v1/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          const user = (await res.json()) as any;
          // If no error and we have user data, return it
          if (res.status === 200 && user) {
            return { ...user };
          } else {
            throw user.message;
          }
        } catch (error: any) {
          throw new Error(error);
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.name = `${user.firstname} ${user.lastname}`;
        token.picture =
          user.image ||
          `https://ui-avatars.com/api/?name=${
            user.firstname + '+' + user.lastname
          }&background=0D8ABC&color=fff`;
        
        return token
      }
      // console.log("Token: ", token)

      // if (token.exp &&  token.iat) {
      //   let result = token.exp - token.iat
      //   result = (result - 30 * 60 * 1000) - Date.now()
      //   console.log("Segundos: ", Math.floor(result / 1000))
      // }

      // If the call arrives after 23 hours have passed, we allow to refresh the token.
      // token = await refreshAccessToken(token);
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      session.user.id = token.sub;
      session.error = token.error;
      return session;
    },
  },
};

declare module 'next-auth/core/types' {
  interface Session {
    user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    access_token: string;
    refresh_token: string;
    expires: ISODateString | null;
    error?: 'RefreshAccessTokenError';
  }
}

declare module 'next-auth' {
  interface User extends DefaultUser {
    firstname: string;
    lastname: string;
    access_token: string;
    refresh_token: string;
  }
}

declare module 'next-auth/jwt' {
  interface DefaultJWT {
    access_token: string;
    exp: number;
    iat: number;
    refresh_token: string;
    error?: 'RefreshAccessTokenError';
  }
}

export default NextAuth(authOptions);
