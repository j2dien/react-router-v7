import { Form, useFetcher } from "react-router";
import type { Route } from "./+types/create-product";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const pid = formData.get("pid") as string;

  console.log("Product Name:", name);
  console.log("Product Price:", price);
  console.log("Product pid:", pid);

  return {
    message: "Product created successfully",
  };
}

export default function CreateProductPage() {
  const fetcher = useFetcher<typeof action>();
  const actionData = fetcher.data;

  return (
    <section>
      <h1>Create Product Page</h1>
      {actionData && <p>{actionData.message}</p>}
      <fetcher.Form method="post">
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border"
            required
          />
        </div>
        <div>
          <label htmlFor="price">Product Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            className="border"
            required
          />
        </div>
        <div>
          <label htmlFor="pid">Product ID:</label>
          <input type="text" id="pid" name="pid" className="border" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 py">
          Create Product
        </button>
      </fetcher.Form>
    </section>
  );
}
