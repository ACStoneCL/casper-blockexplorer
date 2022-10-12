import React from 'react';

import styled from '@emotion/styled';
import {
  IconH2Container,
  H2,
  PageLink,
  H3,
  H3Data,
} from './HomeComponents.styled';

import { ReactComponent as PeersIcon } from '../../assets/icons/peers-icon.svg';

interface PeersInfoProps {
  readonly currentPeers: string;
}

export const PeersInfo: React.FC<PeersInfoProps> = ({ currentPeers }) => (
  <PeersInfoDisplay>
    <PeersHeader>
      <IconH2Container>
        <PeersIcon />
        <H2>Peers</H2>
      </IconH2Container>
      <PageLink to="/peers">View all</PageLink>
    </PeersHeader>
    <PeersDetails>
      <H3>Currently online</H3>
      <H3Data>{currentPeers}</H3Data>
    </PeersDetails>
  </PeersInfoDisplay>
);

const PeersInfoDisplay = styled.section`
  box-shadow: 0px 0.125rem 0.438 rgba(127, 128, 149, 0.15);
  border-radius: 0.5rem;
  background: #ffffff;
  border: 0.063rem solid #e3e3e9;
  box-shadow: 0px 2px 7px rgba(127, 128, 149, 0.15);
  padding-bottom: 1.5rem;
  margin-bottom: 3.25rem;

  @media (min-width: 768px) {
    margin-bottom: 4.25rem;
    min-width: 44.5%;
  }

  @media (min-width: 1024px) {
    min-width: 45%;
    margin-bottom: 4rem;
  }
`;

const PeersHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.15rem 2rem;
`;

const PeersDetails = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  border-top: 0.094rem solid #f2f3f5;
  padding: 0 0;
  margin: 0 2rem;
`;
