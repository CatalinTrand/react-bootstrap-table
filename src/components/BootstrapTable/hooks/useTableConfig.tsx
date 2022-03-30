import React, { useState } from 'react';
import { CellValueType, FilterState, SortState, TableConfig } from '../types';
import { DEFAULT_ACTIONS } from '../TableCore';

export const useTableConfig = <T extends IdRequired,>() => {
  const [config, setConfig] = useState<TableConfig<T>>();
  const [sortState, setSortState] = useState<SortState>({});
  const [filterState, setFilterState] = useState<FilterState>({});

  const submitEdit = (value: CellValueType, field: string, rowIdx: string) => {
    //TODO
  }

  return {
    ...config,
    setConfig,
    sortState,
    setSortState,
    filterState,
    setFilterState,
    submitEdit,
    allowedActions: config?.allowedActions ?? DEFAULT_ACTIONS,
  };
}
