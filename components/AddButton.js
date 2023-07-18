import { Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const AddButton = ({ onPress }) => {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				pressed ? styles.pressed : null,
				styles.button
			]}
		>
			<AntDesign name="plus" size={24} color="white" />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.6
	},
	button: { paddingRight: 15, color: 'white' }
});

export default AddButton;
