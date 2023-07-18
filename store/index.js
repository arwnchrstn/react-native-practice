import { configureStore } from '@reduxjs/toolkit';
import expenseReducer, {
	addExpense,
	updateExpense,
	deleteExpense,
	fetchExpenses
} from './slices/expenseSlice';

const store = configureStore({
	reducer: {
		expenses: expenseReducer
	}
});

export default store;
export { addExpense, updateExpense, deleteExpense, fetchExpenses };
