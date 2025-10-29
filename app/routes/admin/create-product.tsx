import { data, useFetcher } from "react-router";
import type { Route } from "./+types/create-product";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const pid = formData.get("pid") as string;

  const errors: { name?: string; price?: string; pid?: string } = {};

  if (!name) {
    errors.name = "Name is required";
  }

  if (!price || isNaN(price)) {
    errors.price = "Price must be a number";
  }

  if (!pid) {
    errors.pid = "Product ID is required";
  }

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price, pid }),
  });
}

export default function CreateProductPage() {
  const fetcher = useFetcher<typeof action>();
  const actionData = fetcher.data;

  return (
    <section>
      <h1>Create Product Page</h1>
      <fetcher.Form method="post">
        <div>
          <label htmlFor="name">Product Name:</label>
          <input type="text" id="name" name="name" className="border" />
          {actionData?.errors?.name && (
            <p className="text-red-500">{actionData.errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="price">Product Price:</label>
          <input type="number" id="price" name="price" className="border" />
          {actionData?.errors?.price && (
            <p className="text-red-500">{actionData.errors.price}</p>
          )}
        </div>
        <div>
          <label htmlFor="pid">Product ID:</label>
          <input type="text" id="pid" name="pid" className="border" />
          {actionData?.errors?.pid && (
            <p className="text-red-500">{actionData.errors.pid}</p>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 py">
          Create Product
        </button>
      </fetcher.Form>
    </section>
  );
}
