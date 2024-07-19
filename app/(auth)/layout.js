import SideNav from "@/app/components/navbar/SideNav";

// Different route group for user after authentication to display sidenav
export default function AuthLayout({ children }) {
  return (
    <div className="flex">
      <SideNav />
      {children}
    </div>
  );
}
