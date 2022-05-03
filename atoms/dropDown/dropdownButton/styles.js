import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

const TextButton = styled.button`
  display: inline-flex;
  padding: 10px 16px;
  color: ${(p) => p.theme.SHARK};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  white-space: nowrap;
  align-items: center;
  border: 1px solid transparent;
  > svg {
    margin-left: 10px;
    width: 12px;
    vertical-align: top;
  }

  > img {
    width: 12px;
    vertical-align: top;
  }

  > span {
    white-space: nowrap;
  }
`;

export const SelectOptionsContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 36px;
  right: 0;
  width: 210px;
  border-radius: 0 0 8px 8px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0 13px 61px ${(p) => p.theme.BLACK_RGB_16};
  box-shadow: 0 6px 10px ${(p) => p.theme.BLACK_RGB_16};
  border: 1px solid ${(p) => p.theme.BLACK_RGB_4};
`;

export const Checkbox = styled.span`
  width: 14px;
  height: 14px;
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.DOVE_GRAY};
  border-radius: 15%;
  margin-right: 10px;
  ${FLEX('center', 'center')};

  > img {
    width: 8px;
  }
`;

export const SelectOption = styled.div`
  padding: 12px;
  ${FLEX('center')};
  cursor: pointer;
  border-bottom: 1px solid ${(p) => p.theme.BLACK_RGB_4};

  > p {
    font-size: ${(p) => p.theme.SMALL};
  }

  &:hover {
    background-color: ${(p) => p.theme.CATSKILL_WHITE};
  }
`;

export const DropdownButtonContainer = styled.div`
  position: relative;
  width: 210px;
`;


export const DropdownButton = styled(TextButton)`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.BLACK_RGB_4};
  background-color: ${(p) => p.theme.WHISPER};
  ${FLEX('center', 'space-between')};
`;
