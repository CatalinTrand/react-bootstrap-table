import React, {useState} from 'react';
import Table from './components/BootstrapTable';
import {ColumnConfig} from './components/BootstrapTable/types';
import {mockSimpleData, MySimpleRowData} from "./mocks";

const columns: ColumnConfig<MySimpleRowData>[] = [
    {
        field: 'name',
        label: 'Name',
        filter: 'as-text',
        isEditable: {
            inputConfig: {
                type: 'text'
            },
            validatorFn: val => val.length < 12 && val.length > 3,
            isDisabled: row => row.age > 40
        },
        sort: 'as-text',
    },
    {
        field: 'age',
        label: 'Age',
        filter: 'as-number',
        isEditable: {
            inputConfig: {
                type: 'number'
            },
            validatorFn: val => val < 100 && val.length > 18,
        },
        sort: 'as-number',
    },
    {
        field: row => row.address.street + ', ' + row.address.city,
        label: 'Full address',
        filter: 'as-text',
        isEditable: {
            inputConfig: {
                type: 'text'
            },
            validatorFn: val => val.length < 12 && val.length > 3,
            isDisabled: row => row.age > 40
        },
        sort: (row1, row2) => row1.address.city.localeCompare(row2.address.city),
    },
    {
        field: row => Math.abs(row.age - 40),
        label: 'Age difference to 40years',
        sort: 'as-number',
    }
];

function App() {

    const [data, setData] = useState<MySimpleRowData[]>(mockSimpleData);

    return (
        <div className="App">
            <Table
                source={{
                    mode: 'controlled',
                    data: data,
                    onSave: setData
                }}
                columns={columns}
            />
        </div>
    );
}

export default App;
