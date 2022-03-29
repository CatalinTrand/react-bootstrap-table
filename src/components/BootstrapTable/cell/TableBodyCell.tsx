import React, { PropsWithChildren, useCallback } from 'react';
import { TableBodyCellProps } from './types';
import {defaultBodyCellStyles} from './styles';
import { useTableConfig } from '../hooks/useTableConfig';
import { CellValueType, ColumnConfig } from '../types';

export const TableBodyCell = <RowDataType,>({col, row}: PropsWithChildren<TableBodyCellProps<RowDataType>>) => {
  const {extraStyles, submitEdit, allowedActions} = useTableConfig();

  const onCellInputChange = (newVal: CellValueType) => {
    let {validatorFn} = col.isEditable ?? {};

    let valid = validatorFn ? validatorFn(newVal) : true;

    if(valid && typeof col.field === 'string') {
      // @ts-ignore
      submitEdit(newVal, col.field, row.id);
    }
  }

  const RenderedCellContent = useCallback(({col,row}: {col: ColumnConfig<RowDataType>, row: any}) => {
    if(!col.isEditable) {
      switch (typeof col.field) {
        case 'string':
          return row[col.field];
        case 'function':
          return col.field(row);
      }
    } else {
      let {inputConfig, isDisabled} = col.isEditable;
      if(typeof col.field !== 'string') {
        console.error('Cannot specify isEditable property for a column with dynamic field render(col.field == function) - at column ' + col.label)
        return null;
      }

      if(typeof inputConfig === 'function')
        return inputConfig(
          row,
          onCellInputChange,
          allowedActions?.includes('write') && (typeof isDisabled === 'function' ? isDisabled(row) : isDisabled ?? false)
        );

      //TODO fix 'never'
      if(inputConfig.type !== undefined) {
        if(inputConfig.type === 'select') {
          return (
            <select multiple={inputConfig.mode === 'multiple'} value={row[col.field]} onChange={(e) => onCellInputChange(e.target.value)}>
              {inputConfig.options.map((opt, idx) => <option key={idx} value={opt.value}>{opt.label}</option>)}
            </select>
          );
        } else {
          return (
            <input
              type={inputConfig.type}
              value={row[col.field]}
              onChange={(e) => onCellInputChange(e.target.value)}
            />
          );
        }
      } else {
        console.error('Invalid input configuration for column ' + col.label)
        return null;
      }

    }
  }, [col, row]);

  return (
    <td style={{...defaultBodyCellStyles, ...(extraStyles?.cell?.body ?? {})}}>
      <RenderedCellContent col={col} row={row}/>
    </td>
  );
}
