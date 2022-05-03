import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SourcingManagement from 'src/web/ats/components/jobs/common/sourcingManagement';

import jobOverviewSelectors from 'src/web/ats/redux/modules/jobOverview/selector';
import { jobOverviewActions } from 'src/web/ats/redux/modules/jobOverview/creator';
import * as S from './styles';

const UpdateSourcingManagement = ({
}) => (
     <S.Container>
       <S.ActionContainer></S.ActionContainer>
        <SourcingManagement
        //   initialSourcersData={assignJobsData.sourcers}
        //   updateSourcersValues={updateSourcersValues}
        />
     </S.Container>
);

UpdateSourcingManagement.propTypes = {
  updateJob: PropTypes.func,
  jobDetails: PropTypes.object,
};

const mapStateToProps = ({ jobOverview }) => ({
  jobDetails: jobOverviewSelectors.getJobDetails({ jobOverview }),
});


const mapDispatchToProps = {
  updateJob: jobOverviewActions.updateJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSourcingManagement);
