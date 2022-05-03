/* eslint-disable camelcase */
import React from 'react';
import Proptypes from 'prop-types';
import { DataGrid, Column } from 'devextreme-react/data-grid';

const DetailTemplate = ({ nestedColumns, data, nestByField }) => {
  const nestedData = data[nestByField];

  return (
    <div style={{ paddingLeft: `${30}px` }}>
      {
        !!(nestedData?.length) && (
          <>
            <DataGrid
              allowColumnReordering={false}
              dataSource={nestedData}
              showBorders={true}
            >
              {nestedColumns.map((head, index) => <Column
                allowSorting={false}
                key={index}
                caption={head.Header}
                dataField={head.accessor}
                customizeText={head.cell}
              />)}
            </DataGrid>
          </>
        )
      }
    </div>
  );
};
DetailTemplate.propTypes = {
  nestedColumns: Proptypes.array,
  data: Proptypes.shape({
    nestedData: Proptypes.array,
  }),
  headerWidth: Proptypes.number,
  nestByField: Proptypes.string,

};

export default DetailTemplate;
