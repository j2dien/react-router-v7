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
    // do somthing with the error
  }

  return {
    products: products.data,
    // data yg lain
  };
}

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;
  console.log(products);
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
