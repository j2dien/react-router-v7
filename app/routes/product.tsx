import type { Route } from "./+types/product";

export default function Product({ params }: Route.ComponentProps) {
  return (
    <section>
      <h1>Product Page</h1>
      <p>Product ID: {params.pid}</p>
    </section>
  );
}
