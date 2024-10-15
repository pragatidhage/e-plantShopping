import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {

        existingItem.quantity++;
        state.totalQuantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
        state.totalQuantity++;
      }
    },
    removeItem: (state, action) => {


      const { name } = action.payload;
      const itemToRemove = state.items.find(item => item.name === name);

      if (itemToRemove) {
        // Update totalQuantity by subtracting the quantity of the removed item
        state.totalQuantity -= itemToRemove.quantity;

        // Remove the item from the items array
        state.items = state.items.filter(item => item.name !== name);
      }



    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        state.totalQuantity += quantity - itemToUpdate.quantity;
        itemToUpdate.quantity = quantity;
      }

    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
