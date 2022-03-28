import React, { CSSProperties, ReactNode } from 'react';

export interface TableConfig<DataRowType> {
  source: {
    mode: 'http',
    endpoint: string,
    interface?: 'CRUD' | CustomHttpInterface,
    middleware?: (req: XMLHttpRequest) => XMLHttpRequest,
  } | {
    mode: 'controlled',
    data: DataRowType[],
    onSave: (_data: DataRowType[]) => void | React.Dispatch<React.SetStateAction<DataRowType[]>>,
  },
  allowedActions?: Action[],
  extraStyles?: {
    table?: CSSProperties,
    row?: CSSProperties,
    cell?: CSSProperties,
  }
  columns: ColumnConfig<DataRowType>[],
}

export type Action = 'read' | 'write' | 'delete';

export type CustomHttpInterface = {
  [key in HTTP_METHOD]: (url: string, data: any) => XMLHttpRequest;
};

export type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ColumnConfig<DataRowType> {
  label: string | ReactNode,
  field: string | ( (row: DataRowType) => ReactNode ),
  extraStyle?: CSSProperties,
  sort?:   'as-text' | 'as-number' | 'as-date' | 'as-boolean' | ( (row1: DataRowType, row2: DataRowType) => number),
  filter?: 'as-text' | 'as-number' | 'as-date' | 'as-boolean',
  isEditable?: {
    input: { type: 'text' } | { type: 'number' } | { type: 'date' } | { type: 'checkbox' } | { type: 'select', mode?: 'singular' | 'multiple', options: SelectOption[]},
    validatorFn?: (val: any) => boolean,
    isDisabled?: ( (row: DataRowType) => boolean ) | boolean,
  }
}

export interface SelectOption {
  label: string,
  value: any,
}
