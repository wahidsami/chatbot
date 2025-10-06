
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon, LinkedInIcon, TwitterIcon, InstagramIcon } from './icons';
import { LanguageContext } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useContext(LanguageContext)!;

  return (
    <footer className="bg-[#0F2233] text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="md:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <LogoIcon className="h-8 w-8 text-[#F36A10]" />
              <span className="text-2xl font-bold text-white">Aivora</span>
            </Link>
            <p className="max-w-xs text-gray-400">
              {t.footer.description}
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><LinkedInIcon className="h-6 w-6" /></a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon className="h-6 w-6" /></a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon className="h-6 w-6" /></a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white tracking-wider uppercase mb-4">{t.footer.product}</h3>
            <ul className="space-y-2">
              {t.FOOTER_LINKS.product.map(link => (
                <li key={link.label}><Link to={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white tracking-wider uppercase mb-4">{t.footer.company}</h3>
            <ul className="space-y-2">
              {t.FOOTER_LINKS.company.map(link => (
                <li key={link.label}><Link to={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white tracking-wider uppercase mb-4">{t.footer.resources}</h3>
            <ul className="space-y-2">
              {t.FOOTER_LINKS.resources.map(link => (
                <li key={link.label}><Link to={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Aivora. {t.footer.rights}</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {t.FOOTER_LINKS.legal.map(link => (
                <Link key={link.label} to={link.href} className="hover:text-white transition-colors">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;