import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customerService } from '../../api/services/customerService';

export const fetchCustomers = createAsyncThunk(
	'customers/fetchCustomers',
	async (params, { rejectWithValue }) => {
		try {
			const response = await customerService.getCustomers(params);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to fetch customers',
			);
		}
	},
);

const initialState = {
	items: [],
	selectedCustomer: null,
	loading: false,
	error: null,
	filters: { search: '', status: 'active' },
	pagination: { page: 1, total: 0, per_page: 15 },
};

const customerSlice = createSlice({
	name: 'customers',
	initialState,
	reducers: {
		setFilters: (state, action) => {
			state.filters = { ...state.filters, ...action.payload };
			state.pagination.page = 1;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCustomers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCustomers.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.data || [];
				state.pagination =
					action.payload.pagination || state.pagination;
			})
			.addCase(fetchCustomers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { setFilters, clearError } = customerSlice.actions;
export default customerSlice.reducer;
