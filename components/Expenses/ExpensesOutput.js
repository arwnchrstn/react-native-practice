import { View, StyleSheet, Text } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

const ExpensesOutput = ({ expenses, periodName }) => {
	return (
		<View style={styles.container}>
			<ExpensesSummary expenses={expenses} periodName={periodName} />
			<ExpensesList expenses={expenses} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 24,
		paddingBottom: 0,
		backgroundColor: GlobalStyles.colors.primary700,
		flex: 1
	}
});

export default ExpensesOutput;
