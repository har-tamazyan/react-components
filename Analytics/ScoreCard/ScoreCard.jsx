import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';

import InfoIcon from 'src/web/ats/assets/icons/infoIcon.svg';
import { getScoreCardTitle } from '../../../utils';
import {
  StyledCard,
  StyledCardContainer,
  StyledCardsContainer,
  StyledCardStatistics,
  StyledCardValues,
  Title,
  Icon,
  StatsCardCountContainer,
  PreviousValue,
  PercentageValue,
  ArrowImage,
} from './styles';


const ScoreCard = ({ cards }) => {
  if (!cards.length) return null;
  return (
    <StyledCardsContainer>
      {
        cards.map((card) => {
          const key = Object.keys(card)[0];
          return (
            <StyledCardContainer key={key}>
              <StyledCard>
                <Title>
                  {getScoreCardTitle(key)}
                  <Tooltip
                    title={card[key].description}
                    position='top'
                    size='small'
                  >
                    <Icon src={InfoIcon} alt='info' />
                  </Tooltip>
                </Title>
                <StyledCardValues>
                  <StatsCardCountContainer>
                    {card[key].curr_val}
                    <PercentageValue color={card[key].color}>
                      {card[key].status
                        && <ArrowImage src={card[key].icon}/>
                      }
                      {`${card[key].percentage}%`}
                    </PercentageValue>
                  </StatsCardCountContainer>
                    <StyledCardStatistics>
                      <PreviousValue>
                        Previous period: {card[key].prev_val}
                      </PreviousValue>
                    </StyledCardStatistics>
                </StyledCardValues>
              </StyledCard>
            </StyledCardContainer>
          );
        })
      }
    </StyledCardsContainer>
  );
};

ScoreCard.propTypes = {
  cards: PropTypes.array,
};

ScoreCard.defaultProps = {
  cards: [],
};

export default ScoreCard;
