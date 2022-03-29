import { ColumnConfig, SortState } from '../types';
import { CSSProperties } from 'react';

export interface TableBodyCellProps<RowDataType> {
  col: ColumnConfig<RowDataType>,
  row: RowDataType,
}

export interface TableHeaderCellProps<RowDataType> {
  colIdx: number,
  col: ColumnConfig<RowDataType>,
  handleColSortClick: (colIdx: number) => void,
  handleColFilterClick: (colIdx: number) => void,
}
