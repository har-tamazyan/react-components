import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const Container = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const InputTag = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 3px 14px;
  min-height: 48px;
  border-radius: 4px;
  border: 1px solid ${(p) => p.theme.ALTO};
  background-color: ${(p) => (p.disabled ? p.theme.ALTO : p.theme.WHITE_LILAC)};
  border-radius: 4px;
`;

export const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  outline-width: 0;
  min-height: 40px;
  background: transparent;
  font-size: ${(p) => p.theme.MEDIUM};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &::placeholder {
    color: ${(p) => (p.disabled ? p.theme.SILVER : p.theme.ALTO)};
  }
`;

export const Ul = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  width: 100%;
  align-items: flex-end;
`;

export const List = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  list-style: none;
  color: ${(p) => p.theme.SILVER_CHALICE};
  background-color: ${(p) => p.theme.WHITE};
  border: 1px solid ${(p) => p.theme.DOVE_GRAY};
  margin: 0 4px 4px 0;
  padding: 8px 28px 8px 12px;
  border-radius: 16px;
  font-size: ${(p) => p.theme.SMALL};
  height: 30px;
`;

export const CloseTag = styled.div`
  position: absolute;
  right: 8px;
  top: 1px;
  color: ${(p) => p.theme.DOVE_GRAY};
  font-size: ${(p) => p.theme.XX_LARGE};
  cursor: pointer;
`;

export const InputList = styled.li`
  background: none;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0;
  list-style-type: none;
`;
export const RequiredRedDot = styled.span`
  position: absolute;
  right: 8px;
  bottom: 20px;
  width: 6px;
  height: 6px;
  background-color: ${(p) => p.theme.BRICK_RED};
  vertical-align: middle;
  text-align: center;
`;

export const SuggestionContainer = styled.div``;

export const DropDownOptions = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  max-height: 260px;
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 0 0 5px 5px;
  box-shadow: 0px 6px 10px ${(p) => p.theme.BLACK_RGB_16};
  overflow-y: auto;
  z-index: 2;
  border: 1px solid ${(p) => p.theme.ALTO};
  border-top: 0;
`;

export const DropDownPlaceHolderOption = styled.div`
  padding: 10px 15px;
  ${FLEX(null, 'flex-start')};
  color: ${(p) => p.theme.DOVE_GRAY};
`;

export const DropDownOption = styled.div`
  padding: 16px;
  ${FLEX(null, 'flex-start')};
  cursor: pointer;

  > div {
    > span {
      font-weight: ${(p) => p.theme.REGULAR_FONT};
      opacity: 0.75;
    }
  }

  &:hover {
    background-color: ${(p) => p.theme.ATHENS_GRAY};
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  }

  ${(p) => p.isAddNew && css`
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  `};
`;

export const DropDownNoOption = styled.div`
  padding: 16px;
`;

export const ErrorWrapper = styled.div`
  font-size: ${(p) => p.theme.SMALL};
  color: ${(p) => p.theme.PUNCH};
  margin-top: 5px;
`;
