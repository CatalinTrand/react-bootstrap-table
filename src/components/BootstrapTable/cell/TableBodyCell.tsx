import React, { PropsWithChildren, useCallback } from 'react';
import { TableBodyCellProps } from './types';
import {defaultBodyCellStyles} from './styles';
import { useTableConfig } from '../hooks/useTableConfig';
import { ACTION, CellValueType, ColumnConfig, CustomInput, DefaultInput, SelectInput } from '../types';

export const TableBodyCell = <T extends IdRequired,>({col, row}: PropsWithChildren<TableBodyCellProps<T>>) => {
  const {extraStyles, submitEdit, allowedActions} = useTableConfig<T>();

  const onCellInputChange = (newVal: CellValueType) => {
    let {validatorFn} = col.isEditable ?? {};

    let valid = validatorFn ? validatorFn(newVal) : true;

    if(valid && typeof col.field === 'string') {
      submitEdit(newVal, col.field, row.id);
    }
  }

  const RenderedCellContent = useCallback<React.FC<{col: ColumnConfig<T>, row: any}>>(({col,row}) => {
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

      let {CustomInputComponent} = inputConfig as CustomInput;

      if(CustomInputComponent) {
        return (
          <CustomInputComponent
            value={row}
            onChange={onCellInputChange}
            disabled={allowedActions?.includes(ACTION.WRITE) && ((typeof isDisabled === 'function' ? isDisabled(row) : isDisabled) ?? false)}
          />
        );
      }

      inputConfig = inputConfig as DefaultInput | SelectInput;

      if(inputConfig.type) {
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
        console.error('Invalid input configuration for column ' + col.label);
        return null;
      }

    }
  }, [col, row]);

  return (
    <td style={{...defaultBodyCellStyles, ...(extraStyles?.cell?.body ?? {})}} className={'bootstrap-table-tbody-tr-td'}>
      <RenderedCellContent col={col} row={row}/>
    </td>
  );
}
