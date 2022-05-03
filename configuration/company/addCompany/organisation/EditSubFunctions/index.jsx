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


const emptySubFunction = {
    name: '',
};
const SubFunction = ({
    closeModal,
    editFormData,
    allData,
    setOrganisationData,
}) => {
    const [subFunctions, setSubFunctions] = useState(editFormData?.job_sub_functions);
    const submitForm = (e) => {
        e.preventDefault();
        const tempIndex = allData.functions.findIndex((item) => item.id === editFormData.id);
        if (tempIndex !== -1) {
            allData.functions[tempIndex].job_sub_functions = subFunctions;
        }
        setOrganisationData(allData);
        closeModal();
    };
    const removeRowHandler = (index) => {
        const functionDataCopy = cloneDeep(subFunctions);
        functionDataCopy.splice(index, 1);

        setSubFunctions(functionDataCopy);
    };

    const updateValues = useCallback((index) => (event) => {
        const value = event.target ? event.target.value : event;
        const tempData = cloneDeep(subFunctions);
        // eslint-disable-next-line no-unused-vars
        const dataIndex = tempData.findIndex((item, i) => i === index);
        if (dataIndex !== -1) {
            tempData[dataIndex].name = value;
            setSubFunctions([...tempData]);
        }
    });

    const addNewSubFunction = () => {
        setSubFunctions([...subFunctions, cloneDeep(emptySubFunction)]);
    };

    return (
        <S.Container onSubmit={submitForm}>
            <S.Title>{'Edit Sub Functions'}</S.Title>
            <S.SubTitle>{`Function: ${editFormData.name}`}</S.SubTitle>
            <S.FormContainer>
                <S.FormFieldWrapper>
                    {subFunctions && subFunctions.map((item, index) => (
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
                                {index === subFunctions.length - 1
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

SubFunction.propTypes = {
    isEditMode: PropTypes.bool,
    closeModal: PropTypes.func,
    editFormData: PropTypes.object,
    allData: PropTypes.object,
    setOrganisationData: PropTypes.func,
};

export default SubFunction;
