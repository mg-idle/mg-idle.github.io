export interface Item {
	id: string;
}

export interface Vault {
	items: Item[];
	maxSlots: number;
}

export const vault = $state<Vault>({
	items: [],
	maxSlots: 16
});
