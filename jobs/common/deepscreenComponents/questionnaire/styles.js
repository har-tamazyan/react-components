import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const Container = styled.div`
  padding: 24px 36px;
  width: 1024px;
  min-height: 576px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.WHITE};
`;

export const SubContainer = styled.div`
  padding-bottom: 5%;
`;

export const Actions = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 12px 36px;
  width: 100%;
  height: 64px;
  border-radius: 0 0 8px 8px;
  ${FLEX('center', 'space-between')};
`;

export const PrimaryActionButton = styled.button`
  padding: 12px 16px;
  margin-right: 0;
  background-color: ${(p) => p.theme.PORT_GORE};
  color: ${(p) => p.theme.WHITE};
  border-radius: 4px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const SecondaryActionButton = styled(PrimaryActionButton)`
  margin-right: 20px;
  margin-left: auto;
  background-color: ${(p) => p.theme.WHITE};
  color: ${(p) => p.theme.PORT_GORE};
  border: 1px solid ${(p) => p.theme.PORT_GORE};
`;

export const NoQuestionsInQuestionnaire = styled.div`
 text-align: center;
 padding: 30px;
 font-size: ${(p) => p.theme.LARGE};
`;

export const QuestionnaireUpdateSuccessContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  background-color: ${(p) => p.theme.WHITE};
  & > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 60px;
  }
  & > img {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
`;

export const QuestionnaireUpdateSuccessImage = styled.div`
  > img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const QuestionnaireUpdateSuccessMessage = styled.p`
  font-size: ${(p) => p.theme.XX_LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.PORT_GORE_LIGHT};
  padding-left: 20px;
`;
