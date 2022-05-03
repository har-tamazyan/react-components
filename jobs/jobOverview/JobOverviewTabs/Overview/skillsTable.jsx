import React from 'react';
import PropTypes from 'prop-types';

import Table from 'src/web/ats/components/common/table';
import { Container, TableStyles } from './skillTableStyled';

const columnNames = [
  {
    Header: 'PRIORITY',
    accessor: 'priority',
    width: 60,
    type: 'priority',
  },
  {
    Header: 'SKILL(S)',
    accessor: 'skill',
  },
  {
    Header: 'YRS OF RELEVANT EXP.',
    accessor: 'relevant_experience',
  },
  {
    Header: 'TYPE OF EXPERIENCE',
    accessor: 'type_of_experience',
  },
];

const SkillsTable = ({
  skills,
  skillsTotal,
}) => {
  const fetchData = React.useCallback(() => {}, []);

  return (
    <Container>
      <TableStyles>
        <Table
          height={'xxs'}
          width={100}
          type='sources_skills'
          columns={columnNames}
          data={skills}
          fetchData={fetchData}
          totalCount={skillsTotal}
        />
      </TableStyles>
    </Container>
  );
};

SkillsTable.propTypes = {
  skills: PropTypes.array,
  skillsTotal: PropTypes.number,
  editSkillCallback: PropTypes.func,
  deleteSkillCallback: PropTypes.func,
};

export default SkillsTable;
