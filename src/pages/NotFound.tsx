import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Glitchy404 } from "@/components/ui/glitchy-404-1";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Glitchy404 width={800} height={232} color="#2d5a2d" />
      <div className="text-center mt-8">
        <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
        <a href="/" className="text-primary hover:underline font-semibold focus-visible:ring-2 focus-visible:underline outline-none" aria-label="Return to Home">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
