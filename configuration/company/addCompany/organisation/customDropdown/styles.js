
import styled from 'styled-components';
import CustomSkillDropdown from 'src/web/ats/components/common/customSkillDropdown';

export const DepartmentsDropdown = styled(CustomSkillDropdown)`
   height: 44px;
   > div {
    font-size: ${(p) => p.theme.MEDIUM};
    margin-bottom: 10px;
  }
 
`;

