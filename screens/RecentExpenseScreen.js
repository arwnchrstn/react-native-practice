import { Text } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { useEffect, useState } from 'react';
import { fetchExpenses } from '../store';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';

const RecentExpenseScreen = () => {
	const dispatch = useDispatch();
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState('');
	const { data: expenses } = useSelector((state) => state.expenses);

	const filteredExpense = expenses.filter((e) => {
		const days =
			(new Date().getTime() - new Date(e.date).getTime()) /
			1000 /
			60 /
			60 /
			24;

		return Math.floor(days) <= 7;
	});

	const errorHandler = () => {
		setError(null);
	};

	if (error && !isFetching) {
		return <ErrorOverlay error={error} onConfirm={errorHandler} />;
	}

	if (isFetching) {
		return <LoadingOverlay />;
	}

	return (
		<ExpensesOutput expenses={filteredExpense} periodName="Last 7 Days" />
	);
};

export default RecentExpenseScreen;
