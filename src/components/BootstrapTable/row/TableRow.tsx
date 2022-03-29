import React, { PropsWithChildren } from 'react';
import { TableRowProps } from './types';
import {defaultRowStyles} from './styles';
import { useTableConfig } from '../hooks/useTableConfig';
import { TableBodyCell } from '../cell/TableBodyCell';

export const TableRow = <RowDataType,>({row}: PropsWithChildren<TableRowProps<RowDataType>>) => {

  const {columns, ExpandableComponent, extraStyles} = useTableConfig<RowDataType>();

  //TODO expandable row

  return(
    <tr style={{...defaultRowStyles, ...(extraStyles?.row?.body ?? {})}} className={'bootstrap-table-tbody-tr'}>
      {columns?.map((col, idx) => <TableBodyCell key={idx} col={col} row={row}/>)}
    </tr>
  );
};
