import styled from 'styled-components';
import { FLEX } from '../../common/styles';

export const Container = styled.div`
  max-width: 75%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 28px;
`;

export const Item = styled.div`
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.DUSTY_GRAY};
  border-radius: 8px;
  padding: 12px 12px 16px 12px;
  ${FLEX('flex-start')};
`;

export const IconContainer = styled.div`
  width: 54px;
  height: 40px;
  background-color: ${(p) => p.theme.WHITE};
`;

export const Icon = styled.img`
  height: 40px;
  object-fit: contain;
`;

export const Details = styled.div`
  text-align: left;
  margin-left: 8px;
`;

export const Name = styled.div`
  padding-bottom: 4px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const Description = styled.div`
  font-size: ${(p) => p.theme.SMALL};
  color: ${(p) => p.theme.DUSTY_GRAY};
`;

export const ConnectButton = styled.button`
  margin-top: 12px;
  padding: 6px 10px;
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.WHITE};
  background-color: ${(p) => p.theme.PORT_GORE};
  border-radius: 4px;
`;
