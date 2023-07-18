import { FlatList, Text } from 'react-native';
import ExpenseItem from './ExpenseItem';

const renderExpenses = (itemData) => {
	return <ExpenseItem {...itemData.item} />;
};

const ExpensesList = ({ expenses }) => {
	if (expenses.length === 0) {
		return (
			<Text
				style={{ textAlign: 'center', color: 'white', marginTop: 12 }}
			>
				No expenses found
			</Text>
		);
	}

	return (
		<FlatList
			data={expenses}
			renderItem={renderExpenses}
			keyExtractor={(item) => item.id}
		/>
	);
};

export default ExpensesList;
