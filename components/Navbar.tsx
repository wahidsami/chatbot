
import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { LogoIcon, MenuIcon, XIcon, SunIcon, GlobeAltIcon } from './icons';
import { LanguageContext } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useContext(LanguageContext)!;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-300 hover:text-[#F36A10] ${isActive ? 'text-[#F36A10]' : 'text-[#0F2233]'}`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-2xl font-semibold transition-colors duration-300 hover:text-[#F36A10] ${isActive ? 'text-[#F36A10]' : 'text-gray-700'}`;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <LogoIcon className="h-8 w-8 text-[#F36A10]" />
          <span className="text-2xl font-bold text-[#0F2233]">Aivora</span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-8">
          {t.NAV_LINKS.map(link => (
            <NavLink key={link.label} to={link.href} className={navLinkClasses}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <SunIcon className="h-5 w-5" />
          </button>
           <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm font-semibold">
            <GlobeAltIcon className="h-5 w-5" />
            {language === 'en' ? 'AR' : 'EN'}
          </button>
          <Button href="#" variant="secondary">{t.common.bookDemo}</Button>
          <Button href="#" variant="primary" data-cta="try-free">{t.common.tryFree}</Button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
           <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm font-semibold">
            <GlobeAltIcon className="h-5 w-5" />
          </button>
          <button onClick={toggleMenu} aria-label="Open menu">
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-0 left-0 w-full bg-white shadow-xl p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="flex items-center gap-2">
                 <LogoIcon className="h-8 w-8 text-[#F36A10]" />
                 <span className="text-2xl font-bold text-[#0F2233]">Aivora</span>
              </Link>
              <button onClick={toggleMenu} aria-label="Close menu">
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-6">
              {t.NAV_LINKS.map(link => (
                <NavLink key={link.label} to={link.href} className={mobileNavLinkClasses} onClick={toggleMenu}>
                  {link.label}
                </NavLink>
              ))}
              <div className="flex flex-col gap-4 w-full mt-6">
                <Button href="#" variant="secondary" fullWidth>{t.common.bookDemo}</Button>
                <Button href="#" variant="primary" fullWidth data-cta="try-free">{t.common.tryFree}</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;