import React, { useState } from 'react';
import Table from './components/BootstrapTable';
import { ColumnConfig } from './components/BootstrapTable/types';

interface MyRowData {
  id: string,
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

const columns: ColumnConfig[] = [];

const mockData: MyRowData[] = [];

function App() {

  const [data, setData] = useState<MyRowData[]>(mockData);

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
