import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { ACTION, HttpRequest, TableConfig } from './types';
import { defaultTableStyles } from './styles';
import { TableHeaderCell } from './cell/TableHeaderCell';
import { TableRow } from './row/TableRow';
import { useTableConfig } from './hooks/useTableConfig';

export const DEFAULT_ACTIONS: ACTION[] = [
  ACTION.READ,
  ACTION.WRITE,
  ACTION.DELETE,
];

export const TableCore = <T extends IdRequired,>({
                                           source,
                                           allowedActions = DEFAULT_ACTIONS,
                                           columns,
                                           extraStyles = {},
                                           ExpandableComponent
                                         }: PropsWithChildren<TableConfig<T>>) => {

  const [tableData, setTableData] = useState<T[]>([]);

  const {
    setConfig,
    sortState,
    setSortState,
    filterState,
    setFilterState
  } = useTableConfig<T>();

  const sortedFilteredData = useMemo<T[]>(() => {
    const copy = [...tableData];
    //TODO handle sorting & filtering
    return copy;
  }, [tableData, sortState, filterState]);

  useEffect(() => {
    setConfig({source, allowedActions, columns, extraStyles, ExpandableComponent});
  }, []);

  useEffect(() => {
    if(source.mode === 'controlled') {
      setTableData(source.data);
    } else {
      let request: HttpRequest | undefined = source.interface === 'CRUD' ? {
        url: source.endpoint,
        options: {
          method: 'GET'
        }
      } : source.interface?.GET(source.endpoint, {});

      if(!request){
        console.error('No configuration in the CustomHttpInterface for method GET')
        return;
      }

      request = source.middleware ? source.middleware(request) : request;

      //TODO
    }
  }, [source]);

  const handleTableCreate = () => {
    //TODO
  }

  const handleTableEdit = () => {
    //TODO
  }

  const handleTableDelete = () => {
    //TODO
  }

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
          <TableHeaderCell
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
