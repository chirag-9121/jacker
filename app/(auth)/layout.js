import SideNav from "../components/SideNav";

export default function AuthLayout({ children }) {
  return (
    <div className="flex">
      <SideNav />
      {children}
    </div>
  );
}
