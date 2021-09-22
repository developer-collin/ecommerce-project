import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  sections: [
    {
      title: 'hats',
      imageFilename: 'hats.png',
      id: 1,
      linkUrl: 'shop/hats'
    },
    {
      title: 'jackets',
      imageFilename: 'jackets.png',
      id: 2,
      linkUrl: 'shop/jackets'
    },
    {
      title: 'sneakers',
      imageFilename: 'sneakers.png',
      id: 3,
      linkUrl: 'shop/sneakers'
    },
    {
      title: 'womens',
      imageFilename: 'womens.png',
      size: 'large',
      id: 4,
      linkUrl: 'shop/womens'
    },
    {
      title: 'mens',
      imageFilename: 'men.png',
      size: 'large',
      id: 5,
      linkUrl: 'shop/mens'
    }
  ]
};

const directorySlice = createSlice({
  name: 'directory',
  initialState: INITIAL_STATE,
});

export default directorySlice.reducer;