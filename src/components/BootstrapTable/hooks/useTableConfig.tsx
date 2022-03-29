import React, { useState } from 'react';
import { SortState, TableConfig } from '../types';

//TODO
export const useTableConfig = <RowDataType,>() => {
  const [config, setConfig] = useState<TableConfig<RowDataType>>();
  const [sortState, setSortState] = useState<SortState>({})

  return {...config, sortState, setConfig, setSortState};
}
