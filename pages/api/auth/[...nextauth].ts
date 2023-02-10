import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import type { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(`${process.env.BACK_URL}/v1/users/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            })
          })
          const user = await res.json() as any
          // If no error and we have user data, return it
          if (res.status === 200 && user) {
            return user
          } else {
            throw user.message
          }
        } catch (error: any) {
          throw new Error(error)
        }
        // Return null if user data could not be retrieved
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account) {
        token.access_token = user.access_token
        token.id = user.id
      }
      // console.log("User ", user)
      // console.log("Account ", account)
      // console.log("Profile ", profile)
      // console.log("isNewUser ", isNewUser)
      // token.user = user
      return token      
    },
    async session({ session, token }: any){

      session.access_token = token.access_token;
      session.user.id = token.sub

      return session;
    }
  }
}

export default NextAuth(authOptions)