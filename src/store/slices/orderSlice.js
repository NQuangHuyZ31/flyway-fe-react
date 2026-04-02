import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../api/services/orderService';

export const fetchOrders = createAsyncThunk(
	'orders/fetchOrders',
	async (params, { rejectWithValue }) => {
		try {
			const response = await orderService.getOrders(params);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to fetch orders',
			);
		}
	},
);

export const fetchOrderDetail = createAsyncThunk(
	'orders/fetchOrderDetail',
	async (id, { rejectWithValue }) => {
		try {
			const response = await orderService.getOrder(id);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to fetch order',
			);
		}
	},
);

const initialState = {
	items: [],
	selectedOrder: null,
	loading: false,
	error: null,
	filters: { status: 'all', customer: '' },
	pagination: { page: 1, total: 0, per_page: 15 },
};

const orderSlice = createSlice({
	name: 'orders',
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
			.addCase(fetchOrders.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchOrders.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.data || [];
				state.pagination =
					action.payload.pagination || state.pagination;
			})
			.addCase(fetchOrders.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchOrderDetail.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchOrderDetail.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedOrder = action.payload;
			})
			.addCase(fetchOrderDetail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { setFilters, clearError } = orderSlice.actions;
export default orderSlice.reducer;
