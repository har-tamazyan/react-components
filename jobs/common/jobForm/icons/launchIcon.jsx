/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

const LaunchIcon = ({ fill = '#8181a5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26.213" height="30.584" viewBox="0 0 26.213 30.584">
    <path id="Path_3194" data-name="Path 3194" d="M22.565,2H7.277A3.185,3.185,0,0,0,4,5.276V29.306a3.185,3.185,0,0,0,3.277,3.277h19.66a3.185,3.185,0,0,0,3.277-3.277V9.647C30.213,7,28.614,2,22.565,2Zm5.347,6.553h-3.16A1,1,0,0,1,23.661,7.46V4.271A4.952,4.952,0,0,1,27.913,8.552ZM26.928,30.4H18.2V16.651l2.5,2.5a1.092,1.092,0,1,0,1.544-1.544l-4.369-4.369a1.091,1.091,0,0,0-1.544,0l-4.369,4.369a1.092,1.092,0,0,0,1.544,1.544l2.5-2.5V30.4H7.277a1,1,0,0,1-1.092-1.092V5.276A1,1,0,0,1,7.277,4.183h14.2V7.46a3.185,3.185,0,0,0,3.277,3.277h3.276v18.57A1,1,0,0,1,26.928,30.4Z" transform="translate(-4 -1.999)" fill={fill}/>
  </svg>

);

LaunchIcon.propTypes = {
  fill: PropTypes.string,
  checked: PropTypes.bool,
};

export default LaunchIcon;
