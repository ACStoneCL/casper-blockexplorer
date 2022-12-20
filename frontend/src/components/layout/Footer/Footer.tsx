import styled from '@emotion/styled';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { colors, fontWeight } from 'src/styled-theme';
import { useAppSelector, getNetworkStatus } from '../../../store';

export const Footer: React.FC = () => {
  const { api, build } = useAppSelector(getNetworkStatus);
  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <p>
        {t('casper-node-version')} {build}
      </p>
      <p>
        {t('api-version')} {api}
      </p>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  color: ${colors.cobaltBlue};
  font-size: clamp(0.9rem, 1.2vw, 1.4rem);
  font-weight: ${fontWeight.medium};
  padding-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
