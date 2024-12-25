import Logo from "@ui/logo";
import Navigation from "@components/navigation";

function Header() {
  return (
    <header className="border-b border-primary-900 px-5 md:px-8 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
