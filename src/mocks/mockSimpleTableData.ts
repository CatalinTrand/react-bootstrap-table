export interface MySimpleRowData extends IdRequired {
    name: string,
    age: number,
    address: {
        city: string,
        street: string
    },
    photos: {
        thumbnail: string,
    },
}

export const mockSimpleData: MySimpleRowData[] = [
    {
        id: '1',
        name: 'Name One',
        age: 25,
        address: {
            city: 'Some City',
            street: 'Some street',
        },
        photos: {
            thumbnail: 'thumbnail1.jpg'
        }
    },
    {
        id: '2',
        name: 'Name Two',
        age: 35,
        address: {
            city: 'Some City',
            street: 'Some street',
        },
        photos: {
            thumbnail: 'thumbnail2.jpg'
        }
    },
    {
        id: '3',
        name: 'Name Three',
        age: 45,
        address: {
            city: 'Some City',
            street: 'Some street',
        },
        photos: {
            thumbnail: 'thumbnail3.jpg'
        }
    }
];