import React, { CSSProperties, ElementType, FC, ReactComponentElement, ReactElement, ReactNode } from 'react';


//TODO make RowDataType have 'id' field required
export interface TableConfig<RowDataType> {
  source: HttpSource | ControlledSource<RowDataType>,
  allowedActions?: ACTION[],
  columns: ColumnConfig<RowDataType>[],
  extraStyles?: {
    table?: CSSProperties,
    row?: {
      body: CSSProperties,
    },
    cell?: {
      head?: CSSProperties,
      body?: CSSProperties,
    },
  },
  ExpandableComponent?: React.FC<ExpandableComponentProps<RowDataType>>
}

export interface ExpandableComponentProps<RowDataType> {
  row: RowDataType,
}

export type HttpSource = {
  mode: 'http',
  endpoint: string,
  interface?: 'CRUD' | CustomHttpInterface,
  middleware?: (req: XMLHttpRequest) => XMLHttpRequest,
}

export interface ControlledSource<RowDataType> {
  mode: 'controlled',
  data: RowDataType[],
  onSave: (_data: RowDataType[]) => void | React.Dispatch<React.SetStateAction<RowDataType[]>>,
}

export type CustomHttpInterface = {
  [key in HTTP_METHOD]: (url: string, data: any) => XMLHttpRequest;
};

export type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ColumnConfig<RowDataType> {
  label: string | ReactNode,
  field: string | ((row: RowDataType) => ReactNode),
  extraStyle?: CSSProperties,
  sort?: 'as-text' | 'as-number' | 'as-date' | 'as-boolean' | ((row1: RowDataType, row2: RowDataType) => number),
  filter?: 'as-text' | 'as-number' | 'as-date' | 'as-boolean',
  isEditable?: {
    inputConfig:
        (value: RowDataType, onChange: (val: CellValueType) => void, disabled: boolean) => ReactElement |
        { type: 'text' | 'number' | 'date' | 'checkbox' } |
        { type: 'select', mode?: 'singular' | 'multiple', options: SelectOption[] },
    validatorFn?: (val: any) => boolean,
    isDisabled?: ((row: RowDataType) => boolean) | boolean,
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
  referenceValue: CellValueType,
}

export type CellValueType = string | number | boolean;

export enum ACTION {
  READ,
  WRITE,
  DELETE,
}
