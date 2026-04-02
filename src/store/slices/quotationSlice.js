import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { quotationService } from '../../api/services/quotationService';

export const fetchQuotations = createAsyncThunk(
	'quotations/fetchQuotations',
	async (params, { rejectWithValue }) => {
		try {
			const response = await quotationService.getQuotations(params);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to fetch quotations',
			);
		}
	},
);

const initialState = {
	items: [],
	selectedQuotation: null,
	loading: false,
	error: null,
	filters: { status: 'all', customer: '' },
	pagination: { page: 1, total: 0, per_page: 15 },
};

const quotationSlice = createSlice({
	name: 'quotations',
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
			.addCase(fetchQuotations.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchQuotations.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.data || [];
				state.pagination =
					action.payload.pagination || state.pagination;
			})
			.addCase(fetchQuotations.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { setFilters, clearError } = quotationSlice.actions;
export default quotationSlice.reducer;
