import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <span className="font-pixel text-2xl">GLITCHOWT</span>
            <p className="text-background/80 text-sm">
              Voice-first AI studio building the alternative to screen addiction.
            </p>
          </div>
          {/* Studio */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold">Studio</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-background/80 hover:text-background transition-colors focus-visible:ring-2 focus-visible:underline outline-none" aria-label="About">About</a></li>
              <li><a href="#manifesto" className="text-background/80 hover:text-background transition-colors focus-visible:ring-2 focus-visible:underline outline-none" aria-label="Manifesto">Manifesto</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors focus-visible:ring-2 focus-visible:underline outline-none" aria-label="Blog">Blog</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors focus-visible:ring-2 focus-visible:underline outline-none" aria-label="Press">Press</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-background/80 hover:text-background transition-colors focus-visible:ring-2 focus-visible:underline outline-none" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-background/80 hover:text-background transition-colors focus-visible:ring-2 focus-visible:underline outline-none" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-background/80 hover:text-background transition-colors focus-visible:ring-2 focus-visible:underline outline-none" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-background/80 hover:text-background transition-colors focus-visible:ring-2 focus-visible:underline outline-none" aria-label="Mail"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © 2024 GlitchOwt Studio. Built with taste, not screens.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;