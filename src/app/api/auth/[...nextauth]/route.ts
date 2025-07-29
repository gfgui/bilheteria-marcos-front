import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
          credentials: "include", // Optional, only if your backend relies on cookies
        });

        if (!res.ok) return null;

        const data = (await res.json()) as LoginResponse;

        return {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          token: data.token, // Pass token into JWT if you want
        };
      },
    }),
  ],
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      token.role = user.role;

      // ✅ GUARDA o accessToken do backend no JWT do NextAuth
      token.accessToken = (user as any).token;
    }

    return token;
  },

  async session({ session, token }) {
    session.user = {
      id: token.id as string,
      name: token.name as string,
      email: token.email as string,
      role: token.role as string,
    };

    // ✅ REPASSA o accessToken para a session
    session.accessToken = token.accessToken as string;

    return session;
  },
},
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
