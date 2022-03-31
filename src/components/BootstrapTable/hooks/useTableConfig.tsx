import React, { useState } from 'react';
import { CellValueType, FilterState, SortState, TableChanges, TableConfig } from '../types';
import { DEFAULT_ACTIONS } from '../TableCore';

export const useTableConfig = <T extends IdRequired,>() => {
  const [config, setConfig] = useState<TableConfig<T>>();
  const [sortState, setSortState] = useState<SortState>({});
  const [filterState, setFilterState] = useState<FilterState>({});
  const [changes, setChanges] = useState<TableChanges>({});

  const submitEdit = (value: CellValueType, field: string, rowIdx: string) => {
    let changesCopy = {...changes};
    changesCopy[rowIdx] = {
      [field]: value
    };
    setChanges(changesCopy);
  }

  return {
    ...config,
    setConfig,
    sortState,
    setSortState,
    filterState,
    setFilterState,
    unsavedChanges: changes,
    submitEdit,
    allowedActions: config?.allowedActions ?? DEFAULT_ACTIONS,
  };
}
