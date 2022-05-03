import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import CopyIcon from 'src/web/ats/assets/icons/copy_item_3.svg';
import { partnersActions } from 'src/web/ats/redux/modules/syndicationPartner/creator';
import { copyToClipboard } from 'src/web/ats/components/common/utils';
import UsePartnerForm from './services';
import { validateUTMParams } from '../../../utils';
import * as S from './styles';

const initialNewPartnerData = {
  name: '',
  category: null,
  geographies: [],
  job_source_geography: null,
  specialization: [],
  slug: '',
  utm_tag: '',
};

const PartnerForm = ({
  config,
  addPartner,
  closeUserForm,
}) => {
  const readOnly = config.mode === 'view_partner';

  const [partnerData, setPartnerData] = useState(
    readOnly
      ? { ...config.data, specialization: config.data?.specialization.join(', ') }
      : { ...initialNewPartnerData, specialization: initialNewPartnerData.specialization.join(', ') },
  );
  const [geographiesData, setGeographiesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isUTMValid, setIsUTMValid] = useState(true);
  const [geographiesDataForAssignOpenJobs, setGeographiesDataForAssignOpenJobs] = useState([]);
  const { getGeographies, getCategories } = UsePartnerForm();

  const fetchGeographiesData = async () => {
    const response = await getGeographies();
    setGeographiesData(response);
  };

  const fetchCategoriesData = async () => {
    const response = await getCategories();
    setCategoriesData(response);
  };

  const geographyOptions = geographiesData?.map((_) => ({ label: _.name, value: _.id }));
  const categoryOptions = categoriesData.map((_) => ({ label: _.key, value: _.id }));

  const geographyOptionsForAssignOpenJobs = () => {
    const options = geographiesData?.map((_) => ({ label: _.name, value: _.id }));
    options.splice(1, 0, { label: 'Overseas', value: -1 });
    setGeographiesDataForAssignOpenJobs(options);
  };

  useEffect(() => {
    fetchGeographiesData();
    fetchCategoriesData();
  }, []);
  useEffect(() => { geographyOptionsForAssignOpenJobs(); }, [geographiesData]);

  const updateCandidateValues = (key) => (event, selectedOption = null) => {
    let value = event?.target ? event.target.value : event;

    if (key === 'category') value = selectedOption.value;
    if (key === 'job_source_geography') value = selectedOption.label;
    if (key === 'geographies') value = selectedOption.map((_) => _.value);
    if (key === 'utm_tag') setIsUTMValid(validateUTMParams(value));

    setPartnerData({
      ...partnerData,
      [key]: value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (partnerData.utm_tag && !isUTMValid) return;

    await addPartner({
      ...partnerData,
      specialization: partnerData.specialization.split(',').map((_) => _.trim()),
    });
    closeUserForm();
  };

  return (
    <S.Container onSubmit={submitForm}>
      <S.HeaderContainer>
        <S.Title>{`${readOnly ? 'View' : 'Add'} Syndication Partner`}</S.Title>
        <S.CloseIcon
          onClick={closeUserForm}
          >&times;</S.CloseIcon>
      </S.HeaderContainer>
      <S.FormContainer>
        <S.InputContainerList>
          <S.StyledInput
            label='Partner Name'
            value={partnerData?.name ?? ''}
            onChange={updateCandidateValues('name')}
            placeholder={'eg: Adzuna'}
            required={true}
            isDisabled={readOnly}
          />
          <div>
            <S.DropdownTitle>Category</S.DropdownTitle>
            <DropDown
              options={categoryOptions}
              placeholder={'Select Category'}
              onOptionSelect={updateCandidateValues('category')}
              selected={categoryOptions?.find((_) => _.value === partnerData.category) ?? ''}
              required={true}
              isDisabled={readOnly}
            />
          </div>
          <div>
            <S.DropdownTitle>Geography(s)</S.DropdownTitle>
            <DropDown
              options={geographyOptions}
              placeholder={'eg: Pan-India, USA, South America'}
              onOptionSelect={updateCandidateValues('geographies')}
              selected={geographyOptions
                ?.filter((__) => (partnerData.geographies).includes(__.value)) ?? ''}
              isMultiSelect={true}
              isSearchable={true}
              required={true}
              isDisabled={readOnly}
            />
          </div>
          <S.StyledInput
            label='Specialization(s)'
            capitalizeLabel={false}
            value={partnerData?.specialization ?? ''}
            onChange={updateCandidateValues('specialization')}
            placeholder={'eg: Product Management Hiring, Tech Hiring'}
            required={true}
            isDisabled={readOnly}
          />
          <S.StyledInput
            label='Slug'
            value={partnerData?.slug ?? ''}
            onChange={updateCandidateValues('slug')}
            placeholder={'eg: adzuna'}
            required={true}
            isDisabled={readOnly}
          />
          <div>
            <S.DropdownTitle>Assign Open Jobs From</S.DropdownTitle>
            <DropDown
              options={geographiesDataForAssignOpenJobs}
              placeholder={'Select country'}
              onOptionSelect={updateCandidateValues('job_source_geography')}
              selected={geographiesDataForAssignOpenJobs
                ?.find((__) => __.label === partnerData.job_source_geography) ?? ''}
              isSearchable={true}
              isDisabled={readOnly}
            />
          </div>
          <S.UtmTagInput>
            <S.StyledInput
              label='UTM Parameter'
              value={partnerData?.utm_tag ?? null}
              onChange={updateCandidateValues('utm_tag')}
              placeholder={'eg: utm_source=talenc.com&utm_medium=ppc'}
              isDisabled={readOnly}
              error={!isUTMValid}
              errorLabel={'Invalid parameters'}
            />
          </S.UtmTagInput>
        </S.InputContainerList>
        {!readOnly
          ? <S.ActionContainer>
             <S.ConfirmButton type={'submit'}>Confirm</S.ConfirmButton>
            </S.ActionContainer>
          : <S.XMLFeedUrl>
              <div><span>URL of XML feed:</span> {partnerData.xml_feed_url}</div>
              <img src={CopyIcon} alt={'Copy link'} onClick={() => copyToClipboard(partnerData.xml_feed_url)} />
            </S.XMLFeedUrl>}
      </S.FormContainer>
    </S.Container>
  );
};

PartnerForm.propTypes = {
  config: PropTypes.object,
  addPartner: PropTypes.func,
  closeUserForm: PropTypes.func,
};

const mapDispatchToProps = {
  addPartner: partnersActions.addPartner,
};

export default connect(null, mapDispatchToProps)(PartnerForm);
