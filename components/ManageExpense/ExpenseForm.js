import { useState } from 'react';

import { StyleSheet, View, Text, Alert } from 'react-native';
import Input from './Input';
import Button from '../Button';
import moment from 'moment';

const ExpenseForm = ({ onCancel, onSubmit, isEditing, editedData }) => {
	const [formValues, setFormValues] = useState({
		amount: editedData?.amount.toString() || '',
		date: editedData?.date
			? moment(editedData?.date).format('YYYY-MM-DD')
			: '',
		description: editedData?.description || ''
	});

	const handleInputChange = (identifier, enteredValue) => {
		setFormValues((currFormValues) => {
			return { ...currFormValues, [identifier]: enteredValue };
		});
	};

	const handleSubmit = () => {
		const expenseData = {
			amount: Number(formValues.amount),
			date: formValues.date
				? new Date(formValues.date).toISOString()
				: '',
			description: formValues.description.trim()
		};

		const isAmountValid =
			!isNaN(expenseData.amount) && expenseData.amount > 0;
		const isDateValid =
			new Date(formValues.date).toString() !== 'Invalid Date';
		const isDescriptionValid = expenseData.description;

		if (!isAmountValid) {
			Alert.alert(
				'Please enter a valid number and must be greater than zero.'
			);
			return;
		}

		if (!isDateValid) {
			Alert.alert(
				'Please enter valid date. Use the date format YYYY-MM-DD'
			);
			return;
		}

		if (!isDescriptionValid) {
			Alert.alert('Please enter a description');
			return;
		}

		onSubmit(expenseData);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputRow}>
				<Input
					label="Amount"
					textInputConfig={{
						keyboardType: 'decimal-pad',
						value: formValues.amount,
						onChangeText: handleInputChange.bind(this, 'amount')
					}}
					style={styles.input}
				/>
				<Input
					label="Date"
					textInputConfig={{
						placeholder: 'YYYY-MM-DD',
						maxLength: 10,
						value: formValues.date,
						onChangeText: handleInputChange.bind(this, 'date')
					}}
					style={styles.input}
				/>
			</View>
			<Input
				label="Description"
				textInputConfig={{
					multiline: true,
					autoCorrect: false,
					value: formValues.description,
					onChangeText: handleInputChange.bind(this, 'description')
				}}
			/>

			<View style={styles.buttons}>
				<Button mode="flat" onPress={onCancel} style={styles.button}>
					Cancel
				</Button>
				<Button onPress={handleSubmit} style={styles.button}>
					{isEditing ? 'Update' : 'Add'}
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 30
	},
	title: {
		color: 'white',
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 15
	},
	inputRow: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	input: {
		flex: 1
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8
	}
});

export default ExpenseForm;
