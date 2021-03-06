/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

const SetupIcon = ({ fill = '#8181a5', checked = false }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32.885" height="28.884" viewBox="0 0 32.885 28.884">
    <g id="Group_11882" data-name="Group 11882" transform="translate(-245.115 340)">
      <g id="Group_8689" data-name="Group 8689" transform="translate(245.115 -338.884)">
        <path id="Path_3195" data-name="Path 3195" d="M416.185,169.865l.653-2.876a1.068,1.068,0,0,1,.875-.819,13.876,13.876,0,0,1,4.344,0,1.068,1.068,0,0,1,.875.819l.653,2.876q.391.144.77.319l2.5-1.572a1.067,1.067,0,0,1,1.2.04,13.852,13.852,0,0,1,3.072,3.072,1.067,1.067,0,0,1,.04,1.2l-1.572,2.5q.175.378.319.77l2.876.653a1.068,1.068,0,0,1,.819.875,13.876,13.876,0,0,1,0,4.344,1.068,1.068,0,0,1-.819.875l-2.876.653q-.144.391-.319.77l1.572,2.5a1.067,1.067,0,0,1-.04,1.2,13.852,13.852,0,0,1-3.072,3.072,1.067,1.067,0,0,1-1.2.04l-2.5-1.572q-.378.175-.77.319l-.653,2.876a1.068,1.068,0,0,1-.875.819,13.876,13.876,0,0,1-4.344,0,1.068,1.068,0,0,1-.875-.819l-.653-2.876q-.391-.144-.769-.319l-2.5,1.572a1.067,1.067,0,0,1-1.2-.04,13.852,13.852,0,0,1-3.072-3.072,1.067,1.067,0,0,1-.04-1.2l1.572-2.5q-.175-.378-.319-.77l-2.876-.653a1.068,1.068,0,0,1-.819-.875,13.876,13.876,0,0,1,0-4.344,1.068,1.068,0,0,1,.819-.875l2.876-.653q.144-.391.319-.77l-1.572-2.5a1.067,1.067,0,0,1,.04-1.2,13.852,13.852,0,0,1,3.072-3.072,1.067,1.067,0,0,1,1.2-.04l2.5,1.572Q415.794,170.009,416.185,169.865Zm4.828-1.675a11.725,11.725,0,0,0-2.258,0l-.62,2.732a1.068,1.068,0,0,1-.732.786,8.545,8.545,0,0,0-1.547.641,1.068,1.068,0,0,1-1.073-.038l-2.37-1.494a11.738,11.738,0,0,0-1.6,1.6l1.494,2.37a1.068,1.068,0,0,1,.038,1.073,8.54,8.54,0,0,0-.641,1.547,1.068,1.068,0,0,1-.786.732l-2.732.62a11.715,11.715,0,0,0,0,2.258l2.732.62a1.068,1.068,0,0,1,.786.732,8.54,8.54,0,0,0,.641,1.547,1.068,1.068,0,0,1-.038,1.073l-1.494,2.37a11.738,11.738,0,0,0,1.6,1.6l2.37-1.494a1.068,1.068,0,0,1,1.073-.038,8.542,8.542,0,0,0,1.547.641,1.068,1.068,0,0,1,.732.786l.62,2.732a11.725,11.725,0,0,0,2.258,0l.62-2.732a1.068,1.068,0,0,1,.732-.786,8.545,8.545,0,0,0,1.547-.641,1.068,1.068,0,0,1,1.073.038l2.37,1.494a11.742,11.742,0,0,0,1.6-1.6l-1.494-2.37a1.068,1.068,0,0,1-.038-1.073,8.545,8.545,0,0,0,.641-1.547,1.068,1.068,0,0,1,.786-.732l2.732-.62a11.735,11.735,0,0,0,0-2.258l-2.732-.62a1.068,1.068,0,0,1-.786-.732,8.545,8.545,0,0,0-.641-1.547,1.068,1.068,0,0,1,.038-1.073l1.494-2.37a11.742,11.742,0,0,0-1.6-1.6l-2.37,1.494a1.068,1.068,0,0,1-1.073.038,8.547,8.547,0,0,0-1.547-.641,1.068,1.068,0,0,1-.732-.786Zm-1.129,14.894a3.2,3.2,0,1,1,2.771-1.6,1.068,1.068,0,1,0,1.848,1.071,5.336,5.336,0,1,0-4.619,2.664,1.068,1.068,0,1,0,0-2.136Z" transform="translate(-406 -166)" fill={fill} fillRule="evenodd"/>
      </g>
      {checked ? (
        <g id="Group_11830" data-name="Group 11830" transform="translate(16 -550)">
          <g id="Ellipse_83" data-name="Ellipse 83" transform="translate(248 210)" fill="#00bc00" stroke="#fff" strokeWidth="1">
            <circle cx="7" cy="7" r="7" stroke="none"/>
            <circle cx="7" cy="7" r="6.5" fill="none"/>
          </g>
          <path id="Path_9449" data-name="Path 9449" d="M-20704.4-4982.342l1.7,1.806,4.271-4.273" transform="translate(20956.365 5199.448)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="1"/>
        </g>
      ) : null}
    </g>
  </svg>

);

SetupIcon.propTypes = {
  fill: PropTypes.string,
  checked: PropTypes.bool,
};

export default SetupIcon;
