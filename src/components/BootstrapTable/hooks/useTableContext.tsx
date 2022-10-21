import React, {useContext} from 'react';
import {CellValueType, FilterState, SortState, TableChanges, TableConfig, TableContext} from '../types';
import {DEFAULT_ACTIONS, defaultConfig} from '../TableCore';

export const MyTableContext = <T extends IdRequired,>() => React.createContext<TableContext<T>>({
  config: defaultConfig,
  setConfig: (_) => {},
  sortState: {},
  setSortState: (_) => {},
  filterState: {},
  setFilterState: (_) => {},
  changes: {},
  setChanges: (_) => {},
})

export const useTableContext = <T extends IdRequired,>() => {

  const context = useContext( MyTableContext<T>() )

  const {changes, setChanges, config, setConfig, filterState, setFilterState, sortState, setSortState} = context

  const submitEdit = (value: CellValueType, field: string, rowIdx: string) => {
    let changesCopy = {...changes};
    changesCopy[rowIdx] = {
      [field]: value
    };
    setChanges(changesCopy);
  }

  return {
    config,
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
