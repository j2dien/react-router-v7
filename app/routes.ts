import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("about", [
    layout("layouts/about-layout.tsx", [
      index("routes/about.tsx"),
      route("team", "routes/about-team.tsx"),
    ]),
  ]),
  route("products", "routes/products.tsx"),
  route("product/:pid", "routes/product.tsx"),
  ...prefix("admin", [
    route("login", "routes/admin/login.tsx"),
    layout("layouts/admin-layout.tsx", [
      route("logout", "routes/admin/logout.ts"),
      route("products/create", "routes/admin/create-product.tsx"),
    ]),
  ]),
  ...prefix("api", [route("products", "routes/api/products.ts")]),
] satisfies RouteConfig;
