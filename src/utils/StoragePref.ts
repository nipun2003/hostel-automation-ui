export type Storage = {
	hostel_no: number | null;
	room_no: number | null;
	reg_no: string | null;
	electricity_pay: boolean;
	hostel_pay: boolean;
};

const defaultValue = {
	hostel_no: null,
	room_no: null,
	reg_no: null,
	electricity_pay: false,
	hostel_pay: false,
};

const StorageKey = "storage key";

export const StoragePref = {
	set: (value: Storage) => {
		localStorage.setItem(StorageKey, JSON.stringify(value));
	},
	get: (): Storage => {
		const data = localStorage.getItem(StorageKey);
		return data ? JSON.parse(data) : defaultValue;
	},
};
