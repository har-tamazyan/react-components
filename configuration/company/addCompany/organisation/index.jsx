/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { connect } from 'react-redux';
import { InnerContainer } from 'src/web/ats/components/configuration/company/styles.js';
import DeleteIcon from 'src/web/ats/assets/icons/delete-icon.svg';
import { cloneDeep } from 'lodash';
import { protectedRoutes } from 'src/web/ats/routes';
import { useHistory, withRouter } from 'react-router-dom';
import AddIcon from 'src/web/ats/assets/icons/add-icon.svg';
import { companyActions } from 'src/web/ats/redux/modules/company/creator';
import companySelectors from 'web/ats/redux/modules/company/selector';
import EditIcon from 'src/web/ats/assets/icons/edit_icon_pen_light.svg';
import Modal from 'src/web/ats/components/atoms/modal';
import DropDown from './customDropdown/DropDown';
import SubFunction from './EditSubFunctions';
import Department from './EditDepartment';
import * as S from './styles';
import VerticalModal from './editVerticalModal';

const Organisation = ({
    location,
    creatOrganisation,
    organisation,
    companyDetails,
    setTabLocation,
}) => {
    const history = useHistory();
    const { mode } = qs.parse(location.search, { ignoreQueryPrefix: true });

    const emptyFunctionData = {
        job_sub_functions: [],
        name: '',
    };

    const emptyOrganisation = {
        functions: [{
            job_sub_functions: [],
            name: '',
        }],
        departments: [],
        verticals: [],
    };

    const [organisationData, setOrganisationData] = useState({
        ...emptyOrganisation,
    });
    const [editPrompt, setEditPrompt] = useState(null);
    const [editVerticalModal, setEditVerticalModal] = useState(null);
    const { functions, verticals, departments } = organisationData;
    useEffect(() => {
        if (mode === 'edit' || mode === 'view') {
            setOrganisationData({
                functions: companyDetails?.functions,
                departments: companyDetails?.departments,
                verticals: companyDetails?.verticals,
            });
        }
    }, [companyDetails]);

    useEffect(() => {
        if (Object.keys(organisation).length > 0) {
            setOrganisationData({
                functions: organisation?.functions,
                departments: organisation?.departments,
                verticals: organisation?.verticals,
            });
        }
    }, [organisation]);


    const inputChangeHandler = useCallback((key, index) => (event) => {
        const value = event?.target ? event.target.value : event;
        const updateSelectedData = cloneDeep(organisationData);
        if (key === 'name') updateSelectedData.functions[index].name = value;
        setOrganisationData(updateSelectedData);
    }, [organisationData]);

    const handleSubFunctionInput = (key, index) => (event, selectedOption) => {
        const emptyArray = [];
        let value = event.target ? event.target.value : event;

        if (key === 'job_sub_functions') value = selectedOption;
        value.forEach((item) => {
            const obj = {
                name: item,
            };
            emptyArray.push(obj);
        });

        const updatedSelectedData = cloneDeep(organisationData);
        if (selectedOption.length > 0) {
            if (updatedSelectedData?.functions[index].job_sub_functions.length > 0) {
                updatedSelectedData?.functions[index].job_sub_functions
                    .splice(0, updatedSelectedData?.functions[index].job_sub_functions.length);
                updatedSelectedData?.functions[index].job_sub_functions.push(...emptyArray);
            } else {
                updatedSelectedData?.functions[index].job_sub_functions.push(...emptyArray);
            }
        }
        setOrganisationData(updatedSelectedData);
    };

    const departmentsDropDownHandler = (key) => (event, selectedOption) => {
        const emptyArray = [];

        let value = event.target ? event.target.value : event;
        if (key === 'departments') value = selectedOption;
        value.forEach((item) => {
            const obj = {
                name: item,
            };
            emptyArray.push(obj);
        });
        const updatedSelectedData = cloneDeep(organisationData);
        if (selectedOption.length > 0) {
            if (updatedSelectedData?.departments.length > 0) {
                updatedSelectedData?.departments.splice(0, updatedSelectedData?.departments.length);
                updatedSelectedData?.departments.push(...emptyArray);
            } else {
                updatedSelectedData?.departments.push(...emptyArray);
            }
        }
        setOrganisationData(updatedSelectedData);
    };

    const verticalsDropDownHandler = (key) => (event, selectedOption) => {
        const emptyArray = [];

        let value = event.target ? event.target.value : event;
        if (key === 'verticals') value = selectedOption;
        value.forEach((item) => {
            const obj = {
                name: item,
            };
            emptyArray.push(obj);
        });
        const updatedSelectedData = cloneDeep(organisationData);
        if (selectedOption.length > 0) {
            if (updatedSelectedData?.verticals.length > 0) {
                updatedSelectedData?.verticals.splice(0, updatedSelectedData?.verticals.length);
                updatedSelectedData?.verticals.push(...emptyArray);
            } else {
                updatedSelectedData?.verticals.push(...emptyArray);
            }
        }
        setOrganisationData(updatedSelectedData);
    };

    const removeRowHandler = (index) => {
        if (mode === 'view') return;
        const functionDataCopy = cloneDeep(organisationData);
        functionDataCopy.functions.splice(index, 1);

        setOrganisationData({ ...functionDataCopy });
    };

    const addNewRowHandler = () => {
        if (mode === 'view') return;
        setOrganisationData({
            ...organisationData,
            functions: [...functions, cloneDeep(emptyFunctionData)],
        });
    };

    const submitForm = (event) => {
        event.preventDefault();
        if (mode !== 'view') creatOrganisation(organisationData);
        history.push({ pathname: protectedRoutes.company('client_personnel'), search: location.search });
        setTabLocation({ tab2: true, tab3: true });
    };

    const promptTypes = {
        editSubfunction: () => (
            <SubFunction
                isEditMode={true}
                editFormData={editPrompt.data}
                closeModal={() => setEditPrompt(null)}
                allData={organisationData}
                setOrganisationData={setOrganisationData}
            />),
        editDepartment: () => (
            <Department
                isEditMode={true}
                editFormData={editPrompt.data}
                closeModal={() => setEditPrompt(null)}
                allData={organisationData}
                setOrganisationData={setOrganisationData}
            />),
    };

    const editVerticalTypes = {
        editVertical: () => (
            <VerticalModal
                isEditMode={true}
                editFormData={editVerticalModal.data}
                closeModal={() => setEditVerticalModal(null)}
                allData={organisationData}
                setOrganisationData={setOrganisationData}
            />),
    };

    return (
        <>
            <InnerContainer id='job-basicinfo-form' onSubmit={submitForm}>
                <S.OrganisationSubSection>
                    <S.Container >
                        <S.InputContainerList>
                            <S.SubContainer>
                                {functions && functions.map((item, index) => (
                                    <S.CustomDropdown key={index}>
                                        <div>
                                            <S.StyledInput
                                                name='name'
                                                label='Function'
                                                mode={mode}
                                                onChange={inputChangeHandler('name', index)}
                                                required={mode !== 'view'}
                                                value={item.name || ''}
                                                isDisabled={mode === 'view'}
                                                placeholder={'Enter Function'}
                                            />
                                        </div>
                                        <div>
                                            <S.SelectSubFunctionContainer>
                                                <S.DropdownWrapper>
                                                    <S.SelectTitle>
                                                        Sub-function(s)
                                                    </S.SelectTitle>
                                                    {mode === 'edit' && item?.id
                                                        ? <S.editWrapper>
                                                            <>
                                                                <S.EditIcon>
                                                                    <img
                                                                        className="edit-row-icon"
                                                                        src={EditIcon}
                                                                        onClick={() => setEditPrompt({ type: 'editSubfunction', data: item })}
                                                                        alt='edit'
                                                                    />
                                                                </S.EditIcon>
                                                                { /* eslint-disable max-len */}
                                                                {item.job_sub_functions.map((val, idx) => (
                                                                    <React.Fragment key={idx}>
                                                                        <S.SelectedMultiOptionChip
                                                                            role="presentation">
                                                                            <S.SelectedMultiOptionTextChip>
                                                                                { /* eslint-disable max-len */}
                                                                                {val.name || item}
                                                                            </S.SelectedMultiOptionTextChip>
                                                                        </S.SelectedMultiOptionChip>
                                                                    </React.Fragment>
                                                                ))}
                                                            </>
                                                        </S.editWrapper>
                                                        : <DropDown
                                                            disablePreSelectedValues={mode === 'view'}
                                                            // isDisabled={}
                                                            mode={mode}
                                                            isDisabled={mode === 'view'}
                                                            placeholder={'Enter Sub-function(s)'}
                                                            /* eslint-disable max-len */
                                                            onOptionSelect={handleSubFunctionInput('job_sub_functions', index)}
                                                            // eslint-disable-next-line no-unused-vars
                                                            selected={(item.job_sub_functions && item?.job_sub_functions.map((value) => value.name)) || ''}
                                                            required={mode !== 'view'}
                                                        />
                                                    }

                                                </S.DropdownWrapper>
                                                {mode !== 'view' && index !== 0
                                                    && <S.DeleteIconContainer>
                                                        <img
                                                            src={DeleteIcon}
                                                            onClick={() => removeRowHandler(index)}
                                                            alt='Delete Function'
                                                        />
                                                    </S.DeleteIconContainer>
                                                }

                                                {mode !== 'view' && index === functions.length - 1
                                                    ? <S.AddIconContainer className={'sourcer_input_add_remove_icon'}>
                                                        <img
                                                            src={AddIcon}
                                                            onClick={addNewRowHandler}
                                                            alt='Add Function'
                                                        />
                                                    </S.AddIconContainer> : null
                                                }

                                            </S.SelectSubFunctionContainer>
                                        </div>
                                    </S.CustomDropdown>
                                ))
                                }
                            </S.SubContainer>
                        </S.InputContainerList>
                    </S.Container>
                </S.OrganisationSubSection>
                <div>
                    <S.DepartmentsTitle>
                        Departments
                    </S.DepartmentsTitle>
                    {mode === 'edit' && departments
                        ? <S.editWrapper>
                            <>
                                <S.EditIcon>
                                    <img
                                        className="edit-row-icon"
                                        src={EditIcon}
                                        onClick={() => setEditPrompt({ type: 'editDepartment', data: departments })}
                                        alt='edit'
                                    />
                                </S.EditIcon>
                                { /* eslint-disable max-len */}
                                {departments && departments.map((val, idx) => (
                                    <React.Fragment key={idx}>
                                        <S.SelectedMultiOptionChip
                                            role="presentation">
                                            <S.SelectedMultiOptionTextChip>
                                                { /* eslint-disable max-len */}
                                                {val.name || ''}
                                            </S.SelectedMultiOptionTextChip>
                                        </S.SelectedMultiOptionChip>
                                    </React.Fragment>
                                ))}
                            </>
                        </S.editWrapper>
                        : <DropDown
                            isDisabled={mode === 'view'}
                            onOptionSelect={departmentsDropDownHandler('departments')}
                            mode={mode}
                            placeholder={'e.g. Engineering '}
                            // eslint-disable-next-line no-mixed-operators
                            selected={departments && departments.map((value) => value.name) || ''}
                            options={[
                                departments,
                            ]}
                            required={mode !== 'view'}
                        />
                    }

                </div>

                <div>
                    <S.DepartmentsTitle>
                        Teams/Verticals
                    </S.DepartmentsTitle>
                    {mode === 'edit' && verticals
                        ? <S.editWrapper>
                            <>
                                <S.EditIcon>
                                    <img
                                        className="edit-row-icon"
                                        src={EditIcon}
                                        onClick={() => setEditVerticalModal({ type: 'editVertical', data: verticals })}
                                        alt='edit'
                                    />
                                </S.EditIcon>
                                { /* eslint-disable max-len */}
                                {verticals && verticals.map((val, idx) => (
                                    <React.Fragment key={idx}>
                                        <S.SelectedMultiOptionChip
                                            role="presentation">
                                            <S.SelectedMultiOptionTextChip>
                                                { /* eslint-disable max-len */}
                                                {val.name || ''}
                                            </S.SelectedMultiOptionTextChip>
                                        </S.SelectedMultiOptionChip>
                                    </React.Fragment>
                                ))}
                            </>
                        </S.editWrapper>
                        : <DropDown
                            isDisabled={mode === 'view'}
                            mode={mode}
                            onOptionSelect={verticalsDropDownHandler('verticals')}
                            placeholder={'e.g. Engineering '}
                            // eslint-disable-next-line no-mixed-operators
                            selected={verticals && verticals.map((value) => value.name) || ''}

                            options={[
                                verticals,
                            ]}
                            required={mode !== 'view'}
                        />
                    }
                </div>
                <S.SubmitButtonContainer>
                    <S.SubmitButton
                        type='submit'
                    >
                        Continue
                    </S.SubmitButton>
                </S.SubmitButtonContainer>
            </InnerContainer>
            {editPrompt
                ? <Modal
                    showModal={Boolean(editPrompt)}
                    toggleModal={() => setEditPrompt(null)}
                    darkBackground={true}
                >
                    {promptTypes[editPrompt.type]
                        ? promptTypes[editPrompt.type]()
                        : null}
                </Modal>
                : null}
            {editVerticalModal
                ? <Modal
                    showModal={Boolean(editVerticalModal)}
                    toggleModal={() => setEditVerticalModal(null)}
                    darkBackground={true}
                >
                    {editVerticalTypes[editVerticalModal.type]
                        ? editVerticalTypes[editVerticalModal.type]()
                        : null}
                </Modal>
                : null}
        </>
    );
};

Organisation.propTypes = {
    creatOrganisation: PropTypes.func,
    organisation: PropTypes.object,
    companyDetails: PropTypes.object,
    location: PropTypes.object,
    setTabLocation: PropTypes.func,
};

const mapDispatchToProps = {
    creatOrganisation: companyActions.creatOrganisation,
    setTabLocation: companyActions.setTabLocation,
};

const mapStateToProps = ({ company }) => ({
    organisation: companySelectors.getOrganisation({ company }),
    companyDetails: companySelectors.companyDetails({ company }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Organisation));
