import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { teamsActions } from 'src/web/ats/redux/modules/teams/creator';
import teamsSelectors from 'src/web/ats/redux/modules/teams/selector.js';
import agenciesSelectors from 'src/web/ats/redux/modules/agencies/selector';
import TagTextDropDown from 'src/web/ats/components/atoms/dropDown/v2/index.js';
import InputTagText from 'src/web/ats/components/atoms/input/inputTagText';
import * as S from './styles';

const VendorForm = ({
  isEditMode, editFormData,
  engagementTypeOptions,
  fetchEngagementTypeOptions,
  createVendor,
  closeAddVendor,
}) => {
  const initialNewVendorData = {
    name: '',
    profile_validity_period: '',
    engagement_type: [],
    email_domain: [],
  };
  const [newVendor, setNewVendor] = useState(
    {
      ...initialNewVendorData,
      ...(isEditMode && editFormData),
    },
  );
  useEffect(() => fetchEngagementTypeOptions(), []);

  const engagementTypeMapped = useMemo(() => engagementTypeOptions.map((item) => ({
    label: item.name,
    value: item.id,
  })), [engagementTypeOptions]);


  const updateAgencyValues = (key) => (event, selectedOption = null) => {
    let value = event?.target ? event.target.value : event;
    if (key === 'engagement_type') {
      value = engagementTypeMapped
        .filter((item) => event.includes(item.label))
        .map((item) => item.value);
    }
    if (key === 'email_domain') {
      value = selectedOption;
    }
    if (key === 'profile_validity_period') {
      value = parseInt(value, 10);
    }
    setNewVendor(
      { ...newVendor, ...{ [key]: value } },
    );
  };


  const submitForm = async (e) => {
    e.preventDefault();
    const constructedNewVendorData = {
      ...newVendor,
    };
    await createVendor(constructedNewVendorData);
    closeAddVendor();
  };

  return (
    <S.Container onSubmit={submitForm}>
      <S.HeaderContainer>
        <S.Title>{isEditMode ? 'Edit' : 'Add'} Vendor</S.Title>
        <S.CloseIcon
          onClick={closeAddVendor}
        >&times;</S.CloseIcon>
      </S.HeaderContainer>
      <S.FormContainer>
        <S.InputContainerList>
          <div>
            <S.StyledInput
              label='Vendor Agency'
              placeholder="eg. Quesscorp"
              value={newVendor.name || ''}
              onChange={updateAgencyValues('name')}
              required
            />
          </div>
          <div>
            <S.DropdownTitle>Possible Engagement Types</S.DropdownTitle>
            <TagTextDropDown
              multiCheckbox
              options={engagementTypeMapped}
              name="engagement_type"
              selected={[]}
              onOptionSelect={updateAgencyValues('engagement_type')}
              isSearchable={false}
              isMultiSelect={true}
              customPlaceholder={true}
              showIndicator={true}
              required
              redDotRequired
            />
          </div>
          <div>
            <S.StyledInput
              type="number"
              label='Resume Validity Period'
              placeholder="eg. 90"
              value={newVendor.profile_validity_period || ''}
              onChange={updateAgencyValues('profile_validity_period')}
              required
            />
          </div>
          <div>
            <InputTagText
              label="Email Domain"
              name="email_domain"
              placeholder="eg. quesscorp.in"
              required
              onChange={(value) => updateAgencyValues('email_domain')(null, value)} />
          </div>
        </S.InputContainerList>
        <S.ActionContainer>
          <div/>
          <S.ConfirmButton type={'submit'} >Confirm</S.ConfirmButton>
        </S.ActionContainer>
      </S.FormContainer>
    </S.Container>
  );
};

VendorForm.propTypes = {
  isEditMode: PropTypes.bool,
  editFormData: PropTypes.object,
  createVendor: PropTypes.func,
  closeAddVendor: PropTypes.func,
  fetchEngagementTypeOptions: PropTypes.func,
  engagementTypeOptions: PropTypes.array,
};

const mapStateToProps = ({ agencies, teams }) => ({
  agencies: agenciesSelectors.getAgencies({ agencies }),
  engagementTypeOptions: teamsSelectors.engagementTypeOptions({ teams }),
});

const mapDispatchToProps = {
  createVendor: teamsActions.createVendorAgency,
  fetchEngagementTypeOptions: teamsActions.fetchEngagementTypeOptions,
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorForm);
