import React, { PropsWithChildren } from 'react';
import { TableHeaderCellProps } from './types';
import { defaultHeaderCellStyles } from './styles';
import { useTableConfig } from '../hooks/useTableConfig';

const sortIcons = {
  'asc': 'fa fa-sort-asc',
  'desc': 'fa fa-sort',
};

export const TableHeaderCell = <RowDataType, >({
                                                 colIdx,
                                                 col,
                                                 handleColSortClick,
                                                 handleColFilterClick,
                                               }: PropsWithChildren<TableHeaderCellProps<RowDataType>>) => {

  const {sortState, extraStyles} = useTableConfig<RowDataType>();

  return (
    <th key={colIdx} className={'bootstrap-table-thead-tr-th'}
        style={{ ...defaultHeaderCellStyles, ...(extraStyles?.cell?.head ?? {}) }}>
      <span className={'bootstrap-table-thead-tr-th-label'} onClick={() => handleColSortClick(colIdx)}>{col.label}</span>
      <div className={'bootstrap-table-thead-tr-th-actions'}>
        {col.sort !== undefined &&
        <i
          className={sortIcons[sortState[colIdx] ?? ''] ?? 'fa fa-sort-outlined'}
          onClick={() => handleColSortClick(colIdx)}
        />}
        {col.filter !== undefined &&
        <i
          className={'fa fa-filter-outlined'}
          onClick={() => handleColFilterClick(colIdx)}
        />}
      </div>
    </th>
  );
}
