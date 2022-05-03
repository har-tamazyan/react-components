import React from 'react';
import { INTEGRATION_ITEMS } from './integrationItems';
import * as S from './styles';

const Integrations = () => (
  <S.Container>
    {INTEGRATION_ITEMS.map((item) => (
      <S.Item key={item.name}>
        <S.IconContainer>
          <S.Icon src={item.icon} alt={item.name} />
        </S.IconContainer>
        <S.Details>
          <S.Name>{item.name}</S.Name>
          <S.Description>{item.desc}</S.Description>
          <S.ConnectButton>Connect</S.ConnectButton>
        </S.Details>
      </S.Item>
    ))}
  </S.Container>
);

export default Integrations;
