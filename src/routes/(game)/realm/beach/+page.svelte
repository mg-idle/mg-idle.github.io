<script lang="ts">
	import Meta from '$lib/components/meta.svelte';
	import TreePalm from 'phosphor-svelte/lib/TreePalm';
	import { player } from '$lib/data/player.svelte';

	let isFighting = $state(false);
	const tickDelay = 1000;
	const enemyAttack = 1;
	const enemyMaxHealth = 5;
	let enemyHealth = $state(enemyMaxHealth);

	$effect(() => {
		let timeoutId: number;

		if (enemyHealth <= 0) {
			enemyHealth = enemyMaxHealth;
			player.exp += 1;
			player.health = player.maxHealth;
		}

		if (player.health <= 0) {
			history.pushState({}, '', '/nexus');
		}

		if (isFighting) {
			timeoutId = setTimeout(() => {
				enemyHealth -= player.attack;
				player.health -= enemyAttack;
			}, tickDelay);
		}

		return () => clearTimeout(timeoutId);
	});

	$effect(() => {
		console.log({
			isFighting,
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
		<TreePalm class="inline size-6" />
		<span>Beach</span>
		<span class="text-base text-amber-900">(lvl 1-5)</span>
	</h2>
</header>

<div class="p-4">
	<section class="space-y-2">
		<h3 class="text-lg">Enemies</h3>
		<div class="w-48 bg-amber-100 p-2 shadow-sm">
			<h4 class="text-lg">Pirate</h4>
			<p class="text-amber-900">1 attack</p>
			<p class="text-amber-900">5 health</p>
			<button
				class="w-full cursor-pointer bg-amber-500 py-1 px-2 text-center text-lg text-amber-50 shadow-md"
				onclick={() => {
					isFighting = true;
				}}>{!isFighting ? 'Fight!' : 'Stop'}</button
			>
		</div>
	</section>
</div>
