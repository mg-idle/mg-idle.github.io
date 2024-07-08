<script lang="ts">
	import Meta from '$lib/components/meta.svelte';
	import TreePalm from 'phosphor-svelte/lib/TreePalm';
	import { player } from '$lib/data/player.svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { currentEnemy, enemies, zones, type EnemyType } from '$lib/data/enemies.svelte';

	const tickDelay = 1000;

	$effect(() => {
		let timeoutId: number;

		if (currentEnemy.health !== null && currentEnemy.health <= 0) {
			currentEnemy.respawn();
			player.exp += 1;
			player.health = player.maxHealth;
			toast.success(`You defeated the ${currentEnemy.enemy?.name}!`);
		}

		if (player.health <= 0) {
			goto('/');
			player.health = player.maxHealth;
			toast.error("You've been defeated!");
		}

		if (currentEnemy.health) {
			timeoutId = setTimeout(() => {
				if (currentEnemy.health !== null && currentEnemy.enemy) {
					currentEnemy.attack(player.attack);
					player.health -= currentEnemy.enemy.attack;
				}
			}, tickDelay);
		}

		return () => clearTimeout(timeoutId);
	});

	$effect(() => {
		console.log({
			fightingEnemy: currentEnemy.type,
			enemyHealth: currentEnemy.health,
			playerHealth: player.health,
			playerAttack: player.attack,
			playerExp: player.exp
		});
	});
</script>

<Meta title="Beach - Realm" />

<header class="w-full bg-amber-200 p-4 text-amber-950">
	<h2 class="text-xl">
		<TreePalm weight="duotone" class="inline size-6" />
		<span>Beach</span>
		<span class="text-base text-amber-900">(lvl 1-5)</span>
	</h2>
</header>

<div class="p-4">
	<section class="space-y-2">
		<h3 class="text-lg">Enemies</h3>
		<div class="flex flex-wrap gap-4">
			{#each Object.entries(enemies).filter(([, enemy]) => enemy.zone === zones.beach) as [enemyId, enemy] (enemyId)}
				<div class="w-48 bg-amber-100 p-2 shadow-sm">
					<h4 class="text-lg">{enemy.name}</h4>
					<p class="text-amber-900">{enemy.attack} attack</p>
					<p class="text-amber-900">{enemy.health} health</p>
					<button
						class="w-full cursor-pointer bg-amber-500 py-1 px-2 text-center text-lg text-amber-50 shadow-md"
						onclick={() => {
							if (currentEnemy.type !== enemyId) {
								currentEnemy.fightEnemy(enemyId as EnemyType);
							} else {
								currentEnemy.stopFighting();
							}
						}}>{currentEnemy.type !== enemyId ? 'Fight!' : 'Stop'}</button
					>
				</div>
			{/each}
		</div>
	</section>
</div>
