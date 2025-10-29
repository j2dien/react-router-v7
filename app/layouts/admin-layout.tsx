import { Link, Outlet, redirect } from "react-router";
import type { Route } from "./+types/admin-layout";
import { getSession } from "~/session";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) {
    return redirect("/admin/login");
  }
}

export default function AdminLayout() {
  return (
    <main>
      <nav>
        Navbaar Admin:{" "}
        <Link to={"/admin/logout"} className="text-red-400">
          Logout
        </Link>
      </nav>
      <Outlet />
    </main>
  );
}
