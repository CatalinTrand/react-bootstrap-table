import React, {PropsWithChildren, useState} from 'react';
import {TableHeaderCellProps} from './types';
import {defaultHeaderCellStyles} from './styles';
import {useTableContext} from '../hooks/useTableContext';
import {FilterMode, ValueMode} from "../types";

const sortIcons = {
    asc: 'fa fa-sort-asc',
    desc: 'fa fa-sort',
    default: 'fa fa-sort-outlined',
};

export const TableHeaderCell = <T extends IdRequired, >({
                                                            colIdx,
                                                            col,
                                                        }: PropsWithChildren<TableHeaderCellProps<T>>) => {

    const {config: { extraStyles }, filterState, sortState, setFilterState, setSortState} = useTableContext<T>();

    const [modal, setModal] = useState<ValueMode>();

    const handleColSortClick = () => {
        let sortStateCopy = {...sortState};
        let colSortState = sortStateCopy[colIdx]
        if (colSortState) {
            if (colSortState === 'asc') {
                sortStateCopy[colIdx] = 'desc'
            } else {
                delete sortStateCopy[colIdx];
            }
        } else {
            sortStateCopy = {
                [colIdx]: 'asc'
            };
        }
        setSortState(sortStateCopy);
    };

    const handleColFilterClick = () => {
        setModal(col.filter);
    };

    const handleFilterApply = (newFilterMode: FilterMode) => {
        if (newFilterMode)
            setFilterState({...filterState, [colIdx]: newFilterMode});
        else {
            let copy = {...filterState};
            if (copy[colIdx])
                delete copy[colIdx];
            setFilterState(copy);
        }
    }

    return (
        <th key={colIdx} className={'bootstrap-table-thead-tr-th'}
            style={{...defaultHeaderCellStyles, ...(extraStyles?.cell?.head ?? {})}}>
            <span className={'bootstrap-table-thead-tr-th-label'}
                  onClick={() => handleColSortClick()}>{col.label}</span>
            <div className={'bootstrap-table-thead-tr-th-actions'}>
                {col.sort !== undefined &&
                    <i
                        className={sortIcons[sortState[colIdx] ?? ''] ?? sortIcons.default}
                        onClick={() => handleColSortClick()}
                    />}
                {col.filter !== undefined &&
                    <i
                        className={'fa fa-filter-outlined'}
                        onClick={() => handleColFilterClick()}
                    />}
            </div>
        </th>
    );
}
