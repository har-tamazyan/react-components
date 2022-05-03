import styled from 'styled-components';

import { CARD_TITLE } from '../../common/styles';

const Container = styled.div`
  margin-top: 24px;
  padding: 16px 32px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 6px 6px 54px ${(p) => p.theme.BLACK_RGB_16};
  border-radius: 14px;
  min-height: 600px;
`;

const Title = styled.div`
  ${CARD_TITLE};
  padding-top: 30px;
`;

const TableFilterMyTasks = styled.div`
  > div {
    margin: 20px 0 24px;
  }
`;

export {
  Container,
  Title,
  TableFilterMyTasks,
};
