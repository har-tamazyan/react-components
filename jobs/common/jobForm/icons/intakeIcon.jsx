/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

const IntakeIcon = ({ fill = '#8181a5', checked = false }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30.622" viewBox="0 0 29 30.622">
    <g id="Group_11890" data-name="Group 11890" transform="translate(-408 225)">
      <g id="Group_11884" data-name="Group 11884">
        <path id="Path_3188" data-name="Path 3188" d="M2,28.559a3.062,3.062,0,0,0,3.062,3.062h5.1a1.021,1.021,0,1,0,0-2.041h-5.1a1.021,1.021,0,0,1-1.021-1.021V6.1A1.021,1.021,0,0,1,5.062,5.083H7.1V6.1a1.021,1.021,0,0,0,2.041,0V5.083h4.083V6.1a1.021,1.021,0,0,0,2.041,0V5.083h4.083V6.1a1.021,1.021,0,0,0,2.041,0V5.083h2.041A1.021,1.021,0,0,1,24.456,6.1v6.124a1.021,1.021,0,1,0,2.041,0V6.1a3.062,3.062,0,0,0-3.062-3.062H21.394V2.021a1.021,1.021,0,1,0-2.041,0V3.041H15.269V2.021a1.021,1.021,0,1,0-2.041,0V3.041H9.145V2.021a1.021,1.021,0,0,0-2.041,0V3.041H5.062A3.062,3.062,0,0,0,2,6.1Z" transform="translate(406 -226)" fill={fill}/>
      </g>
      <g id="noun_note_3774598" transform="translate(406 -226)">
        <path id="Path_3189" data-name="Path 3189" d="M8.021,12.041H20.269a1.021,1.021,0,0,0,0-2.041H8.021a1.021,1.021,0,1,0,0,2.041Z" transform="translate(0.104 0.186)" fill={fill}/>
        <path id="Path_3190" data-name="Path 3190" d="M8.021,16.041H18.228a1.021,1.021,0,0,0,0-2.041H8.021a1.021,1.021,0,1,0,0,2.041Z" transform="translate(0.104 0.269)" fill={fill}/>
        <path id="Path_3191" data-name="Path 3191" d="M16.186,19.021A1.021,1.021,0,0,0,15.166,18H8.021a1.021,1.021,0,0,0,0,2.041h7.145A1.021,1.021,0,0,0,16.186,19.021Z" transform="translate(0.104 0.352)" fill={fill}/>
        <path id="Path_3192" data-name="Path 3192" d="M8.021,22a1.021,1.021,0,1,0,0,2.041H12.1A1.021,1.021,0,1,0,12.1,22Z" transform="translate(0.104 0.435)" fill={fill}/>
        <path id="Path_3193" data-name="Path 3193" d="M14.021,31.353a.9.9,0,0,0,.235-.025l3.787-.894a1.014,1.014,0,0,0,.487-.272L29.5,19.183a3.062,3.062,0,1,0-4.33-4.33L14.2,25.828a1.021,1.021,0,0,0-.272.486l-.9,3.784a1.031,1.031,0,0,0,.989,1.255Zm1.822-4.287L26.617,16.3A1.027,1.027,0,0,1,28.06,17.74L17.287,28.51l-1.89.447Z" transform="translate(0.228 0.268)" fill={fill}/>
      </g>
      {checked ? (
        <g id="Group_11889" data-name="Group 11889" transform="translate(175 -433)">
          <g id="Ellipse_83" data-name="Ellipse 83" transform="translate(248 210)" fill="#00bc00" stroke="#fff" stroke-width="1">
            <circle cx="7" cy="7" r="7" stroke="none"/>
            <circle cx="7" cy="7" r="6.5" fill="none"/>
          </g>
          <path id="Path_9449" data-name="Path 9449" d="M-20704.4-4982.342l1.7,1.806,4.271-4.273" transform="translate(20956.365 5199.448)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1"/>
        </g>
      ) : null}
    </g>
  </svg>
);

IntakeIcon.propTypes = {
  fill: PropTypes.string,
  checked: PropTypes.bool,
};

export default IntakeIcon;
