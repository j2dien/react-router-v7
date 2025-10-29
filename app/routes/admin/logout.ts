import { destroySession, getSession } from "~/session";
import type { Route } from "./+types/logout";
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/admin/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
