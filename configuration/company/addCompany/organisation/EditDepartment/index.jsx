/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import React, {
    useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import Input from 'src/web/ats/components/atoms/input';
import { cloneDeep } from 'lodash';
import DeleteIcon from 'src/web/ats/assets/icons/delete-icon.svg';
import AddIcon from 'src/web/ats/assets/icons/add-icon.svg';
import * as S from './styles';


const emptyDepartment = {
    name: '',
};
const Department = ({
    closeModal,
    editFormData,
    allData,
    setOrganisationData,
}) => {
    const [department, setDepartment] = useState(editFormData);
    const submitForm = (e) => {
        e.preventDefault();
        allData.departments = department;
        setOrganisationData(allData);
        closeModal();
    };
    const removeRowHandler = (index) => {
        const functionDataCopy = cloneDeep(department);
        functionDataCopy.splice(index, 1);

        setDepartment(functionDataCopy);
    };

    const updateValues = useCallback((index) => (event) => {
        const value = event.target ? event.target.value : event;
        const tempData = cloneDeep(department);
        // eslint-disable-next-line no-unused-vars
        const dataIndex = tempData.findIndex((item, i) => i === index);
        if (dataIndex !== -1) {
            tempData[dataIndex].name = value;
            setDepartment([...tempData]);
        }
    });

    const addNewSubFunction = () => {
        setDepartment([...department, cloneDeep(emptyDepartment)]);
    };

    return (
        <S.Container onSubmit={submitForm}>
            <S.Title>{'Edit Department'}</S.Title>
            <S.FormContainer>
                <S.FormFieldWrapper>
                    {department && department.map((item, index) => (
                            <S.MainContainer key={index}>
                                <Input
                                    onChange={updateValues(index)}
                                    value={item.name || ''}
                                    required={true}
                                />
                                {index !== 0 && <S.DeleteIconContainer>
                                    <img
                                        src={DeleteIcon}
                                        onClick={() => removeRowHandler(index)}
                                        alt='Delete Sub Function'
                                    />
                                </S.DeleteIconContainer>}
                                {index === department.length - 1
                                    ? <S.AddIconContainer className={'sourcer_input_add_remove_icon'}>
                                        <img
                                            src={AddIcon}
                                            onClick={addNewSubFunction}
                                            alt='Add Sub Function'
                                        />
                                    </S.AddIconContainer> : null
                                }
                            </S.MainContainer>
                        ))}

                </S.FormFieldWrapper>
                <S.PromptButtons>
                    <S.ConfirmButton type={'submit'}> Confirm</S.ConfirmButton>
                    <S.PromptSecondaryButton onClick={closeModal}>Go back</S.PromptSecondaryButton>
                </S.PromptButtons>
            </S.FormContainer>
        </S.Container>
    );
};

Department.propTypes = {
    isEditMode: PropTypes.bool,
    closeModal: PropTypes.func,
    editFormData: PropTypes.object,
    allData: PropTypes.object,
    setOrganisationData: PropTypes.func,
};

export default Department;
