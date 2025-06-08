import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("cart", "routes/cart.tsx"),
  route("news", "routes/news/news.tsx"),
  route("news/:slug", "routes/news/[slug].tsx"),
  route("account", "routes/users/account.tsx"),
  route("about", "routes/about/about.tsx"),
  route("auth", "routes/auth/auth.tsx"),
  route("profile", "routes/users/profile.tsx"),
  route("admin/news", "routes/admin/news.tsx"),
  route("admin/news/new", "routes/admin/news/new.tsx"),
  route("admin/news/edit/:id", "routes/admin/news/edit/[id].tsx"),
  route("auth/callback", "routes/auth/callback.tsx"),
] satisfies RouteConfig;