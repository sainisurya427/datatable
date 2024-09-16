// src/components/CustomSelectionPanel.tsx
import React from 'react';
import { Artwork } from '../types/Artworks';

interface CustomSelectionPanelProps {
  selectedArtworks: Artwork[];
}

const CustomSelectionPanel: React.FC<CustomSelectionPanelProps> = ({ selectedArtworks }) => {
  return (
    <div className="custom-panel">
      <h3>Selected Artworks</h3>
      <ul>
        {selectedArtworks.map((artwork) => (
          <li key={artwork.id}>
            {artwork.title} - {artwork.artist_display}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelectionPanel;
