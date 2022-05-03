/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable object-shorthand */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { categoriesActions } from 'src/web/ats/redux/modules/category/creator';
import categorySelectors from 'src/web/ats/redux/modules/category/selector.js';
import * as S from './styles';


const SubCategory = ({
  data,
  index,
  setShowMore,
  showMoreIndex,
  showMore,
}) => {
  const [catData, setCatData] = useState([]);
  const [items, setItems] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState('show more');
  useEffect(() => {
    setCatData(data);
  }, [catData]);

  const onClick = () => {
    const newText = !clicked ? 'show less' : 'show more';
    setClicked(!clicked);
    setText(newText);
    if (text === 'show more') {
      setShowMore({ isShow: true, index: index });
    } else {
      setShowMore({ isShow: false, index: index });
    }
    formatData();
  };

  const formatData = () => {
    const clickBtn = {
      type: 'btn',
      component: catData.length > 3 ? <S.ShowButton onClick={onClick}>{text}</S.ShowButton> : <></>,
    };
    if (showMore && showMoreIndex === index) {
      const items = [...catData, clickBtn];
      setItems(items);
    } else {
      const items = catData && [
        ...catData.slice(0, 3),
        clickBtn,
      ];
      setItems(items);
    }
  };

  useEffect(() => {
    if (showMoreIndex && showMoreIndex !== index) {
      setClicked(false);
      setText('show more');
      formatData();
    } else {
      formatData();
    }
  }, [catData, showMoreIndex, showMore, clicked]);

  useEffect(() => {
    setShowMore({ isShow: false, index: null });
  }, []);

  return (
    <>
      {items
        && items.map((item, index) => (
          <div key={index}>
            {item.type === 'btn' ? (
              !!item.component && item.component
            ) : (
              <div>
                <span>{item.name}</span>
              </div>
            )}
          </div>
        ))}
    </>
  );
};

SubCategory.propTypes = {
  data: PropTypes.array,
  setShowMore: PropTypes.func,
  showMore: PropTypes.bool,
  showMoreIndex: PropTypes.number,
  index: PropTypes.number,
};

const mapStateToProps = ({ category }) => ({
  showMoreIndex: categorySelectors.getShowMoreIndex({ category }),
  showMore: categorySelectors.getShowMore({ category }),
});

const mapDispatchToProps = {
  setShowMore: categoriesActions.setShowMore,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SubCategory));


