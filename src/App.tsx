import React, { useState } from 'react';
import Table from './components/BootstrapTable';
import { ColumnConfig } from './components/BootstrapTable/types';

interface RowData {
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

const columns: ColumnConfig<RowData>[] = [];

const mockData: RowData[] = [];

function App() {

  const [data, setData] = useState<RowData[]>(mockData);
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
