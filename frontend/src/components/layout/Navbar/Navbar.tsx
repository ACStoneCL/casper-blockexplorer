import React, { useState, useEffect } from 'react';
import { useAppSelector, getIsFirstVisit } from 'src/store';

import { useTranslation } from 'react-i18next';
import { useAppWidth } from 'src/hooks';
import { loadConfig } from 'src/utils';
import { NavButton } from '../../buttons/NavButton';
import { SearchForm } from '../Header/Partials';

import {
  LogoSearchFormWrapper,
  NavComponentsContainer,
  Nav,
  NavItemsContainer,
  DesktopNav,
  DesktopNavItemsContainer,
  DesktopNavItemLink,
  MobileNav,
  MobileNavItemsContainer,
  MobileNavItemLink,
} from './Navbar.styled';

import { OpenMenuIcon, CloseMenuIcon } from '../../icons';
import { ConfigurableLogo, DefaultNavLogo } from '../LogoComponents';

const navItems = [
  {
    title: 'home',
    path: '/',
    key: 'home',
  },
  {
    title: 'blocks',
    path: '/blocks',
    key: 'blocks',
  },
  {
    title: 'peers',
    path: '/peers',
    key: 'peers',
  },
];

export const Navbar: React.FC = () => {
  const isFirstVisit = useAppSelector(getIsFirstVisit);
  const [isOpened, setIsOpened] = useState(false);
  const { t } = useTranslation();
  const { logoUrl } = loadConfig();

  const { isMobile } = useAppWidth();

  useEffect(() => {
    const escKeyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (isOpened) {
          setIsOpened(false);
        }
      }
    };

    document.addEventListener('keydown', escKeyHandler);

    return () => {
      document.removeEventListener('keydown', escKeyHandler);
    };
  }, [isOpened]);

  const logo = logoUrl ? <ConfigurableLogo /> : <DefaultNavLogo />;

  const returnVisitDesktopNavDisplay = (
    <LogoSearchFormWrapper>
      {logo}
      <SearchForm />
    </LogoSearchFormWrapper>
  );

  return (
    <Nav data-testid="navigation" isFirstVisit={isFirstVisit}>
      {!isFirstVisit && !isMobile && returnVisitDesktopNavDisplay}
      <NavComponentsContainer>
        <NavButton
          type="button"
          onClick={() => setIsOpened(!isOpened)}
          color="transparent">
          {isOpened ? <CloseMenuIcon /> : <OpenMenuIcon />}
        </NavButton>
        <NavItemsContainer>
          {isOpened && (
            <MobileNav>
              <MobileNavItemsContainer>
                {navItems.map(({ path, title, key }) => {
                  return (
                    <li key={key}>
                      <MobileNavItemLink
                        to={path}
                        onClick={() => setIsOpened(false)}>
                        {t(title)}
                      </MobileNavItemLink>
                    </li>
                  );
                })}
              </MobileNavItemsContainer>
            </MobileNav>
          )}
          <DesktopNav>
            <DesktopNavItemsContainer>
              {navItems.map(({ path, title, key }) => {
                return (
                  <li key={key}>
                    <DesktopNavItemLink to={path}>
                      {t(title)}
                    </DesktopNavItemLink>
                  </li>
                );
              })}
            </DesktopNavItemsContainer>
          </DesktopNav>
        </NavItemsContainer>
      </NavComponentsContainer>
    </Nav>
  );
};
