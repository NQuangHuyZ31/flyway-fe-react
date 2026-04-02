import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { warehouseService } from '../../api/services/warehouseService';

export const fetchWarehouses = createAsyncThunk(
	'warehouse/fetchWarehouses',
	async (params, { rejectWithValue }) => {
		try {
			const response = await warehouseService.getWarehouses(params);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to fetch warehouses',
			);
		}
	},
);

export const fetchWarehouseDetail = createAsyncThunk(
	'warehouse/fetchWarehouseDetail',
	async (id, { rejectWithValue }) => {
		try {
			const response = await warehouseService.getWarehouse(id);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to fetch warehouse',
			);
		}
	},
);

export const createWarehouse = createAsyncThunk(
	'warehouse/createWarehouse',
	async (data, { rejectWithValue }) => {
		try {
			const response = await warehouseService.createWarehouse(data);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to create warehouse',
			);
		}
	},
);

const initialState = {
	items: [],
	selectedWarehouse: null,
	sections: [],
	loading: false,
	error: null,
	filters: { search: '', status: 'active' },
};

const warehouseSlice = createSlice({
	name: 'warehouse',
	initialState,
	reducers: {
		setFilters: (state, action) => {
			state.filters = { ...state.filters, ...action.payload };
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWarehouses.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchWarehouses.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.data || [];
			})
			.addCase(fetchWarehouses.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchWarehouseDetail.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchWarehouseDetail.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedWarehouse = action.payload;
			})
			.addCase(fetchWarehouseDetail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(createWarehouse.fulfilled, (state, action) => {
				state.items.unshift(action.payload);
			});
	},
});

export const { setFilters, clearError } = warehouseSlice.actions;
export default warehouseSlice.reducer;
