import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { ACTION, FilterState, SortState, TableConfig } from './types';
import { defaultTableStyles } from './styles';
import { TableHeaderCell } from './cell/TableHeaderCell';
import { TableRow } from './row/TableRow';

export const DEFAULT_ACTIONS: ACTION[] = [
  ACTION.READ,
  ACTION.WRITE,
  ACTION.DELETE,
];

export const TableCore = <RowDataType, >({
                                           source,
                                           allowedActions = DEFAULT_ACTIONS,
                                           columns,
                                           extraStyles = {},
                                           ExpandableComponent
                                         }: PropsWithChildren<TableConfig<RowDataType>>) => {

  const [tableData, setTableData] = useState<RowDataType[]>([]);
  const [sortState, setSortState] = useState<SortState>({});
  const [filterState, setFilterState] = useState<FilterState>({});

  const sortedFilteredData = useMemo<RowDataType[]>(() => {
    const copy = [...tableData];
    //TODO handle sorting & filtering
    return copy;
  }, [tableData, sortState, filterState]);

  useEffect(() => {
    //TODO fetch data
  }, [source]);

  const handleColSortClick = (colIdx: number) => {
    //TODO
  };

  const handleColFilterClick = (colIdx: number) => {
    //TODO
  };

  return (
    <table style={{ ...defaultTableStyles, ...extraStyles.table ?? {} }} className={'bootstrap-table'}>
      <thead className={'bootstrap-table-thead'}>
      <tr className={'bootstrap-table-thead-tr'}>
        {ExpandableComponent && <th className={'bootstrap-table-thead-th-expandable'}/>}
        {columns.map((col, idx) =>
          <TableHeaderCell<RowDataType>
            key={idx}
            col={col}
            colIdx={idx}
            handleColFilterClick={handleColFilterClick}
            handleColSortClick={handleColSortClick}
          />
        )}
      </tr>
      </thead>
      <tbody className={'bootstrap-table-tbody'}>
        {sortedFilteredData.map((row, idx) =>
          <TableRow
            key={idx}
            row={row}
          />
        )}
      </tbody>
    </table>
  );
};
