import styled from '@emotion/styled';
import React from 'react';
import { colors, fontWeight } from '../../../styled-theme';
import { useAppSelector, getNetworkStatus } from '../../../store';

export const Footer: React.FC = () => {
  const { api, build } = useAppSelector(getNetworkStatus);

  return (
    <FooterWrapper>
      <p>Casper Node version: {build}</p>
      <p>API version: {api}</p>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  color: ${colors.cobaltBlue};
  font-size: clamp(0.9rem, 1.2vw, 1.4rem);
  font-weight: ${fontWeight.medium};
  line-height: 1.5;
  padding: 3.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
