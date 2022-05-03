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


const emptyVertical = {
    name: '',
};
const VerticalModal = ({
    closeModal,
    editFormData,
    allData,
    setOrganisationData,
}) => {
    const [verticalsData, setVerticalsData] = useState(editFormData);
    const submitForm = (e) => {
        e.preventDefault();
        allData.verticals = verticalsData;
        setOrganisationData(allData);
        closeModal();
    };
    const removeRowHandler = (index) => {
        const functionDataCopy = cloneDeep(verticalsData);
        functionDataCopy.splice(index, 1);

        setVerticalsData(functionDataCopy);
    };

    const updateValues = useCallback((index) => (event) => {
        const value = event.target ? event.target.value : event;
        const tempData = cloneDeep(verticalsData);
        // eslint-disable-next-line no-unused-vars
        const dataIndex = tempData.findIndex((item, i) => i === index);
        if (dataIndex !== -1) {
            tempData[dataIndex].name = value;
            setVerticalsData([...tempData]);
        }
    });

    const addNewSubFunction = () => {
        setVerticalsData([...verticalsData, cloneDeep(emptyVertical)]);
    };

    return (
        <S.Container onSubmit={submitForm}>
            <S.Title>{'Edit Vertical'}</S.Title>
            <S.FormContainer>
                <S.FormFieldWrapper>
                    {verticalsData && verticalsData.map((item, index) => (
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
                                        alt='Delete Vertical'
                                    />
                                </S.DeleteIconContainer>}
                                {index === verticalsData.length - 1
                                    ? <S.AddIconContainer className={'sourcer_input_add_remove_icon'}>
                                        <img
                                            src={AddIcon}
                                            onClick={addNewSubFunction}
                                            alt='Add Vertical'
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

VerticalModal.propTypes = {
    isEditMode: PropTypes.bool,
    closeModal: PropTypes.func,
    editFormData: PropTypes.array,
    allData: PropTypes.object,
    setOrganisationData: PropTypes.func,
};

export default VerticalModal;
