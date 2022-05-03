import { FEATURE_FLAG } from 'src/config/features';

const useFeature = (type) => {
  if (!(FEATURE_FLAG[type] ?? null)) return false;
  return FEATURE_FLAG[type] ?? false;
};

export default useFeature;
