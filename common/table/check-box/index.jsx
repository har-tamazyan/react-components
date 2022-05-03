import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
export const CheckBox = ({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <input type="checkbox" ref={resolvedRef} {...rest} />;
};

export const IndeterminateCheckbox = React.forwardRef(CheckBox);

export const CheckBoxHeaderComponent = ({ getToggleAllRowsSelectedProps }) => (
  <div className="checkbox-header">
    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
  </div>
);

CheckBoxHeaderComponent.propTypes = {
  getToggleAllRowsSelectedProps: PropTypes.func,
};

export const CheckBoxRowComponent = ({ row }) => (
  <div className="checkbox-row">
    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
  </div>
);

CheckBoxRowComponent.propTypes = {
  row: PropTypes.object,
};
