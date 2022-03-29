import React, { useState } from 'react';
import { CellValueType, SortState, TableConfig } from '../types';
import { DEFAULT_ACTIONS } from '../TableCore';

//TODO - finish
export const useTableConfig = <RowDataType,>() => {
  const [config, setConfig] = useState<TableConfig<RowDataType>>();
  const [sortState, setSortState] = useState<SortState>({});

  const submitEdit = (value: CellValueType, field: string, rowIdx: string) => {

  }

  return {
    ...config,
    allowedActions: config?.allowedActions ?? DEFAULT_ACTIONS,
    sortState,
    setConfig,
    setSortState,
    submitEdit,
  };
}
