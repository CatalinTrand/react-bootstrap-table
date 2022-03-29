import React, { CSSProperties, ReactElement, ReactNode } from 'react';

export interface TableConfig<DataRowType> {
  source: HttpSource | ControlledSource<DataRowType>,
  allowedActions?: Action[],
  extraStyles?: {
    table?: CSSProperties,
    row?: {
      body: CSSProperties,
    },
    cell?: {
      head: CSSProperties,
      body: CSSProperties,
    },
    expandableContent?: CSSProperties,
  }
  columns: ColumnConfig<DataRowType>[],
}

export type HttpSource = {
  mode: 'http',
  endpoint: string,
  interface?: 'CRUD' | CustomHttpInterface,
  middleware?: (req: XMLHttpRequest) => XMLHttpRequest,
}

export interface ControlledSource<DataRowType> {
  mode: 'controlled',
  data: DataRowType[],
  onSave: (_data: DataRowType[]) => void | React.Dispatch<React.SetStateAction<DataRowType[]>>,
}

export type Action = 'read' | 'write' | 'delete';

export type CustomHttpInterface = {
  [key in HTTP_METHOD]: (url: string, data: any) => XMLHttpRequest;
};

export type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ColumnConfig<DataRowType> {
  label: string | ReactNode,
  field: string | ((row: DataRowType) => ReactNode),
  extraStyle?: CSSProperties,
  sort?: 'as-text' | 'as-number' | 'as-date' | 'as-boolean' | ((row1: DataRowType, row2: DataRowType) => number),
  filter?: 'as-text' | 'as-number' | 'as-date' | 'as-boolean',
  isEditable?: {
    input:
        (value: DataRowType, onChange: (val: DataRowType) => void) => ReactElement |
        { type: 'text' | 'number' | 'date' | 'checkbox' } |
        { type: 'select', mode?: 'singular' | 'multiple', options: SelectOption[] },
    validatorFn?: (val: any) => boolean,
    isDisabled?: ((row: DataRowType) => boolean) | boolean,
  }
}

export type SelectOption = {
  label: string,
  value: any,
}

export type SortState = {
  [key: number]: 'asc' | 'desc'
}

export type FilterState = {
  [key: number]: FilterMode
}

export type FilterMode = {
  condition: 'contains' | 'le' | 'ge' | 'eq',
  referenceValue: string | number | boolean,
}
