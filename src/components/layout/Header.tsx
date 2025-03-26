
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Home, Phone } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-glass border-b border-border">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-foreground">DocSchedule</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" active={isActive('/')}>
              <Home className="w-4 h-4 mr-2" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/doctors" active={isActive('/doctors')}>
              <Phone className="w-4 h-4 mr-2" />
              <span>Find Doctors</span>
            </NavLink>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="button-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`relative flex items-center px-1 py-2 text-sm font-medium ${
        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

export default Header;
