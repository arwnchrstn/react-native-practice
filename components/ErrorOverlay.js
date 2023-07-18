import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import Button from './Button';

const ErrorOverlay = ({ error, onConfirm }) => {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles.title]}>An error occurred</Text>
			<Text style={styles.text}>{error}</Text>
			<Button onPress={onConfirm}>Okay</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary700
	},
	text: {
		textAlign: 'center',
		marginBottom: 8,
		color: 'white'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	}
});

export default ErrorOverlay;
