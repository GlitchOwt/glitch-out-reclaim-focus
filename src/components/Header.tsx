import { AppWindow, Users, BookOpen, Map, UserPlus } from "lucide-react";
import { AnimeNavBar } from "@/components/ui/anime-navbar";

const navItems = [
  { name: "About", url: "#about", icon: Users },
  { name: "Manifesto", url: "#manifesto", icon: BookOpen },
  { name: "Glitchboard", url: "#roadmap", icon: Map },
  { name: "Join", url: "#join", icon: UserPlus },
];

const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-10">
      <div className="flex justify-between items-center w-full h-16">
          {/* Logo */}
        <div className="flex-shrink-0 ml-10 flex items-center h-full">
            <span className="font-pixel text-2xl text-foreground hover-glitch cursor-pointer">
              <span className="glitch" data-text="GLITCHOWT">
                GLITCHOWT
              </span>
            </span>
          </div>
        {/* AnimeNavBar on the extreme right */}
        <div className="mr-4">
          <AnimeNavBar
            items={navItems.map(item => ({ ...item, url: item.url }))}
            defaultActive="Apps"
            className="px-0 py-0 shadow-none border-none bg-transparent"
            handleNavClick={handleScroll}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;