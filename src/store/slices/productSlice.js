import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../api/services/productService';

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async (params, { rejectWithValue }) => {
		try {
			const response = await productService.getProducts(params);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to fetch products',
			);
		}
	},
);

export const fetchProductDetail = createAsyncThunk(
	'products/fetchProductDetail',
	async (id, { rejectWithValue }) => {
		try {
			const response = await productService.getProduct(id);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to fetch product',
			);
		}
	},
);

export const createProduct = createAsyncThunk(
	'products/createProduct',
	async (data, { rejectWithValue }) => {
		try {
			const response = await productService.createProduct(data);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to create product',
			);
		}
	},
);

export const updateProduct = createAsyncThunk(
	'products/updateProduct',
	async ({ id, data }, { rejectWithValue }) => {
		try {
			const response = await productService.updateProduct(id, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to update product',
			);
		}
	},
);

export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
	async (id, { rejectWithValue }) => {
		try {
			await productService.deleteProduct(id);
			return id;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to delete product',
			);
		}
	},
);

const initialState = {
	items: [],
	selectedProduct: null,
	loading: false,
	loadingDetail: false,
	error: null,
	pagination: { page: 1, totalPages: 1, total: 0, per_page: 15 },
	filters: { search: '', category: '', status: 'active' },
};

const productSlice = createSlice({
	name: 'products',
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
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.data || [];
				state.pagination =
					action.payload.pagination || state.pagination;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchProductDetail.pending, (state) => {
				state.loadingDetail = true;
			})
			.addCase(fetchProductDetail.fulfilled, (state, action) => {
				state.loadingDetail = false;
				state.selectedProduct = action.payload;
			})
			.addCase(fetchProductDetail.rejected, (state, action) => {
				state.loadingDetail = false;
				state.error = action.payload;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.items.unshift(action.payload);
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				const index = state.items.findIndex(
					(p) => p.id === action.payload.id,
				);
				if (index >= 0) {
					state.items[index] = action.payload;
				}
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.items = state.items.filter(
					(p) => p.id !== action.payload,
				);
			});
	},
});

export const { setFilters, setCurrentPage, clearError } = productSlice.actions;
export default productSlice.reducer;
