// import React from 'react';
// import { Product } from '../types';

// interface CustomSelectionPanelProps {
//   selectedUsers: Product[];
// }

// const CustomSelectionPanel: React.FC<CustomSelectionPanelProps> = ({ selectedUsers }) => {
//   return (
//     <div className="custom-panel">
//       <h3>Selected Products</h3>
//       <ul>
//         {selectedUsers.map(product => (
//           <li key={product.code}>{product.name} - {product.category}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CustomSelectionPanel;



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
