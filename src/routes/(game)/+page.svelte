<script lang="ts">
	import Meta from '$lib/components/meta.svelte';
	import CastleTurret from 'phosphor-svelte/lib/CastleTurret';
	import { base } from '$app/paths';
</script>

<Meta title="Nexus" />

<header class="w-full bg-sky-200 p-4 text-sky-950">
	<h2 class="text-xl">
		<CastleTurret class="inline size-6" />
		<span>Nexus</span>
	</h2>
</header>

<div class="p-4">
	<section class="space-y-2">
		<h3 class="text-lg">Quest Giver</h3>
		<div class="w-48 bg-emerald-100 p-2 shadow-sm">
			<h4 class="text-lg">Beach Bum</h4>
			<p class="text-emerald-900">Defeat 20 pirates!</p>
			<a
				class="block bg-emerald-500 py-1 px-2 text-center text-lg text-emerald-50 shadow-md"
				href="{base}/realm/beach">Go to Beach!</a
			>
		</div>
	</section>
</div>
