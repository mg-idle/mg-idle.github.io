export interface Player {
	exp: number;
	fame: number;
	attack: number;
	health: number;
	maxHealth: number;
}

export const player = $state<Player>({
	exp: 0,
	fame: 0,
	attack: 1,
	health: 10,
	maxHealth: 10
});
