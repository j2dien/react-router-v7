import { data, Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import { commitSession, getSession } from "~/session";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    return redirect("/admin/products/create");
  }
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // sample user
  const user = {
    id: "1",
    username: "admin",
    password: "1234",
  };

  if (username !== user.username || password !== user.password) {
    return data(
      {
        message: "Invalid username or password",
      },
      { status: 401 }
    );
  }

  session.set("userId", user.id);

  return redirect("/admin/products/create", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function AdminLoginPage({ actionData }: Route.ComponentProps) {
  return (
    <section>
      <h1>Login Page</h1>
      {actionData?.message && (
        <p className="text-red-500">{actionData.message}</p>
      )}
      <Form method="post">
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" className="border" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 py">
          Login
        </button>
      </Form>
    </section>
  );
}
