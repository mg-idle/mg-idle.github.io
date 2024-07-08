export const zones = {
	beach: 'beach'
} as const;

export type Zone = (typeof zones)[keyof typeof zones];

export interface Enemy {
	name: string;
	attack: number;
	health: number;
	exp: number;
	zone: Zone;
}

export const enemies = {
	crab: {
		name: 'Crab',
		attack: 1,
		health: 3,
		exp: 1,
		zone: zones.beach
	},
	scorpion: {
		name: 'Scorpion',
		attack: 2,
		health: 5,
		exp: 2,
		zone: zones.beach
	},
	pirate: {
		name: 'Pirate',
		attack: 5,
		health: 10,
		exp: 3,
		zone: zones.beach
	}
} as const satisfies Record<string, Enemy>;

export type EnemyType = keyof typeof enemies;

let target = $state<{ type: EnemyType; health: number } | null>(null);

export const currentEnemy = {
	get enemy() {
		return target && enemies[target.type];
	},
	get health() {
		return target && target.health;
	},
	get type() {
		return target && target.type;
	},
	/** Deal damage to the current target. */
	attack(damage: number) {
		if (target) {
			target.health -= damage;
		}
	},
	/** Start fighting an enemy of the given type. */
	fightEnemy(type: EnemyType) {
		target = {
			type,
			health: enemies[type].health
		};
	},
	/** Respawn the current target. */
	respawn() {
		target = target
			? {
					type: target.type,
					health: enemies[target.type].health
				}
			: null;
	},
	/** Stop fighting the current target */
	stopFighting() {
		target = null;
	}
};
