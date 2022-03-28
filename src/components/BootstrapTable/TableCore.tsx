import React, { PropsWithChildren } from 'react';
import { Action, TableConfig } from './types';
import {defaultTableStyles} from './styles';

const DEFAULT_ACTIONS: Action[] = ['read', 'write', 'delete'];

export const TableCore = <DataRowType,>({source, allowedActions = DEFAULT_ACTIONS, columns}: PropsWithChildren<TableConfig<DataRowType>>) => {

  return null;
}
