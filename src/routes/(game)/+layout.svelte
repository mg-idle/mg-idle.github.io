<script lang="ts">
	import CrownSimple from 'phosphor-svelte/lib/CrownSimple';
	import CastleTurret from 'phosphor-svelte/lib/CastleTurret';
	import Storefront from 'phosphor-svelte/lib/Storefront';
	import CaretDown from 'phosphor-svelte/lib/CaretDown';
	import TreasureChest from 'phosphor-svelte/lib/TreasureChest';
	import TreePalm from 'phosphor-svelte/lib/TreePalm';
	import { page } from '$app/stores';
	import { vault } from '$lib/data/vault.svelte';
	import { version } from '$app/environment';
	import { game } from '$lib/data/game.svelte';
	import { untrack } from 'svelte';

	const { children } = $props();

	$inspect(game);
	$effect(() => untrack(() => game.start()));
</script>

<div class="flex min-h-svh">
	<div class="flex h-svh w-64 flex-col bg-emerald-100 p-2">
		<h1 class="my-2 text-center text-2xl">
			<CrownSimple weight="duotone" class="mr-2 inline size-8" /><span>MG Idle</span>
		</h1>
		<nav class="space-y-2">
			<a
				class="block w-full p-2 text-lg aria-[current=page]:bg-emerald-200 aria-[current=page]:font-medium aria-[current=page]:shadow-md"
				href="/"
				aria-current={$page.url.pathname === '/' ? 'page' : undefined}
				><CastleTurret weight="duotone" class="inline size-6" />
				<span>Nexus</span></a
			>
			<a
				class="block w-full p-2 text-lg aria-[current=page]:bg-emerald-200 aria-[current=page]:font-medium aria-[current=page]:shadow-md"
				href="/bazaar"
				aria-current={$page.url.pathname === '/bazaar' ? 'page' : undefined}
				><Storefront weight="duotone" class="inline size-6" />
				<span>Bazaar</span></a
			>
			<a
				class="block w-full p-2 text-lg aria-[current=page]:bg-emerald-200 aria-[current=page]:font-medium aria-[current=page]:shadow-md"
				href="/vault"
				aria-current={$page.url.pathname === '/vault' ? 'page' : undefined}
				><TreasureChest weight="duotone" class="inline size-6" />
				<span>Vault</span>
				<span>({vault.items.length}/{vault.maxSlots})</span></a
			>
			<details open class="group my-4">
				<summary class="cursor-pointer list-none p-2 text-emerald-900"
					><span>Realm</span><CaretDown
						class="ml-1 inline size-4 transition-all group-open:rotate-180"
					/></summary
				>
				<a
					class="block w-full p-2 text-lg aria-[current=page]:bg-emerald-200 aria-[current=page]:font-medium aria-[current=page]:shadow-md"
					href="/realm/beach"
					aria-current={$page.url.pathname === '/realm/beach' ? 'page' : undefined}
					><TreePalm weight="duotone" class="inline size-6" />
					<span>Beach</span></a
				>
			</details>
		</nav>
		<footer class="mt-auto text-center text-sm text-emerald-900 underline underline-offset-2">
			<a href="https://github.com/mg-idle/mg-idle.github.io/commit/{version}"
				><span>{version.slice(0, 7)}</span></a
			>
		</footer>
	</div>
	<main class="flex-1">
		{@render children()}
	</main>
</div>
