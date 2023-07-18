import { useDispatch, useSelector } from 'react-redux';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { useEffect } from 'react';
import { fetchExpenses as fetch } from '../utils/database';
import { fetchExpenses } from '../store';

const AllExpenseScreen = () => {
	const { data: expenses } = useSelector((state) => state.expenses);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const expenses = await fetch();
			dispatch(fetchExpenses(expenses.rows._array));
		})();
	}, []);

	return <ExpensesOutput expenses={expenses} periodName="Total" />;
};

export default AllExpenseScreen;
