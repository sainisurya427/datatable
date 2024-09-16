 import React, { useState, useEffect } from 'react';
import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

const App: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [rowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [selectAll, setSelectAll] = useState<boolean>(false); // State for external checkbox

  // Fetch artworks data from API
  const fetchArtworks = async (page: number) => {
    setLoading(true);
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page + 1}`);
    const data = await response.json();
    setArtworks(data.data);
    setTotalRecords(data.pagination.total);
    setLoading(false);
  };

  // Handle page change
  const handlePageChange = (event: DataTablePageEvent) => {
    const newPage = event.page !== undefined ? event.page : 0; // Ensure page is always a number
    setPage(newPage);
  };

  // Fetch artworks when page changes
  useEffect(() => {
    fetchArtworks(page);
  }, [page]);

  // Render row selection checkbox
  const onSelectionChange = (e: { value: Artwork[] }) => {
    setSelectedArtworks(e.value);
  };

  // Select all rows using the external Checkbox
  const handleSelectAll = (event: CheckboxChangeEvent) => {
    setSelectAll(event.checked ?? false); // Default to false if undefined
    if (event.checked) {
      setSelectedArtworks(artworks); // Select all visible artworks
    } else {
      setSelectedArtworks([]); // Deselect all
    }
  };

  // Clear selected rows when button is clicked
  const clearSelection = () => {
    setSelectedArtworks([]);
    setSelectAll(false);
  };

  // Column template functions
  const titleBodyTemplate = (rowData: Artwork) => rowData.title;
  const placeOfOriginBodyTemplate = (rowData: Artwork) => rowData.place_of_origin;
  const artistDisplayBodyTemplate = (rowData: Artwork) => rowData.artist_display;
  const inscriptionsBodyTemplate = (rowData: Artwork) => rowData.inscriptions;
  const dateStartBodyTemplate = (rowData: Artwork) => rowData.date_start;
  const dateEndBodyTemplate = (rowData: Artwork) => rowData.date_end;

  return (
    <div className="App">
      <h1>Artworks Table</h1>
      <div className="toolbar">
        <Checkbox 
          inputId="selectAll" 
          onChange={handleSelectAll} 
          checked={selectAll} 
          label="Select All"
        />
        <label htmlFor="selectAll" className="p-checkbox-label">
          Select All Rows
        </label>
        <Button 
          label="Clear Selection" 
          icon="pi pi-times" 
          className="p-button-danger" 
          onClick={clearSelection} 
          style={{ marginLeft: '10px' }}
        />
      </div>

      <DataTable
        value={artworks}
        paginator
        rows={rowsPerPage}
        totalRecords={totalRecords}
        lazy
        first={page * rowsPerPage}
        onPage={handlePageChange}
        loading={loading}
        selection={selectedArtworks}
        onSelectionChange={onSelectionChange}
        selectionMode="checkbox"
        dataKey="id"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
        <Column field="title" header="Title" body={titleBodyTemplate}></Column>
        <Column field="place_of_origin" header="Place of Origin" body={placeOfOriginBodyTemplate}></Column>
        <Column field="artist_display" header="Artist" body={artistDisplayBodyTemplate}></Column>
        <Column field="inscriptions" header="Inscriptions" body={inscriptionsBodyTemplate}></Column>
        <Column field="date_start" header="Start Date" body={dateStartBodyTemplate}></Column>
        <Column field="date_end" header="End Date" body={dateEndBodyTemplate}></Column>
      </DataTable>

      <div className="selection-panel">
        <h3>Selected Artworks</h3>
        {selectedArtworks.map((artwork) => (
          <div key={artwork.id}>
            <p>{artwork.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
