import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Action, FilterState, SortState, TableConfig } from './types';
import {defaultTableStyles} from './styles';
import { TableHeaderCell } from './cell/TableHeaderCell';

const DEFAULT_ACTIONS: Action[] = ['read', 'write', 'delete'];

export const TableCore = <DataRowType,>({source, allowedActions = DEFAULT_ACTIONS, columns, extraStyles = {}}: PropsWithChildren<TableConfig<DataRowType>>) => {

  const [tableData, setTableData] = useState<DataRowType[]>([]);
  const [sortState, setSortState] = useState<SortState>({});
  const [filterState, setFilterState] = useState<FilterState>({});

  const sortedFilteredData = useMemo(() => {
    const copy = [...tableData];
    //handle sorting & filtering
    return copy;
  }, [tableData, sortState, filterState]);

  const handleColSortClick = (colIdx: number) => {

  }

  const handleColFilterClick = (colIdx: number) => {

  }

  useEffect(() => {
    //fetch data
  }, [source]);

  return (
    <table style={{...defaultTableStyles, ...extraStyles.table ?? {}}} className={'bootstrap-table'}>
      <thead className={'bootstrap-table-thead'}>
        <tr className={'bootstrap-table-thead-tr'}>
          {columns.map((col, idx) =>
            <TableHeaderCell key={idx} col={col} colIdx={idx} handleColFilterClick={handleColFilterClick} handleColSortClick={handleColSortClick}/>
          )}
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  );
}
