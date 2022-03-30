import { ColumnConfig } from '../types';

export interface TableBodyCellProps<T extends IdRequired> {
  col: ColumnConfig<T>,
  row: T,
}

export interface TableHeaderCellProps<T extends IdRequired> {
  colIdx: number,
  col: ColumnConfig<T>,
  handleColSortClick: (colIdx: number) => void,
  handleColFilterClick: (colIdx: number) => void,
}
