const { createSlice } = require("@reduxjs/toolkit");

const photos = createSlice({
  name: "photo",
  initialState: [],
  reducers: {
    addPhoto: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { reducer, actions } = photos;
export const { addPhoto } = actions;
export default reducer;
