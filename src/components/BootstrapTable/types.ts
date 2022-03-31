import React, { CSSProperties, ReactNode } from 'react';

declare global {
  interface IdRequired {
    id: string,
    [key: string]: CellValueType
  }
}

export interface TableConfig<T extends IdRequired> {
  source: HttpSource | ControlledSource<T>,
  allowedActions?: ACTION[],
  columns: ColumnConfig<T>[],
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
  ExpandableComponent?: React.FC<ExpandableComponentProps<T>>
}

export interface ExpandableComponentProps<T extends IdRequired> {
  row: T,
}

export type HttpSource = {
  mode: 'http',
  endpoint: string,
  interface?: 'CRUD' | CustomHttpInterface,
  middleware?: (req: HttpRequest) => HttpRequest,
}

export type HttpRequest = {
  url: string,
  options?: RequestInit
}

export interface ControlledSource<T extends IdRequired> {
  mode: 'controlled',
  data: T[],
  onSave: (_data: T[]) => void | React.Dispatch<React.SetStateAction<T[]>>,
}

export type CustomHttpInterface = {
  [key in HTTP_METHOD]: (url: string, data: any) => HttpRequest;
};

export type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ColumnConfig<T extends IdRequired>{
  label: string | ReactNode,
  field: string | ((row: T) => ReactNode),
  extraStyle?: CSSProperties,
  sort?: ValueMode | ((row1: T, row2: T) => number),
  filter?: ValueMode,
  isEditable?: {
    inputConfig: CustomInput | DefaultInput | SelectInput,
    validatorFn?: (val: any) => boolean,
    isDisabled?: ((row: T) => boolean) | boolean,
  }
}

export type ValueMode = 'as-text' | 'as-number' | 'as-date' | 'as-boolean';

export type CustomInput = {
  CustomInputComponent: React.FC<CustomInputProps>
}

export interface CustomInputProps {
  value: CellValueType,
  onChange: (val: CellValueType) => void,
  disabled?: boolean
}

export type DefaultInput = {
  type: 'text' | 'number' | 'date' | 'checkbox'
}

export type SelectInput = {
  type: 'select',
  mode?: 'singular' | 'multiple',
  options: SelectOption[],
}

export type SelectOption = {
  label: string,
  value: any,
}

export type TableChanges = {
  [key: string]: {
    [key: string]: CellValueType
  }
}

export type SortState = {
  [key: number]: 'asc' | 'desc'
}

export type FilterState = {
  [key: string]: FilterMode
}

export type FilterMode = {
  condition: 'le' | 'ge' | 'eq',
  referenceValue: CellValueType,
}

export type CellValueType = string | number | boolean;

export enum ACTION {
  READ,
  WRITE,
  DELETE,
}
