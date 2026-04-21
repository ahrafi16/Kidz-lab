import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/actions/server/auth";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await loginUser(credentials);

        if (user) {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
          };
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        const usersCollection = await dbConnect(collections.USERS);

        const isExist = await usersCollection.findOne({
          email: user.email
        });

        if (isExist) return true;

        const newUser = {
          provider: account.provider,
          name: user.name,
          email: user.email,
          image: user.image,
          role: "user",
        };

        const result = await usersCollection.insertOne(newUser);
        console.log("INSERT RESULT:", result);
        return result.acknowledged;

      } catch (error) {
        console.error("SIGNIN ERROR:", error);
        return true;
      }
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session, user, token }) {
      if (token) {
        session.role = token?.role;
        session.email = token?.email;
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        if (account.provider == "google") {
          const usersCollection = await dbConnect(collections.USERS);
          const dbUser = await usersCollection.findOne({
            email: user.email,
          });
          token.role = dbUser?.role;
          token.email = dbUser?.email;
        } else {
          token.role = user?.role;
          token.email = user?.email;
        }

      }
      return token
    }
  }
};