import { data, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/products";
import { z } from "zod";

const productSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    pid: z.string(),
  })
);

export async function loader() {
  const res = await fetch("http://localhost:3000/products");
  const result = await res.json();

  const products = productSchema.safeParse(result);

  if (!products.success) {
    throw data(
      {
        message: "Invalid product data",
      },
      {
        status: 500,
      }
    );
  }

  return {
    products: products.data,
    // data yg lain
  };
}

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;
  return (
    <section>
      <h1>Products Page</h1>
      <p>Our latest Products:</p>
      {!products || products.length === 0 ? (
        <p>No product available at the moment</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  console.log(isRouteErrorResponse(error));

  return <main>Error</main>;
}
