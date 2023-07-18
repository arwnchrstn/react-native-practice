import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: []
};

const expenseSlice = createSlice({
	name: 'expenses',
	initialState,
	reducers: {
		fetchExpenses: (state, action) => {
			state.data.push(...action.payload);
		},
		addExpense: (state, action) => {
			state.data.push(action.payload);
		},
		updateExpense: (state, action) => {
			const index = state.data.findIndex(
				(e) => e.id === action.payload.id
			);

			state.data.splice(index, 1, action.payload.updatedData);
		},
		deleteExpense: (state, action) => {
			const index = state.data.findIndex((e) => e.id === action.payload);

			state.data.splice(index, 1);
		}
	}
});

export const { addExpense, updateExpense, deleteExpense, fetchExpenses } =
	expenseSlice.actions;
export default expenseSlice.reducer;
