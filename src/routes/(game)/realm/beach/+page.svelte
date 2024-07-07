<script lang="ts">
	import Meta from '$lib/components/meta.svelte';
	import TreePalm from 'phosphor-svelte/lib/TreePalm';
	import { player } from '$lib/data/player.svelte';
	import { toast } from 'svelte-sonner';
	import { goto, pushState } from '$app/navigation';

	const enemies = {
		crab: {
			name: 'Crab',
			attack: 1,
			health: 3,
			exp: 1
		},
		scorpion: {
			name: 'Scorpion',
			attack: 2,
			health: 5,
			exp: 2
		},
		pirate: {
			name: 'Pirate',
			attack: 5,
			health: 10,
			exp: 3
		}
	};

	type EnemyType = keyof typeof enemies;

	let fightingEnemy = $state<EnemyType | null>(null);
	let enemyHealth = $state<number | null>(null);
	const tickDelay = 1000;

	$effect(() => {
		let timeoutId: number;
		let currentEnemy = fightingEnemy ? enemies[fightingEnemy] : null;

		if (currentEnemy && enemyHealth !== null && enemyHealth <= 0) {
			enemyHealth = currentEnemy?.health;
			player.exp += 1;
			player.health = player.maxHealth;
			toast.success(`You defeated the ${currentEnemy.name}!`);
		}

		if (player.health <= 0) {
			goto('/');
			player.health = player.maxHealth;
			toast.error("You've been defeated!");
		}

		if (currentEnemy && enemyHealth) {
			timeoutId = setTimeout(() => {
				if (enemyHealth !== null) {
					enemyHealth -= player.attack;
					player.health -= currentEnemy.attack;
				}
			}, tickDelay);
		}

		return () => clearTimeout(timeoutId);
	});

	$effect(() => {
		console.log({
			fightingEnemy,
			enemyHealth,
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
			{#each Object.entries(enemies) as [enemyId, enemy] (enemyId)}
				<div class="w-48 bg-amber-100 p-2 shadow-sm">
					<h4 class="text-lg">{enemy.name}</h4>
					<p class="text-amber-900">{enemy.attack} attack</p>
					<p class="text-amber-900">{enemy.health} health</p>
					<button
						class="w-full cursor-pointer bg-amber-500 py-1 px-2 text-center text-lg text-amber-50 shadow-md"
						onclick={() => {
							fightingEnemy = enemyId as EnemyType;
							enemyHealth = enemies[enemyId as EnemyType].health;
						}}>{fightingEnemy !== enemyId ? 'Fight!' : 'Stop'}</button
					>
				</div>
			{/each}
		</div>
	</section>
</div>
