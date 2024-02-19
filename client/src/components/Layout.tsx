import Navigation from "./Navigation";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Navigation />
      <div className="relative w-full px-8 py-10">{children}</div>0
    </div>
  );
}

export default Layout;
