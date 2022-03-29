import React, { PropsWithChildren, useMemo } from 'react';
import { TableBodyCellProps } from './types';
import {defaultBodyCellStyles} from './styles';
import { useTableConfig } from '../hooks/useTableConfig';

export const TableBodyCell = <RowDataType,>({col, row}: PropsWithChildren<TableBodyCellProps<RowDataType>>) => {
  const {extraStyles} = useTableConfig();

  const renderedCellContent = () => {
    //TODO
    return null;
  }

  return (
    <td style={{...defaultBodyCellStyles, ...(extraStyles?.cell?.body ?? {})}}>
      {renderedCellContent()}
    </td>
  );
}
