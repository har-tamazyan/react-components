import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DEFAULT_INACTIVE_COLOR = 'rgba(0, 0, 0, .05)';

const CircleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProgressNumber = styled.div`
  position: absolute;
  font-size: ${(p) => p.theme.LARGE};
`;

export const ProgressText = styled.div`
  position: absolute;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
  font-size: ${(p) => p.theme.SMALL};
`;

const Circle = styled.circle`
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

// Set the radius based on screen sizes
function getRadiusForProgressRing() {
  const screenWidth = window.screen.width;
  return screenWidth > 479 ? 72 : 60;
}

const ProgressRing = ({
  color,
  progress,
  radius,
  strokeWidth,
  inactiveColor,
}) => {
  const normalizedRadius = radius - 2 * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <React.Fragment>
      <svg height={radius * 2} width={radius * 2} style={{ zIndex: 2 }}>
        <Circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        height={radius * 2}
        width={radius * 2}
        style={{ zIndex: 1, position: 'absolute' }}
      >
        <circle
          stroke={inactiveColor || DEFAULT_INACTIVE_COLOR}
          strokeWidth={2}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </React.Fragment>
  );
};

ProgressRing.propTypes = {
  color: PropTypes.string,
  progress: PropTypes.number,
  radius: PropTypes.number,
  strokeWidth: PropTypes.number,
  inactiveColor: PropTypes.string,
};

const RadialProgressBar = ({
  color,
  progress,
  radius,
  text = '',
  strokeWidth = 3,
  inactiveColor = DEFAULT_INACTIVE_COLOR,
}) => {
  const stabilizedProgress = Math.min(Math.max(Math.round(progress), 0), 100);

  return (
    <CircleContainer>
      <ProgressRing
        radius={radius || getRadiusForProgressRing()}
        progress={stabilizedProgress}
        color={color}
        strokeWidth={strokeWidth}
        inactiveColor={inactiveColor}
      />
      {text ? (
        <ProgressText>{text.toLowerCase()}</ProgressText>
      ) : (
        <ProgressNumber>{stabilizedProgress}</ProgressNumber>
      )}
    </CircleContainer>
  );
};

RadialProgressBar.propTypes = {
  color: PropTypes.string,
  progress: PropTypes.number,
  radius: PropTypes.number,
  text: PropTypes.string,
  strokeWidth: PropTypes.number,
  inactiveColor: PropTypes.string,
};

export default RadialProgressBar;
