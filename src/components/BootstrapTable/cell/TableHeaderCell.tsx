import React, { PropsWithChildren } from 'react';
import { TableHeaderCellProps } from './types';
import { defaultHeaderCellStyles } from './styles';
import { useTableConfig } from '../hooks/useTableConfig';

const sortIcons = {
  asc: 'fa fa-sort-asc',
  desc: 'fa fa-sort',
  default: 'fa fa-sort-outlined',
};

export const TableHeaderCell = <T extends IdRequired, >({
                                                 colIdx,
                                                 col,
                                               }: PropsWithChildren<TableHeaderCellProps<T>>) => {

  const {extraStyles, sortState, setSortState} = useTableConfig<T>();

  const handleColSortClick = () => {
    let sortStateCopy = {...sortState};
    let colSortState = sortStateCopy[colIdx]
    if(colSortState) {
      if(colSortState === 'asc') {
        sortStateCopy[colIdx] = 'desc'
      } else {
        delete sortStateCopy[colIdx];
      }
    } else {
      sortStateCopy= {
        [colIdx]: 'asc'
      };
    }
    setSortState(sortStateCopy);
  };

  const handleColFilterClick = () => {
    //TODO
  };

  return (
    <th key={colIdx} className={'bootstrap-table-thead-tr-th'}
        style={{ ...defaultHeaderCellStyles, ...(extraStyles?.cell?.head ?? {}) }}>
      <span className={'bootstrap-table-thead-tr-th-label'} onClick={() => handleColSortClick()}>{col.label}</span>
      <div className={'bootstrap-table-thead-tr-th-actions'}>
        {col.sort !== undefined &&
        <i
          className={sortIcons[sortState[colIdx] ?? ''] ?? sortIcons.default}
          onClick={() => handleColSortClick()}
        />}
        {col.filter !== undefined &&
        <i
          className={'fa fa-filter-outlined'}
          onClick={() => handleColFilterClick()}
        />}
      </div>
    </th>
  );
}
