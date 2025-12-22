import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./lib/prisma"
import { customHash } from "./lib/hash";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if(!email || !password) {
            throw new Error("Invalid Credentials!");
        }  
        // logic to verify if the user exists
        const user = await prisma.user.findUnique({
            where: {email: email},
        })
 
        if (!user) {
          throw new Error("Invalid credentials!");
        }

        // logic to salt and hash password
        const inputHash = customHash(password, user.salt);

        if(inputHash !== user.password) {
            throw new Error("Invalid credentials!");
        }
 
        // return user object with their profile data
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            isHost: user.isHost,
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({token, user, trigger, session}) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.isHost = user.isHost;
      }
      
      if (trigger === "update" && session) {
        token.name = session.name;
        token.email = session.email;
        token.isHost = session.isHost;
      }
      
      return token;
    },
    session: async ({session, token}) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.isHost = token.isHost as boolean;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
})