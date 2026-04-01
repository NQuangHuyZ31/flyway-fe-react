import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice.js';
import warehouseReducer from './slices/warehouseSlice.js';
import inventoryReducer from './slices/inventorySlice.js';
import orderReducer from './slices/orderSlice.js';
import quotationReducer from './slices/quotationSlice.js';
import customerReducer from './slices/customerSlice.js';
import uiReducer from './slices/uiSlice.js';
const store = configureStore({
	reducer: {
		products: productReducer,
		warehouse: warehouseReducer,
		inventory: inventoryReducer,
		orders: orderReducer,
		quotations: quotationReducer,
		customers: customerReducer,
		ui: uiReducer,
	},
});
export default store;
