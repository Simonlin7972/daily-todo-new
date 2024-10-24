import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from "./language-toggle";
import { ModeToggle } from "./mode-toggle";
import { MobileMenu } from "./MobileMenu";
import { Link, useLocation } from 'react-router-dom';

interface TopNavBarProps {
  currentTime: string;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({ currentTime }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="relative flex h-16 items-center px-4">
        {/* App Title */}
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <span className="font-['Pacifico'] text-2xl font-bold text-primary whitespace-nowrap">{t('appTitle')}</span>
        </Link>
        
        {/* Navigation Tabs */}
        <nav className="mr-auto">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                }`}
              >
                {t('todoList')}
              </Link>
            </li>
            <li>
              <Link
                to="/daily-review"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/daily-review') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                }`}
              >
                {t('dailyReview')}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right side elements: Time, Language Toggle, Mode Toggle, Mobile Menu */}
        <div className="ml-auto flex items-center space-x-4">
          <span className="text-sm hidden md:inline">{currentTime}</span>
          <div className="hidden md:flex items-center space-x-2">
            <LanguageToggle />
            <ModeToggle />
          </div>
          <MobileMenu currentTime={currentTime} />
        </div>
      </div>
    </header>
  );
};
