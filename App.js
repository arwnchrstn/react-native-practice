import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import RecentExpenseScreen from './screens/RecentExpenseScreen';
import AllExpenseScreen from './screens/AllExpenseScreeen';
import AddButton from './components/AddButton';
import ManageExpenseScreen from './screens/ManageExpenseScreen';
import { GlobalStyles } from './constants/styles';
import { Provider } from 'react-redux';
import store from './store';
import { useEffect, useState } from 'react';
import { init } from './utils/database';
import LoadingOverlay from './components/LoadingOverlay';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomNav = () => {
	return (
		<BottomTab.Navigator
			screenOptions={({ navigation }) => ({
				headerRight: () => (
					<AddButton
						onPress={() => navigation.navigate('ManageExpense')}
					/>
				),
				headerStyle: {
					backgroundColor: GlobalStyles.colors.primary500
				},
				headerTintColor: 'white',
				tabBarStyle: {
					backgroundColor: GlobalStyles.colors.primary500
				},
				tabBarActiveTintColor: GlobalStyles.colors.accent500,
				tabBarInactiveTintColor: 'white'
			})}
		>
			<BottomTab.Screen
				name="RecentExpenses"
				component={RecentExpenseScreen}
				options={{
					headerTitle: 'Recent Expenses',
					tabBarLabel: 'Recent Expenses',
					tabBarIcon: ({ color, size }) => (
						<AntDesign
							name="clockcircle"
							size={size}
							color={color}
						/>
					)
				}}
			/>
			<BottomTab.Screen
				name="AllExpense"
				component={AllExpenseScreen}
				options={{
					headerTitle: 'All Expenses',
					tabBarLabel: 'All Expenses',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="ios-cash" size={size} color={color} />
					)
				}}
			/>
		</BottomTab.Navigator>
	);
};

export default function App() {
	const [dbInit, setDbInit] = useState(false);

	useEffect(() => {
		setDbInit(true);
		init()
			.then(() => {
				setDbInit(false);
			})
			.catch((error) => console.log(error));
	}, []);

	if (dbInit) {
		return <LoadingOverlay />;
	}

	return (
		<>
			<StatusBar style="light" />

			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerTintColor: 'white',
							headerStyle: {
								backgroundColor: GlobalStyles.colors.primary500
							}
						}}
					>
						<Stack.Screen
							name="ExpenseOverview"
							component={BottomNav}
							options={{
								headerShown: false
							}}
						/>
						<Stack.Screen
							name="ManageExpense"
							component={ManageExpenseScreen}
							options={{
								headerTitle: 'Manage Expense',
								presentation: 'modal'
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</>
	);
}
