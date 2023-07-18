import { Pressable, View, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import moment from 'moment/moment';
import { useNavigation } from '@react-navigation/native';

const ExpenseItem = ({ id, description, amount, date }) => {
	const navigation = useNavigation();

	const pressItem = () => {
		navigation.navigate('ManageExpense', {
			expenseId: id,
			editedData: { description, amount, date }
		});
	};

	return (
		<Pressable
			style={({ pressed }) => (pressed ? styles.pressed : null)}
			onPress={pressItem}
		>
			<View style={styles.expenseItem}>
				<View>
					<Text style={[styles.textBase, styles.description]}>
						{description}
					</Text>
					<Text style={styles.textBase}>
						{moment(date).format('MMM DD, YYYY')}
					</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text style={styles.amount}>
						${Number(amount).toFixed(2)}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	expenseItem: {
		padding: 12,
		marginVertical: 8,
		backgroundColor: GlobalStyles.colors.primary500,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 6,
		elevation: 3,
		shadowColor: GlobalStyles.colors.gray500,
		shadowOpacity: 0.4,
		shadowRadius: 4,
		shadowOffset: {
			width: 1,
			height: 1
		}
	},
	textBase: {
		color: GlobalStyles.colors.primary50
	},
	description: {
		fontSize: 16,
		marginBottom: 4,
		fontWeight: 'bold'
	},
	amountContainer: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4
	},
	amount: {
		color: GlobalStyles.colors.primary500,
		fontWeight: 'bold'
	},
	pressed: {
		opacity: 0.6
	}
});

export default ExpenseItem;
