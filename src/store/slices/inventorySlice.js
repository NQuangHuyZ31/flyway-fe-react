import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { inventoryService } from '../../api/services/inventoryService';

export const fetchInventory = createAsyncThunk(
	'inventory/fetchInventory',
	async (params, { rejectWithValue }) => {
		try {
			const response = await inventoryService.getInventory(params);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to fetch inventory',
			);
		}
	},
);

const initialState = {
	items: [],
	loading: false,
	error: null,
	filters: { warehouse: '', product: '', status: 'all' },
	pagination: { page: 1, total: 0, per_page: 15 },
};

const inventorySlice = createSlice({
	name: 'inventory',
	initialState,
	reducers: {
		setFilters: (state, action) => {
			state.filters = { ...state.filters, ...action.payload };
			state.pagination.page = 1;
		},
		setCurrentPage: (state, action) => {
			state.pagination.page = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInventory.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchInventory.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.data || [];
				state.pagination =
					action.payload.pagination || state.pagination;
			})
			.addCase(fetchInventory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { setFilters, setCurrentPage, clearError } =
	inventorySlice.actions;
export default inventorySlice.reducer;
