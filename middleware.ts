import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/admin/signin",
  },
})

export const config = {
  matcher: [
    "/admin",
    "/admin/accueil/:path*",
    "/admin/projets/:path*",
    "/admin/devis/:path*",
    "/admin/images/:path*",
  ],
}