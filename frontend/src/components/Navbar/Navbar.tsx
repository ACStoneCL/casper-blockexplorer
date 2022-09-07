import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export interface NavProps {
  readonly title: string;
  readonly path: string;
}

const navItems = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Deploys',
    path: '/deploys',
  },
  {
    title: 'Blocks',
    path: '/blocks',
  },
  {
    title: 'Accounts',
    path: '/accounts',
  },
];

// accepts arr of item objects
export const Navbar: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <nav className="fixed z-10 w-full py-10 pb-10 pr-10 lg:pt-20 lg:pr-56 bg-[#181B38]">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-row justify-end lg:justify-between">
          <button
            type="button"
            className="lg:hidden bg-transparent border-none"
            onClick={() => setIsOpened(!isOpened)}>
            {isOpened ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-24 h-24">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-24 h-24">
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
        <button
          type="button"
          onClick={() => setIsOpened(!isOpened)}
          className={`bg-transparent border-none lg:flex lg:space-x-12 lg:flex-row lg:w-auto ${
            isOpened ? 'flex flex-col text-center mt-10 lg:mt-0' : 'hidden'
          }`}>
          {navItems.map((item, index) => {
            return (
              <Link
                to={item.path}
                className="text-white py-3 lg:py-0"
                key={index}>
                {item.title}
              </Link>
            );
          })}
        </button>
      </div>
    </nav>
  );
};
