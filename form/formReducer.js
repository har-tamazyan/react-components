import { set, unset } from 'lodash';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_FORM_DATA': {
      const data = set(state.data, payload.key, payload.value);
      return {
        ...state,
        isPristine: false,
        data,
      };
    }
    case 'SET_FORM_VALIDITY':
      return {
        ...state,
        isPristine: false,
        isFormValid: payload.isValid,
        errors: payload.errors,
      };
    case 'DELETE_FORM_DATA': {
      const newData = state.data;
      unset(newData, payload);
      return {
        ...state,
        isPristine: false,
        data: newData,
      };
    }
    case 'RESET_FORM_DATA':
      return {
        ...state,
        isPristine: true,
        isFormValid: true,
        data: {},
      };
    case 'RELOAD_FORM':
      return {
        ...state,
        isPristine: true,
        isFormValid: true,
      };
    default:
      return state;
  }
};
export default reducer;
