import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const Container = styled.div`
  padding: 24px 48px 24px 24px;
  background-color: ${(p) => p.theme.WHITE};
  width: 600px;
  border-radius: 8px;
`;

export const Title = styled.div`
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.SHARK};
  text-transform: capitalize;
`;

export const Description = styled.div`
  padding: 32px 0 0 16px;
  color: ${(p) => p.theme.SHARK};
  opacity: 0.75;
`;

export const DropdownList = styled.div`
  margin: 24px 0 0 16px;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 5fr 3fr;
  place-items: ${(p) => (p.isSkill ? 'flex-start' : 'flex-end')} ;
`;

export const CustomDropdown = styled.div`
  width: 100%;
  max-width: 100%;

  > div {
    height: 44px;

    ${(p) => p.theme.XL_DESKTOP`
      height: 40px;
    `};
  }

  > div > div {
    font-size: ${(p) => p.theme.MEDIUM};
    width: 312px;

    > p {
      max-width: 100%;

      & + input {
        min-width: calc(312px - 28px);
      }
    }

    > input {
      width: 100%;
    }
  }
`;

export const Actions = styled.div`
  margin-top: 32px;
  width: 100%;
  ${FLEX('center', 'center')};
`;

export const PrimaryButton = styled.button`
  padding: 8px 32px;
  border-radius: 6px;
  color: ${(p) => p.theme.WHITE};
  background-color: ${(p) => p.theme.WATERLOO};
  border: 1px solid ${(p) => p.theme.WATERLOO};
`;

export const SecondaryButton = styled(PrimaryButton)`
  margin-left: 12px;
  border-color: ${(p) => p.theme.DOVE_GRAY};
  background-color: unset;
  color: ${(p) => p.theme.DOVE_GRAY};
`;
