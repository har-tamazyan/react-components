import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, ModalTitle, ApplyButton, ModalInner, ButtonSection, TextButton,
} from './styles';

const FilterModal = ({
  modalTitle = 'Select Filter',
  filtersArray,
  buttonText = 'Apply Now',
  buttonCallback,
  closeModal,
}) => {
  const [updatedFilterStatus, setUpdatedFilterStatus] = React.useState([...filtersArray]);

  const selectFilter = (index) => () => {
    setUpdatedFilterStatus(updatedFilterStatus.map((_, i) => ({
      ..._,
      ...(index === i && { selected: !_.selected }),
    })));
  };

  const applyAndCloseModal = () => {
    buttonCallback(updatedFilterStatus);
    closeModal();
  };

  return (
    <Container>
      <ModalTitle>{modalTitle}</ModalTitle>
      <ModalInner>
        {updatedFilterStatus.length ? updatedFilterStatus.map((filter, index) => (
            <TextButton
              key={index}
              isSelected={filter.selected}
              onClick={selectFilter(index)}
            >
              <div>{filter.name || filter.key}</div>
              {filter.doc_count && (
                <span>({filter.doc_count})</span>
              )}
            </TextButton>)) : null
        }
      </ModalInner>
      <ButtonSection>
        <ApplyButton onClick={applyAndCloseModal}>
          {buttonText}
        </ApplyButton>
      </ButtonSection>
    </Container>
  );
};

FilterModal.propTypes = {
  modalTitle: PropTypes.string,
  filtersArray: PropTypes.array,
  buttonText: PropTypes.string,
  buttonCallback: PropTypes.func,
  closeModal: PropTypes.func,
};

export default FilterModal;
