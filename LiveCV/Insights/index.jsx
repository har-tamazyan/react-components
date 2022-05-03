import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { mobileAndTabletCheck } from 'src/web/ats/utils';
import T500Logo from 'src/web/ats/assets/images/Talent500_Logoblack.png';
import PoweredByMercurial from 'src/web/ats/assets/images/logo/powered_by_mercurial.png';
import Checked from 'src/web/ats/assets/images/check_tick_icon.svg';
import QuestionMark from 'src/web/ats/assets/images/Q_Mark.svg';
import RadialProgressBar from '../common/radialProgressBar';
import * as S from './styles';

const BASE_COLOR = '#EEA304';

const Insights = ({ parameters }) => {
  if (!parameters) {
    return null;
  }

  const {
    highlights,
    insights,
    overall_fitment: overallFitment,
    to_be_probed: toBeProbed,
  } = parameters;

  const { fitment_category: fitmentCategory, statement, score } = overallFitment || {};
  const isOverallFitmentExist = fitmentCategory || statement || score;

  return highlights?.length || isOverallFitmentExist || toBeProbed?.length ? (
    <S.Container>
      <S.InsightHead>
        <S.BrandTitle>
          <img src={T500Logo} alt="Talent500 by ANSR" />
          <div>AI-Driven Insights</div>
        </S.BrandTitle>
        <S.PoweredByTitle>
          <img src={PoweredByMercurial} alt="" />
        </S.PoweredByTitle>
      </S.InsightHead>

      <S.SubContainer>
        {isOverallFitmentExist ? (
          <Fragment>
            <S.InsightSubHead>Overall Fitment</S.InsightSubHead>
            <S.Fitment isLastChild={true}>
              {score ? (
                <S.ProgressIcon>
                  <RadialProgressBar
                    progress={score}
                    color={BASE_COLOR}
                    radius={mobileAndTabletCheck() ? 22 : 28}
                  />
                </S.ProgressIcon>
              ) : null}
              <S.HeadAndDesc>
                {fitmentCategory ? <S.Head>{fitmentCategory}</S.Head> : null}
                {statement ? <S.Description>{statement}</S.Description> : null}
              </S.HeadAndDesc>
            </S.Fitment>
          </Fragment>
        ) : null}

        {insights?.length ? (
          <Fragment>
            <S.InsightSubHead>Candidate Insights</S.InsightSubHead>
            {insights.map((item, index) => (
              <S.Fitment
                key={index}
                isLastChild={insights.length - 1 === index}
              >
                <S.Icon>
                  <img src={item.icon_url} alt="" />
                </S.Icon>
                <S.HeadAndDesc>
                  <S.Head>{item.parameter}</S.Head>
                  <S.Description>{item.statement}</S.Description>
                </S.HeadAndDesc>
              </S.Fitment>
            ))}
          </Fragment>
        ) : null}

        {highlights.length || toBeProbed.length ? (
          <Fragment>
            <S.InsightSubHead>Candidate Highlights</S.InsightSubHead>
            <S.Fitment>
              <S.Icon>
                <img src={Checked} alt="" />
              </S.Icon>
              <S.HeadAndDesc>
                <S.Head>Meets requirements</S.Head>
                {highlights?.length ? (
                  highlights.map((item, index) => (
                    <S.HighlightText key={index}>
                      <img src={Checked} alt="checked icon" />
                      <S.DescriptionHightlight>
                        {item.statement}
                      </S.DescriptionHightlight>
                    </S.HighlightText>
                  ))
                ) : (
                  <S.NotFit>_</S.NotFit>
                )}
              </S.HeadAndDesc>
            </S.Fitment>
            <S.Fitment>
              <S.Icon>
                <img src={QuestionMark} alt="" />
              </S.Icon>
              <S.HeadAndDesc>
                <S.Head>May not meet requirements</S.Head>
                {toBeProbed?.length ? (
                  toBeProbed.map((item, index) => (
                    <S.HighlightText key={index}>
                      <div>
                        <img
                          src={QuestionMark}
                          alt="QuestionMark icon"
                          height={'12px'}
                          width={'10px'}
                        />
                      </div>
                      <S.DescriptionHightlight>
                        {item.statement}
                      </S.DescriptionHightlight>
                    </S.HighlightText>
                  ))
                ) : (
                  <S.NotFit>_</S.NotFit>
                )}
              </S.HeadAndDesc>
            </S.Fitment>
          </Fragment>
        ) : null}
      </S.SubContainer>
    </S.Container>
  ) : null;
};

Insights.propTypes = {
  parameters: PropTypes.object,
};

export default Insights;
