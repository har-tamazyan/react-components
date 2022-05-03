/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import { getApiWithResponseObject, getAuthToken } from 'src/config/utils';
import { RESPONSE_CODES, CATEGORY_USERS } from 'src/config/definitions';
import API_END_POINTS from 'src/web/ats/config/integrations';
import { API_BASE_URL } from 'src/config/env';
import DeleteIcon from 'src/web/ats/assets/icons/delete-icon.svg';
import AddIcon from 'src/web/ats/assets/icons/add-icon.svg';
import { LightText } from 'src/web/ats/components/common/styles';
import sessionSelectors from 'web/ats/redux/modules/session/selector';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import { categoriesActions } from 'src/web/ats/redux/modules/category/creator';
import * as S from './styles';

const emptySourcerData = {
  id: '',
  sourcing_manager: [],
  name: '',
};

const CategoryForm = ({
  isEditMode,
  editFormData,
  createCategory,
  updateCategory,
  closeAddRecruiter,
  initialSourcersData = [],
  updateSourcersValues,
  readOnly = false,
  getRecruiterList,
}) => {
  const initialCategoryData = {
    name: '',
  };

  useEffect(() => {
    getRecruiterList();
  }, []);

  const [newCategory, setNewCategory] = useState(
    {
      ...initialCategoryData,
      ...(isEditMode && editFormData),
    },
  );
  const [sourcerOptionsData, setSourcerOptionsData] = useState([]);
  const fetchTalentSourcersData = async () => {
    const headers = { authorization: getAuthToken() };
    const response = await getApiWithResponseObject(
      `${API_BASE_URL()}${API_END_POINTS.getUsersList}?role=${CATEGORY_USERS.join(',')}`,
      headers,
    );
    if (response && response.status === RESPONSE_CODES.OK) {
      setSourcerOptionsData(response?.data.data ?? []);
    }
  };

  useEffect(() => {
    fetchTalentSourcersData();
  }, []);


  const sourcingManagersListLabelValueMap = useMemo(() => {
    const sourcingManager = sourcerOptionsData.map((sourcingManagerData) => ({
      node: (
        <div>{sourcingManagerData.name} <LightText>({sourcingManagerData.email})</LightText></div>
      ),
      label: `${sourcingManagerData.name}`,
      value: sourcingManagerData.id,
    }));
    return sourcingManager;
  }, [sourcerOptionsData]);

  const editSourcersData = () => {
    const subcategoriesData = [];
    editFormData?.subcategories.map((item) => {
      subcategoriesData.push(
        {
          id: item?.id,
          name: item?.name,
          sourcing_manager: item?.sourcing_manager.map((sourcingManager) => ({
            node: (
              <div>{sourcingManager?.name} <LightText>({sourcingManager?.email})</LightText></div>
            ),
            label: sourcingManager?.name,
            value: sourcingManager?.id,
          })),
        },
      );
      return (null);
    });
    return subcategoriesData;
  };
  const [selectedSourcersData, setSelectedSourcersData] = useState(
    isEditMode ? editSourcersData()
      : initialSourcersData.length > 0 ? initialSourcersData : [emptySourcerData],
  );

  const updateCandidateValues = useCallback((key, index) => (event) => {
    const resetKey = null;
    const resetValue = null;
    const value = event?.target ? event.target.value : event;

    setNewCategory(
      { ...newCategory, ...{ [key]: value, ...(resetKey && { [resetKey]: resetValue }) } },
    );

    const updatedSelectedSourcersData = cloneDeep(selectedSourcersData);
    if (key === 'sub_category') updatedSelectedSourcersData[index].name = value;
    setSelectedSourcersData(updatedSelectedSourcersData);
    if (updateSourcersValues) updateSourcersValues(updatedSelectedSourcersData);
  }, [selectedSourcersData]);

  const handleSourcerInput = (key, index) => (_, selectedOption) => {
    const updatedSelectedSourcersData = cloneDeep(selectedSourcersData);
    if (selectedOption.length > 0 && typeof selectedOption[0] === 'object') {
      if (key === 'sourcing_manager') updatedSelectedSourcersData[index].sourcing_manager = selectedOption;
    } else {
      const filter = updatedSelectedSourcersData[0].sourcing_manager
        .filter((item) => selectedOption.includes(item.value));
      if (key === 'sourcing_manager') updatedSelectedSourcersData[index].sourcing_manager = filter;
    }
    setSelectedSourcersData(updatedSelectedSourcersData);
    if (updateSourcersValues) updateSourcersValues(updatedSelectedSourcersData);
  };

  const addSourcerRow = () => {
    setSelectedSourcersData([...selectedSourcersData, cloneDeep(emptySourcerData)]);
  };

  const removeSourcerRow = (index) => {
    const sourcersDataCopy = cloneDeep(selectedSourcersData);
    if (index === 0 && sourcersDataCopy.length === 1) {
      setSelectedSourcersData([cloneDeep(emptySourcerData)]);
      if (updateSourcersValues) updateSourcersValues([]);
      return;
    }
    sourcersDataCopy.splice(index, 1);
    setSelectedSourcersData([...sourcersDataCopy]);
    if (updateSourcersValues) updateSourcersValues([...sourcersDataCopy]);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const subcategoriesData = [];
    selectedSourcersData.map(
      (item) => {
        if (item.id) {
          return subcategoriesData.push({
            id: item.id,
            name: item.name,
            sourcing_manager: item.sourcing_manager.map((val) => val.value),
          });
        }
         return subcategoriesData.push(
            {
              name: item.name,
              sourcing_manager: item.sourcing_manager.map((val) => val.value),
            },
          );
      },
    );
    const constructedNewCategoryData = {
      name: newCategory.name,
      subcategories: subcategoriesData,
    };
    if (isEditMode ? await updateCategory(constructedNewCategoryData, editFormData.id)
      : await createCategory(constructedNewCategoryData));

    closeAddRecruiter();
  };

  if (readOnly) {
    return (<S.ViewModeContainer>
      <S.SourcingManageHeading>Role Family</S.SourcingManageHeading>
      <S.SourcingManageHeading>Sourcing Manager(s)</S.SourcingManageHeading>
      {selectedSourcersData.map((sourcerData, index) => (<React.Fragment key={`sourcer-view-${index}`}>
        <S.SourcerDetails>
          {(sourcerOptionsData.find((_) => _.id === sourcerData.user_id) || {}).name}
        </S.SourcerDetails>
        <S.SourcerDetails>{(sourcerData.sourcing_manager.label || []).join(', ')}</S.SourcerDetails>
      </React.Fragment>))}
    </S.ViewModeContainer>);
  }

  return (
    <S.Container onSubmit={submitForm}>
      <S.Title>{`${isEditMode ? 'Edit' : 'Add New'} Category`}</S.Title>
      <S.FormContainer>
        <S.FormFieldWrapper>
          <S.InputGroupWrapper>
            <S.InputContainerList>
              <S.StyledInput
                label='Category Name'
                value={newCategory.name || ''}
                onChange={updateCandidateValues('name')}
                required={true}
              />
            </S.InputContainerList>
            <S.InputContainerList>
              <S.SubContainer>
                {selectedSourcersData.length > 0 ? (
                  selectedSourcersData.map((sourcerData, index) => (
                    <S.CustomDropdown key={`sourcer-modify-${index}`}>
                      <div>
                        <S.StyledInput
                          label='Role Family'
                          value={sourcerData.name || ''}
                          onChange={updateCandidateValues('sub_category', index)}
                          required={true}
                        />
                      </div>
                      <div>
                        <S.SelectSourcingChannelContainer>
                          <S.DropdownWrapper className={'sourcer_input_wrapper'}>
                            <S.DropdownTitle>Sourcing Manager</S.DropdownTitle>
                            <DropDown
                              options={sourcingManagersListLabelValueMap || []}
                              onOptionSelect={handleSourcerInput('sourcing_manager', index)}
                              required={Boolean(sourcerData.name)}
                              selected={sourcerData?.sourcing_manager || ''}
                              isMultiSelect={true}
                            />
                          </S.DropdownWrapper>
                          <S.DeleteIconContainer className={'sourcer_input_add_remove_icon'}>
                            <img
                              src={DeleteIcon}
                              alt='Delete Talent Scout'
                              onClick={() => removeSourcerRow(index)}
                            />
                          </S.DeleteIconContainer>
                          {index === selectedSourcersData.length - 1 ? <S.AddIconContainer className={'sourcer_input_add_remove_icon'}>
                            <img
                              src={AddIcon}
                              onClick={addSourcerRow}
                              alt='Add Talent Scout'
                            />
                          </S.AddIconContainer> : null}
                        </S.SelectSourcingChannelContainer>
                      </div>
                    </S.CustomDropdown>))
                ) : null}
              </S.SubContainer>
            </S.InputContainerList>
          </S.InputGroupWrapper>
        </S.FormFieldWrapper>
        <S.PromptButtons>
          <S.ConfirmButton type={'submit'}> Confirm</S.ConfirmButton>
          <S.PromptSecondaryButton onClick={closeAddRecruiter}>Go back</S.PromptSecondaryButton>
        </S.PromptButtons>
      </S.FormContainer>
    </S.Container>
  );
};

CategoryForm.propTypes = {
  isEditMode: PropTypes.bool,
  editFormData: PropTypes.object,
  createCategory: PropTypes.func,
  updateCategory: PropTypes.func,
  closeAddRecruiter: PropTypes.func,
  initialSourcersData: PropTypes.array,
  updateSourcersValues: PropTypes.func,
  readOnly: PropTypes.bool,
  sourcingManagers: PropTypes.array,
  getRecruiterList: PropTypes.func,
};

const mapDispatchToProps = {
  createCategory: categoriesActions.createCategory,
  updateCategory: categoriesActions.updateCategory,
  getRecruiterList: sessionActions.getRecruiterList,
};

const mapStateToProps = ({ session }) => ({
  sourcingManagers: sessionSelectors.getJobSourceringManagersList({ session }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
