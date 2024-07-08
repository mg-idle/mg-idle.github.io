import { toast } from 'svelte-sonner';
import { currentEnemy } from './enemies.svelte';
import { player } from './player.svelte';
import { vault } from './vault.svelte';
import { goto } from '$app/navigation';

const tickDelay = 1000;

export const game = {
	vault,
	player,
	currentEnemy,
	tick() {
		if (currentEnemy.health && currentEnemy.enemy) {
			currentEnemy.attack(player.attack);
			player.takeDamage(currentEnemy.enemy.attack);
		}

		if (currentEnemy.health !== null && currentEnemy.health <= 0) {
			currentEnemy.respawn();
			player.gainExp(currentEnemy.enemy?.exp ?? 0);
			player.regen();
			toast.success(`You defeated the ${currentEnemy.enemy?.name}!`, {
				description: `You gained ${currentEnemy.enemy?.exp ?? 0} exp.`
			});
		}

		if (player.health <= 0) {
			goto('/');
			player.regen();
			toast.error("You've been defeated!", {
				description: 'You have been returned to the Nexus.'
			});
		}
	},
	start() {
		this.tick();
		const intervalId = setInterval(() => this.tick(), tickDelay);

		return () => clearInterval(intervalId);
	}
};
