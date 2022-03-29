# Getting Started with React Bootstrap Table

## Installation

In your project directory, run:

`npm install react-bootstrap-table`

## Usage    

```
import Table from 'react-bootstrap-table';

const tableConfig = {
    source: {
        mode: 'http',
        endpoint: 'http://api.my-website.com/users/',
        interface: 'CRUD',
        middleware: (req) => {
            req.headers = {
                'Authorization': 'Bearer <your-token>'
            }
            return req;
        }
    },
    allowedActions: ['read', 'write']
    columns: [
        {
            label: 'Name',
            field: 'name',
            extraStyle: {
                width: 150,
            }
            sort: 'text',
        },
        {
            label: 'Photo',
            field: (row) => <img src={row.photos.thumbnail}/>,
        },
        {
            label: <b>Full Address</b>,
            field: (row) => row.address.city + ", " + row.address.street,
        },
        {
            label: 'Age',
            field: 'age',
            isEditable: {
                inputType: 'number'
                validatorFn: (val) => val > 0 && val < 100,
                isDisabled: (row) => row.photos.thumbnail === undefined
            }
        }
    ]
};

//for this example, suppose GET 'http://api.my-website.com/users/' returns this:
let response = [
    {
        id: '123',
        name: 'John T',
        age: 45,
        photos: {
            thumbnail: 'http://example-url.com/image',
        },
        address: {
            city: 'New York',
            street: 'Maddison Avenue 12',
        },
    }
];

//the table will automatically handle data fetching and changes if source.mode = 'http'

export function App() {
    return (
        <Table {...tableConfig}/>
    );
}
```
