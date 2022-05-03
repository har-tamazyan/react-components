import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';
import { COMMON_TITLE } from '../styles';

export const Container = styled.div`
  width: 100%;
`;

export const SalaryInfoItemContainer = styled.div`
  ${(p) => p.styles || ''}
`;

export const Heading = styled.div`
  ${COMMON_TITLE}
`;

export const SubHeading = styled.label`
  display: inline-block;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  margin-bottom: 4px;
`;

export const BaseLabel = styled(SubHeading)`
  margin-bottom: 8px;
  ${(p) => p.styles || ''}
`;

export const CTCInfoContainer = styled.div`
  border: 1px dashed ${(p) => p.theme.RHINO};
  border-radius: 5px;
  padding: 20px;
`;

export const DropInputContainer = styled.div`
  display: flex;
`;

export const InputContainerStyles = css`
  width: 100%;
`;

export const InputStyles = css`
  border-radius: 0;
  border-left: none;
  border-right: none;
`;

export const VestedStockValueInputStyles = css`
  border-radius: 0 5px 5px 0;
  border-left: none;
`;

export const LeftDropdownContainerStyles = css`
  max-width: 90px;
  input {
    display: none;
  }
`;

export const LeftDropdownStyles = css`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  &:-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

export const RightDropdownContainerStyles = css`
  max-width: 120px;

  input {
    display: none;
  }
`;

export const RightDropdownStyles = css`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  &:-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

export const AnnualCTCBreakupContainer = styled.div`
  ${FLEX()}
  & > div:first-child {
    margin-left: 30px;
  }
`;

export const AnnualCTCBreakup = styled.div`
  width: 100%;

  & > div {
    margin: 12px 0 16px;
  }
`;

export const ESOPsContainer = styled(AnnualCTCBreakupContainer)``;

export const ESOPsDetails = styled(AnnualCTCBreakup)`
`;

export const OfferDateContainer = styled.div`
  & > div {
    display: block;
  }
`;

export const PerksAndBenefitsContainer = styled(ESOPsContainer)``;

export const PerksAndBenefitsDetails = styled(ESOPsDetails)``;

export const VerticalLine = styled.div`
  width: 1px;
`;

export const HorizontalLine = styled.div`
  width: 30px;
  height: ${(p) => p.height || '30px'};
  border-bottom: 1px dashed ${(p) => p.theme.WATERLOO};
  border-left: 1px dashed ${(p) => p.theme.WATERLOO};
`;

export const CTCBreakUpHeading = styled.h4`
  color: ${(p) => p.theme.SCORPION};
  font-size: ${(p) => p.theme.MEDIUM};
  margin-top: 24px;
`;
