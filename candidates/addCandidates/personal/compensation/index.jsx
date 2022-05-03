import React from 'react';
import Proptypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { COUNTRY_CURRENCY_CODE } from 'src/constants';
import { convertNumberToStringCSV, getFloatValueFromStringCSV, toAcceptedDateString } from 'src/web/utils';
import { CustomDateDropdownInput } from 'src/web/ats/components/common/dateInput';
import Input from 'src/web/ats/components/atoms/input';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import TagTextDropDown from 'src/web/ats/components/atoms/dropDown/v2/index.js';
import * as S from './styles';

const SALARY_TIME_PERIOD_LIST = [
  {
    label: 'per annum',
    value: 'per annum',
  },
  {
    label: 'per month',
    value: 'per month',
  },
  {
    label: 'per week',
    value: 'per week',
  },
  {
    label: 'per day',
    value: 'per day',
  },
];

const VESTING_PERIOD_LIST = ['1', '2', '3', '4', '5', '6', '7', '8'];

export const PERKS_BENEFITS_LIST = [
  {
    name: 'Cab Service',
    id: 1,
  },
  {
    name: 'Company Leased Vehicle',
    id: 2,
  },
  {
    name: "ESOP's or Equity",
    id: 3,
  },
  {
    name: 'Health Insurance',
    id: 4,
  },
  {
    name: 'Life Insurance',
    id: 5,
  },
  {
    name: 'Performance Bonus',
    id: 6,
  },
  {
    name: 'Transportation',
    id: 7,
  },
];

export const SalaryInfoItem = ({
  type,
  label,
  placeholder,
  salaryInfo = {},
  updateCompensationAndBenefits,
  required = false,
  isDisabled,
  disableCurrency,
  containerStyles,
  baseLabelStyles,
}) => {
  const locale = salaryInfo.currency === 'INR' ? 'hi-IN' : 'en-US';
  return (<S.SalaryInfoItemContainer styles={containerStyles}>
    <S.BaseLabel styles={baseLabelStyles}>{label}</S.BaseLabel>
    <S.DropInputContainer>
      <DropDown
        options={COUNTRY_CURRENCY_CODE}
        required={required}
        onOptionSelect={(_, selectedCurrency) => updateCompensationAndBenefits(type, 'currency')(selectedCurrency)}
        selected={COUNTRY_CURRENCY_CODE.find((currency) => currency.value === salaryInfo.currency)}
        dropdownContainerStyles={S.LeftDropdownContainerStyles}
        dropdownStyles={S.LeftDropdownStyles}
        isDisabled={isDisabled}
        isDisableToggle={disableCurrency}
        hideIndicator={disableCurrency}
      />
      <Input
        required={required}
        placeholder={placeholder}
        onChange={(e) => updateCompensationAndBenefits(type, 'amount')(getFloatValueFromStringCSV(e.target.value))}
        value={convertNumberToStringCSV(salaryInfo.amount || '', locale)}
        inputContainerStyles={S.InputContainerStyles}
        inputStyles={S.InputStyles}
        isDisabled={isDisabled}
      />
      <DropDown
        options={SALARY_TIME_PERIOD_LIST}
        required={required}
        onOptionSelect={(_, selectedSalaryStructure) => updateCompensationAndBenefits(type, 'salary_structure')(selectedSalaryStructure)}
        selected={(SALARY_TIME_PERIOD_LIST.find(
          (period) => period.value === salaryInfo?.salary_structure,
        )) || { label: 'per annum', value: 'per annum' }}
        dropdownContainerStyles={S.RightDropdownContainerStyles}
        dropdownStyles={S.RightDropdownStyles}
        isDisabled={isDisabled}
      />
    </S.DropInputContainer>
  </S.SalaryInfoItemContainer>);
};


SalaryInfoItem.propTypes = {
  type: Proptypes.string,
  label: Proptypes.string,
  placeholder: Proptypes.string,
  salaryInfo: Proptypes.object,
  minCTCValue: Proptypes.number,
  updateCompensationAndBenefits: Proptypes.func,
  isDisabled: Proptypes.bool,
  disableCurrency: Proptypes.bool,
  required: Proptypes.bool,
  containerStyles: Proptypes.array,
  baseLabelStyles: Proptypes.array,
};

const CompensationAndBenefits = ({
  totalSalary, fixedSalary, variableSalary,
  bonusSalary, eops = {}, perksAndBenefits,
  updateCompensationAndBenefits, isDisabled,
}) => <S.Container>
    <S.Heading>Current Compensation &amp; Benefits</S.Heading>
    <S.CTCInfoContainer>
      <SalaryInfoItem
        type={'total_salary'}
        label='Total compensation'
        required
        updateCompensationAndBenefits={updateCompensationAndBenefits}
        salaryInfo={totalSalary}
        isDisabled={isDisabled}
      />
      <S.AnnualCTCBreakupContainer>
        <div>
          <S.HorizontalLine height={'60px'} />
          <S.HorizontalLine height={'84px'} />
          <S.HorizontalLine height={'84px'} />
        </div>
        <S.AnnualCTCBreakup>
          <SalaryInfoItem
            type={'fixed_salary'}
            label='Fixed Salary'
            updateCompensationAndBenefits={updateCompensationAndBenefits}
            salaryInfo={fixedSalary}
            isDisabled={isDisabled}
            disableCurrency={true}
          />
          <SalaryInfoItem
            type={'variable_salary'}
            label='Variable Salary'
            updateCompensationAndBenefits={updateCompensationAndBenefits}
            salaryInfo={variableSalary}
            isDisabled={isDisabled}
            disableCurrency={true}
          />
          <SalaryInfoItem
            type={'bonus_salary'}
            label='Total One-Time Bonus (Sum of Retention, Relocation and Joining Bonus)'
            updateCompensationAndBenefits={updateCompensationAndBenefits}
            salaryInfo={bonusSalary}
            isDisabled={isDisabled}
            disableCurrency={true}
          />
        </S.AnnualCTCBreakup>
      </S.AnnualCTCBreakupContainer>
      <S.SubHeading>ESOPs</S.SubHeading>
      <S.ESOPsContainer>
        <div>
          <S.HorizontalLine height={'60px'} />
          <S.HorizontalLine height={'84px'} />
          <S.HorizontalLine height={'84px'} />
        </div>
        <S.ESOPsDetails>
          <div>
            <S.BaseLabel>Approx. Value of allotted stocks/ESOPs</S.BaseLabel>
            <S.DropInputContainer>
              <DropDown
                options={COUNTRY_CURRENCY_CODE}
                onOptionSelect={(_, selectedCurrency) => updateCompensationAndBenefits('eops', 'currency')(selectedCurrency)}
                selected={COUNTRY_CURRENCY_CODE.find(
                  (currency) => currency.value === eops.stocks.currency,
                )}
                dropdownContainerStyles={S.LeftDropdownContainerStyles}
                dropdownStyles={S.LeftDropdownStyles}
                isDisabled={isDisabled}
              />
              <Input
                onChange={(e) => updateCompensationAndBenefits('eops', 'amount')(getFloatValueFromStringCSV(e.target.value))}
                value={convertNumberToStringCSV(eops.stocks.amount || '', eops.currency === 'INR' ? 'hi-IN' : 'en-US')}
                inputContainerStyles={S.InputContainerStyles}
                inputStyles={S.VestedStockValueInputStyles}
                isDisabled={isDisabled}
              />
            </S.DropInputContainer>
          </div>
          <div>
            <S.BaseLabel>Vesting Period (in years)</S.BaseLabel>
            <DropDown
              options={VESTING_PERIOD_LIST}
              onOptionSelect={(_, selectedVestingPeriod) => updateCompensationAndBenefits('eops', 'vesting_period')(selectedVestingPeriod)}
              selected={eops.vesting_period}
              isDisabled={isDisabled}
            />
          </div>
          <div>
            <S.BaseLabel>Offer Date</S.BaseLabel>
            <S.OfferDateContainer>
              <DatePicker
                enableTabLoop={false}
                selected={Date.parse(eops.offer_date)}
                onChange={(date) => updateCompensationAndBenefits('eops', 'offer_date')(toAcceptedDateString(date.toString()))}
                customInput={<CustomDateDropdownInput chevronDownIcon={false} />}
                dateFormat='dd/MM/yyyy'
                disabled={isDisabled}
              />
            </S.OfferDateContainer>
          </div>
        </S.ESOPsDetails>
      </S.ESOPsContainer>
      <S.SubHeading>Perks and Benefits</S.SubHeading>
      <S.PerksAndBenefitsContainer>
        <div>
          <S.HorizontalLine height={'50%'} />
        </div>
        <S.PerksAndBenefitsDetails>
          <TagTextDropDown
            placeholder="Add perks and benefits"
            options={PERKS_BENEFITS_LIST.map((_) => _.name)}
            name="perks_and_benefits"
            selected={perksAndBenefits.map((__) => __.name) || []}
            onOptionSelect={(selectedOption) => updateCompensationAndBenefits('perks_and_benefits')(selectedOption)}
            isSearchable={false}
            isMultiSelect={true}
            customPlaceholder={true}
            disabled={isDisabled}
            showIndicator={true}
          />
        </S.PerksAndBenefitsDetails>
      </S.PerksAndBenefitsContainer>
    </S.CTCInfoContainer>
  </S.Container>;

CompensationAndBenefits.defaultProps = {
  totalSalary: {},
  fixedSalary: {},
  variableSalary: {},
  bonusSalary: {},
  eops: {},
  perksAndBenefits: [],
  isDisabled: false,
};


CompensationAndBenefits.propTypes = {
  totalSalary: Proptypes.object,
  fixedSalary: Proptypes.object,
  variableSalary: Proptypes.object,
  bonusSalary: Proptypes.object,
  eops: Proptypes.object,
  perksAndBenefits: Proptypes.array,
  updateCompensationAndBenefits: Proptypes.func,
  isDisabled: Proptypes.bool,
};

export default CompensationAndBenefits;
