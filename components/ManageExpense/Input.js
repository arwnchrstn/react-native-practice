import { Text, View, TextInput, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Input = ({ label, textInputConfig, style }) => {
	return (
		<View style={[styles.inputContainer, { ...style }]}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				{...textInputConfig}
				style={[
					styles.input,
					textInputConfig.multiline && styles.inutMultiline
				]}
				cursorColor="white"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		marginHorizontal: 4,
		marginVertical: 8
	},
	label: {
		color: GlobalStyles.colors.primary100,
		fontSize: 14,
		marginBottom: 4
	},
	input: {
		backgroundColor: GlobalStyles.colors.primary100,
		padding: 6,
		borderRadius: 6,
		fontSize: 18,
		color: GlobalStyles.colors.primary700
	},
	inutMultiline: {
		minHeight: 100,
		textAlignVertical: 'top'
	}
});

export default Input;
