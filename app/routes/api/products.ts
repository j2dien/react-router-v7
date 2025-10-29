import type { Route } from "./+types/products";

// Get method
export async function loader({ request }: Route.LoaderArgs) {
  return Response.json({
    message: "List of products",
  });
}

// POST, PUT, DELETE, PATCH method
export async function action({ request }: Route.ActionArgs) {
  const body = await request.json();
  return Response.json({
    message: "Create a new product",
  });
}
