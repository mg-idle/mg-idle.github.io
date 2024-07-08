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
		if (currentEnemy.enemy) {
			currentEnemy.attack(player.attack);
			player.takeDamage(currentEnemy.enemy.attack);
		} else {
			player.regen();
		}

		if (currentEnemy.health !== null && currentEnemy.health <= 0) {
			player.gainExp(currentEnemy.enemy?.exp ?? 0);
			player.regen();
			currentEnemy.respawn();
			toast.success(`You defeated the ${currentEnemy.enemy?.name}!`, {
				description: `You gained ${currentEnemy.enemy?.exp ?? 0} exp.`
			});
		} else if (player.health <= 0) {
			goto('/');
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
