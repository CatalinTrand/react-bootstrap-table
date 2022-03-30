import React, { PropsWithChildren, useState } from 'react';
import { TableRowProps } from './types';
import { defaultRowStyles } from './styles';
import { useTableConfig } from '../hooks/useTableConfig';
import { TableBodyCell } from '../cell/TableBodyCell';

export const TableRow = <T extends IdRequired, >({ row }: PropsWithChildren<TableRowProps<T>>) => {

  const { columns, ExpandableComponent, extraStyles } = useTableConfig<T>();
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <>
      <tr style={{ ...defaultRowStyles, ...(extraStyles?.row?.body ?? {}) }} className={'bootstrap-table-tbody-tr'}>
        {ExpandableComponent &&
          <td className={'bootstrap-table-tbody-tr-td-expandable'} onClick={() => setExpanded(exp => !exp)}>
            {expanded ? '^' : 'v'}
          </td>
        }
        {columns?.map((col, idx) => <TableBodyCell key={idx} col={col} row={row}/>)}
      </tr>
      {ExpandableComponent && expanded &&
        <tr className={'bootstrap-table-tbody-tr-expandable-content'}>
          <ExpandableComponent row={row}/>
        </tr>
      }
    </>
  );
};
