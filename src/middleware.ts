// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Rota pública, não exige autenticação (irrelevante no momento)
  const isPublic = pathname === "/login" || pathname === "/";

  // Rota protegida
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //loga quem está logado :)
  if ( pathname === "/login" && token){
    if(token?.role === "ADMIN"){
      return NextResponse.redirect(new URL("/admin", req.url));
    } else if(token?.role === "COSTUMER") {
      return NextResponse.redirect(new URL("/costumer", req.url));
    }
    return NextResponse.next();
  }

  // Rota de admin apenas
  if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Rota de spot apenas
  if (pathname.startsWith("/costumer") && token?.role !== "COSTUMER") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

//middleware afeta todas as rotas
export const config = {
  matcher: [
    // Aplica o middleware para todas as rotas dentro de /admin, incluindo subcaminhos
    "/admin/:path*",
    "/costumer/:path*",
    "/login/:path*",
  ],
};