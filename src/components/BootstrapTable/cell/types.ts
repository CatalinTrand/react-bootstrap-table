import { ColumnConfig, SortState } from '../types';

export interface TableBodyCellProps {

}

export interface TableHeaderCellProps<RowDataType> {
  colIdx: number,
  col: ColumnConfig<RowDataType>,
  sortState: SortState,
  handleColSortClick: (colIdx: number) => void,
  handleColFilterClick: (colIdx: number) => void,
}
