import { Link, NavLink, Outlet, useLocation } from "react-router";

export default function AboutLayout() {
  const location = useLocation();
  return (
    <main>
      <nav className="flex gap-4 *:text-blue-300">
        {location.pathname}
        <NavLink
          to={"/about"}
          className={({ isActive }) => (isActive ? "bg-blue-400" : "")}
        >
          About
        </NavLink>
        <Link
          to={"/about/team"}
          className={location.pathname === "/about/team" ? "bg-blue-400" : ""}
        >
          About Team
        </Link>
      </nav>
      <Outlet />
    </main>
  );
}
