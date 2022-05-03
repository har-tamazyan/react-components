import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const OverviewContainer = styled.div`
  position: relative;
  padding: 36px 72px 0 6px;
`;

export const MaxSalaryNoticeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 48px;
  grid-row-gap: 36px;
`;

export const BuyoutAndDiversityContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 48px;
  grid-row-gap: 36px;
`;

export const EnableVendorDedupLabel = styled.label`
  color: ${(p) => p.theme.TUNDORA};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  ${FLEX('center')};
  input{
    margin-right: 5px;
  }
  margin-bottom: 32px;
`;

export const SectionHeader = styled.h3`
  margin: 0 0 8px 0;
  padding: 0;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const SectionMetaLabel = styled.p`
  margin-bottom: 8px;
  color: ${(p) => p.theme.TUNDORA};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const InputContainerList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 48px;
  grid-row-gap: 36px;
`;

export const TargetOfferDateAndLocation = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 48px;
  grid-row-gap: 36px;
`;

export const SecondSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 36px;
`;

export const EditAction = styled.div`
  position: absolute;
  top: -8px;
  right: -12px;
  border-radius: 4px;
  user-select: none;
  ${FLEX('center')};
  cursor: pointer;
`;

export const EditActionText = styled.div`
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.WATERLOO};
`;

export const EditActionIcon = styled.img`
  margin-right: 8px;
`;

export const EditJobCancel = styled.button`
  padding: 6px 10px;
  color: ${(p) => p.theme.ERROR};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  transition: background-color 160ms ease 0ms;
  border-radius: 4px;

  &:hover {
    background-color: ${(p) => `${p.theme.ERROR}1A`};
  }
`;

export const EditJobSave = styled(EditJobCancel)`
  margin-left: 12px;
  color: ${(p) => p.theme.WHITE};
  background: linear-gradient(180deg, ${(p) => p.theme.PRIMARY_COLOR_LIGHT} 0%, ${(p) => p.theme.PRIMARY_COLOR} 100%);

  &:hover {
    background-color: unset;
  }
`;

export const BaseLabel = styled.label`
  margin-bottom: 8px;
  display: inline-block;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;

  ${(p) => p.theme.XL_DESKTOP`
    margin-bottom: 6px;
  `}
`;

export const TwoColumnContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
`;

export const ExperienceRequirements = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 2fr 1fr;
  grid-column-gap: 10px;
`;

export const RoleSummaryContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  overflow-wrap: anywhere;
`;

export const Cities = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const DescriptionContainer = styled(RoleSummaryContainer)``;

export const RoleSummaryContent = styled.div`
  padding: 10px 15px;
  background-color: ${(p) => p.theme.ALTO};
  border: 1px solid ${(p) => p.theme.ALTO};
  border-radius: 4px;
  color: ${(p) => p.theme.WATERLOO};
  white-space: pre-wrap;
  line-height: 30px;

  p {
    margin: 0;
  }
  
  ol {
    margin: 0;
    padding-left: 15px;
  }

  ul {
    margin: 0;
    padding-left: 15px;
    list-style-type: disc;
  }
`;

export const DescriptionContent = styled(RoleSummaryContent)``;

export const QualificationBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 48px;
  grid-row-gap: 36px;
  margin-bottom: 10px;
  padding:25px;
  box-shadow: 1px 2px 2px ${(p) => p.theme.BOX_SHADOW};
  border: 1px solid #F5F5FA;
  border-radius: 6px;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;
