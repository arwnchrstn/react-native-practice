import { View, Pressable, StyleSheet, TextInput } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { useLayoutEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import { deleteExpense, updateExpense, addExpense } from '../store';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import LoadingOverlay from '../components/LoadingOverlay';
import { insertExpense } from '../utils/database';

const ManageExpenseScreen = ({ route, navigation }) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const editedExpenseId = route.params?.expenseId;
	const editedData = route.params?.editedData;

	const handleDelete = () => {
		dispatch(deleteExpense(editedExpenseId));
		navigation.goBack();
	};

	const handleCancel = () => {
		navigation.goBack();
	};

	const handleSubmit = async (expenseData) => {
		setIsLoading(true);
		if (!!editedExpenseId) {
			dispatch(
				updateExpense({
					id: editedExpenseId,
					updatedData: { id: editedExpenseId, ...expenseData }
				})
			);
		} else {
			insertExpense(expenseData)
				.then((result) => {
					dispatch(
						addExpense({ ...expenseData, id: result.insertId })
					);
				})
				.catch((error) => console.log(error));
		}
		navigation.goBack();
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: !!editedExpenseId ? 'Manage Expense' : 'Add Expense'
		});
	}, [editedExpenseId, navigation]);

	if (isLoading) {
		return <LoadingOverlay />;
	}

	return (
		<View style={styles.container}>
			<ExpenseForm
				onSubmit={handleSubmit}
				onCancel={handleCancel}
				isEditing={!!editedExpenseId}
				editedData={editedData}
			/>

			{!!editedExpenseId && (
				<View style={styles.deleteContainer}>
					<Pressable onPress={handleDelete}>
						<Ionicons
							name="ios-trash-sharp"
							size={36}
							color={GlobalStyles.colors.error500}
						/>
					</Pressable>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colors.primary700,
		padding: 20
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: 'center'
	}
});

export default ManageExpenseScreen;
