import React, {PropsWithChildren, useEffect, useMemo, useState} from 'react';
import {
    ACTION,
    ControlledSource,
    FilterState,
    HttpRequest,
    HttpSource,
    SortState, TableChanges,
    TableConfig,
} from './types';
import {defaultTableStyles} from './styles';
import {TableHeaderCell} from './cell/TableHeaderCell';
import {TableRow} from './row/TableRow';
import {executeHttpRequest, getFilterFnForColumn, getSortingFnForColumn} from './utils';
import {MyTableContext} from "./hooks/useTableContext";

export const DEFAULT_ACTIONS: ACTION[] = [
    ACTION.READ,
    ACTION.WRITE,
    ACTION.DELETE,
];

export const defaultConfig: TableConfig<any> = {
    source: {
        data: [], onSave: () => {}, mode: 'controlled'
    },
    columns: []
}

export const TableCore = <T extends IdRequired, >({
                                                      source,
                                                      allowedActions = DEFAULT_ACTIONS,
                                                      columns,
                                                      extraStyles = {},
                                                      ExpandableComponent
                                                  }: PropsWithChildren<TableConfig<T>>) => {


    const [config, setConfig] = useState<TableConfig<T>>(defaultConfig);

    const [sortState, setSortState] = useState<SortState>({});
    const [filterState, setFilterState] = useState<FilterState>({});
    const [changes, setChanges] = useState<TableChanges>({});

    const [tableData, setTableData] = useState<T[]>([]);

    useEffect(() => {
        //initialize table
        setConfig({source, allowedActions, columns, extraStyles, ExpandableComponent});
    }, []);

    useEffect(() => {
        getTableData(source).then(() => {
        });
    }, [source]);

    const MyTableProvider = useMemo(() => MyTableContext<T>().Provider, [])

    const displayedData = useMemo<T[]>(() => {
        //display inputs with the currently edited but unsaved value
        let dataCopy = tableData.map(row => {
            let change = changes[row.id];
            let newRow = {...row} as IdRequired;
            if (change) {
                Object.keys(change).forEach(k => newRow[k] = change[k]);
            }
            return newRow as T;
        });

        //apply filters
        let filteredColumns = Object.keys(sortState).map(k => parseInt(k));

        filteredColumns.forEach(colIdx => {
            let colFilterMode = filterState[colIdx];
            let column = columns[colIdx];

            let filterFn = getFilterFnForColumn(column, colFilterMode);
            if (filterFn)
                dataCopy = dataCopy.filter(filterFn);
        });

        //sort
        let sortedColumns = Object.keys(sortState).map(k => parseInt(k));

        sortedColumns.forEach(colIdx => {
            let sortDirection = sortState[colIdx];
            let column = columns[colIdx];

            let sortFn = getSortingFnForColumn(column, sortDirection);
            if (sortFn)
                dataCopy.sort(sortFn);
        });

        return dataCopy;
    }, [tableData, changes, sortState, filterState]);

    const getTableData = async (source: HttpSource | ControlledSource<T>) => {
        if (source.mode === 'controlled') {
            setTableData(source.data);
        } else {
            let request: HttpRequest | undefined = source.interface === 'CRUD' ? {
                url: source.endpoint,
                options: {
                    method: 'GET'
                }
            } : source.interface?.GET(source.endpoint, {});

            if (!request) {
                console.error('No configuration in the CustomHttpInterface for method GET');
                return;
            }

            request = source.middleware ? source.middleware(request) : request;

            let response = await executeHttpRequest(request);

            if (response)
                setTableData(response);
        }
    };

    const handleTableCreate = () => {
        //TODO
    };

    const handleTableEdit = () => {
        //TODO
    };

    const handleTableDelete = () => {
        //TODO
    };

    return (
        <MyTableProvider
            value={{changes, setChanges, config, setConfig, sortState, setSortState, filterState, setFilterState}}>
            <table style={{...defaultTableStyles, ...extraStyles?.table ?? {}}} className={'bootstrap-table'}>
                <thead className={'bootstrap-table-thead'}>
                <tr className={'bootstrap-table-thead-tr'}>
                    {ExpandableComponent && <th className={'bootstrap-table-thead-th-expandable'}/>}
                    {columns.map((col, idx) =>
                        <TableHeaderCell
                            key={idx}
                            col={col}
                            colIdx={idx}
                        />
                    )}
                </tr>
                </thead>
                <tbody className={'bootstrap-table-tbody'}>
                {displayedData.map((row, idx) =>
                    <TableRow
                        key={idx}
                        row={row}
                    />
                )}
                </tbody>
            </table>
        </MyTableProvider>
    );
};
