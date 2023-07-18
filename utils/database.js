import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('expense.db');

export const init = () => {
	return new Promise((resolve, reject) => {
		database.transaction((trans) => {
			trans.executeSql(
				`CREATE TABLE IF NOT EXISTS expense (
                id INTEGER PRIMARY KEY NOT NULL,
                amount TEXT NOT NULL,
                date DATE NOT NULL,
                description TEXT NOT NULL
            )`,
				[],
				() => {
					resolve();
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};

export const insertExpense = (expense) => {
	return new Promise((resolve, reject) => {
		database.transaction((trans) => {
			trans.executeSql(
				`INSERT INTO expense(amount, date, description) VALUES (?,?,?)`,
				[expense.amount, expense.date, expense.description],
				(_, result) => {
					resolve(result);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};

export const fetchExpenses = () => {
	return new Promise((resolve, reject) => {
		database.transaction((trans) => {
			trans.executeSql(
				`SELECT * from expense`,
				[],
				(_, result) => {
					resolve(result);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};
