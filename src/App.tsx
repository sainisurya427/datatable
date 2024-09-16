// import React, { useState } from 'react';
// import { DataTable, DataTableSelectionChangeParams } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import CustomSelectionPanel from './components/CustomSelectionPanel';

// interface Product {
//   code: string;
//   name: string;
//   category: string;
// }

// const App: React.FC = () => {
//   // Provided static data
//   const products: Product[] = [
//     { code: 'f230fh0g3', name: 'Bamboo Watch', category: 'Accessories' },
//     { code: 'nvklal433', name: 'Black Watch', category: 'Accessories' },
//     { code: 'zz21cz3c1', name: 'Blue Band', category: 'Fitness' },
//     { code: '244wgerg2', name: 'Blue T-Shirt', category: 'Clothing' },
//     { code: 'h456wer53', name: 'Bracelet', category: 'Accessories' }
//   ];

//   const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

//   // Handle row selection
//   const onRowSelect = (e: { value: Product[] }) => {
//     setSelectedProducts(e.value);
//   };
  

//   return (
//     <div className="card">
//       <DataTable
//         value={products}
//         selection={selectedProducts}
//         onSelectionChange={onRowSelect}
//         paginator
//         rows={5}
//         selectionMode="checkbox"
//       >
//         <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
//         <Column field="code" header="Code"></Column>
//         <Column field="name" header="Name"></Column>
//         <Column field="category" header="Category"></Column>
//       </DataTable>

//       {/* Custom Selection Panel */}
//       <CustomSelectionPanel selectedUsers={selectedProducts} />
//     </div>
//   );
// };

// export default App;



// src/App.tsx
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CustomSelectionPanel from './components/CustomSelectionPanel';
import axios from 'axios';
import { Artwork } from './types/Artworks';

const App: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${page + 1}`);
        const data = response.data.data;
        const total = response.data.pagination.total;
        setArtworks(data);
        setTotalRecords(total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchArtworks();
  }, [page, rowsPerPage]);

  const onRowSelect = (e: { value: Artwork[] }) => {
    setSelectedArtworks(e.value);
  };

  return (
    <div className="card">
      <DataTable
        value={artworks}
        selection={selectedArtworks}
        onSelectionChange={(e) => onRowSelect(e as { value: Artwork[] })}
        paginator
        rows={rowsPerPage}
        totalRecords={totalRecords}
        onPage={(e) => setPage(e.page)}
        rowsPerPageOptions={[5, 10, 20]}
        selectionMode="checkbox"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
        <Column field="title" header="Title"></Column>
        <Column field="place_of_origin" header="Place of Origin"></Column>
        <Column field="artist_display" header="Artist"></Column>
        <Column field="inscriptions" header="Inscriptions"></Column>
        <Column field="date_start" header="Start Date"></Column>
        <Column field="date_end" header="End Date"></Column>
      </DataTable>

      {/* Custom Selection Panel */}
      <CustomSelectionPanel selectedArtworks={selectedArtworks} />
    </div>
  );
};

export default App;
