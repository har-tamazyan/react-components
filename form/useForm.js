import { useReducer } from 'react';
import createUseContext from 'constate';
import { isEmpty, findLast, findIndex } from 'lodash';
import reducer from './formReducer';

const defaultState = {
  isPristine: true,
  isFormValid: true,
  data: {},
  errors: [],
};
const init = (initialData) => ({
  ...defaultState,
  data: {
    ...initialData,
  },
});
const useFormState = ({ initialData = {} }) => {
  const [formState, dispatch] = useReducer(reducer, initialData, init);
  const setFormData = (key, value) => {
    dispatch({
      type: 'SET_FORM_DATA',
      payload: {
        key,
        value,
      },
    });
  };
  const setFormValidity = (key, isFormValid, error = {}) => {
    const { isFormValid: oldIsFormValid, errors: oldErrors } = formState;
    const errorKeyIndex = findIndex(oldErrors, (err) => err[0] === key);
    const formErrors = [...oldErrors];
    if (errorKeyIndex >= 0) {
      formErrors.splice(errorKeyIndex, 1);
    }
    if (!isFormValid) {
      formErrors.push([key, error]);
    }
    dispatch({
      type: 'SET_FORM_VALIDITY',
      payload: {
        key,
        isValid: (isEmpty(formErrors) || oldIsFormValid) && isFormValid,
        errors: formErrors,
      },
    });
  };
  const getFormError = () => {
    const { errors } = formState;
    return findLast(errors, ([, errObject]) => !isEmpty(errObject)) || [];
  };
  const deleteFormData = (key) => {
    dispatch({
      type: 'DELETE_FORM_DATA',
      payload: key,
    });
  };
  const reloadForm = () => {
    dispatch({ type: 'RELOAD_FORM' });
  };
  const resetFormState = () => dispatch({ type: 'RESET_FORM_DATA' });
  return {
    setFormData,
    setFormValidity,
    getFormError,
    deleteFormData,
    resetFormState,
    formState,
    reloadForm,
  };
};
const useFormContext = createUseContext(useFormState);
export default useFormContext;
