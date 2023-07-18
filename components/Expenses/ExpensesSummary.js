import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const ExpensesSummary = ({ periodName, expenses }) => {
	const expenseSum = expenses.reduce((sum, expense) => {
		return sum + Number(expense.amount);
	}, 0);

	return (
		<View style={styles.container}>
			<Text style={styles.period}>{periodName}</Text>
			<Text style={styles.sum}>${expenseSum}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 8,
		backgroundColor: GlobalStyles.colors.primary50,
		borderRadius: 6,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	period: {
		fontSize: 16,
		color: GlobalStyles.colors.primary400
	},
	sum: {
		fontSize: 16,
		color: GlobalStyles.colors.primary500,
		fontWeight: 'bold'
	}
});

export default ExpensesSummary;
