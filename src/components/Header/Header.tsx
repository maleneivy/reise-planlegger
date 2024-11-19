'use client';

import { useState } from 'react';

/**
 * Header-komponenten for Reise-Planlegger-applikasjonen.
 * Viser en logo og en navigasjonsmeny med en responsiv hamburgermeny for mobilvisning.
 *
 * @param props - Props som sendes til Header-komponenten.
 * @param props.title - Tittelen som vises i headeren.
 * @param props.links - En liste med navigasjonslenker som vises i headeren.
 */

interface NavLink {
  href: string;
  label: string;
}

interface HeaderProps {
  title: string;
  links: NavLink[];
}

export default function Header({
  title,
  links,
}: HeaderProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-green-800 text-white p-4 sm:flex sm:justify-between">
      <div className="flex items-center justify-between">
        <a href="/" className="text-2xl font-bold active:underline">
          {title}
        </a>
        {/* Hamburger Button */}
        <button
          className="sm:hidden flex items-center justify-center w-10 h-10 hover:bg-green-700 rounded"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {/* Viser ☰ hvis menyen er lukket, og X hvis menyen er åpen */}
          {isOpen ? (
            <span className="text-2xl font-bold">X</span>
          ) : (
            <span className="text-2xl font-bold">☰</span>
          )}
        </button>
      </div>

      {/* Dropdown Menu */}
      <nav
        className={`${
          isOpen ? 'block' : 'hidden'
        } sm:flex sm:flex-row sm:items-center sm:justify-end sm:gap-4 mt-6 mb-4`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex justify-center px-4 py-2 hover:bg-green-700 rounded"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
