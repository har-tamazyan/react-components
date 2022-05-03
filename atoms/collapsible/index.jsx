import React, { useState } from 'react';
import PropTypes from 'prop-types';
import upArrow from 'src/web/ats/assets/icons/upArrow.svg';
import downArrow from 'src/web/ats/assets/icons/downArrow.svg';
import { Icon, CollapsibleHeader, Content } from './styles';

const Collapse = ({ collapsed, children, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  return (
        <>
            <CollapsibleHeader onClick={() => setIsCollapsed(!isCollapsed)}>
                {title}
                <Icon
                    src={isCollapsed ? downArrow : upArrow}
                    alt="arrow"
                />
            </CollapsibleHeader>
            <Content
                isCollapsed={isCollapsed}
                aria-expanded={isCollapsed}
            >
                {children}
            </Content>
        </>
  );
};
Collapse.propTypes = {
  collapsed: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
};
export default Collapse;
