import styled from '@emotion/styled';

export const DetailDataLabel = styled.h3`
  font-weight: 400;
  font-size: 0.625rem;
  color: #64748b;
`;

export const DetailDataWrapper = styled.div``;

interface DetailDataListProps {
  width?: string;
}

export const DetailDataList = styled.ul<DetailDataListProps>`
  display: grid;
  gap: 2.5rem;
  width: ${({ width }) => width ?? 'inherit'};
`;

export const DetailDataValue = styled.p`
  font-size: 1.5rem;
  color: black;
  font-weight: 500;
`;
