import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/actions/server/auth";

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
  ],
};