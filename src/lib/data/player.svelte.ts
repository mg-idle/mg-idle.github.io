export interface Player {
	exp: number;
	fame: number;
	attack: number;
	health: number;
	maxHealth: number;
}

const playerStats = $state<Player>({
	exp: 0,
	fame: 0,
	attack: 1,
	health: 10,
	maxHealth: 10
});

export const player = {
	get exp() {
		return playerStats.exp;
	},
	get fame() {
		return playerStats.fame;
	},
	get attack() {
		return playerStats.attack;
	},
	get health() {
		return playerStats.health;
	},
	get maxHealth() {
		return playerStats.maxHealth;
	},
	takeDamage(damage: number) {
		playerStats.health -= damage;
	},
	gainExp(exp: number) {
		playerStats.exp += exp;
	},
	regen() {
		playerStats.health = playerStats.maxHealth;
	}
};
