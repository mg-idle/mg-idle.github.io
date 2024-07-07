<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	import CircleNotch from 'phosphor-svelte/lib/CircleNotch';
	import WarningCircle from 'phosphor-svelte/lib/WarningCircle';
	import Warning from 'phosphor-svelte/lib/Warning';
	import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
	import Info from 'phosphor-svelte/lib/Info';

	const { children } = $props();
</script>

{@render children()}
<Toaster
	position="bottom-center"
	toastOptions={{
		unstyled: true,
		classes: {
			toast:
				'flex items-center gap-2 border border-emerald-200 bg-emerald-50 p-4 text-emerald-950 shadow-lg drop-shadow-lg',
			title: 'text-lg font-medium',
			description: 'text-emerald-900'
		}
	}}
>
	<CircleNotch class="size-6" slot="loading-icon" />
	<CheckCircle class="size-6" slot="success-icon" />
	<WarningCircle class="size-6" slot="error-icon" />
	<Info class="size-6" slot="info-icon" />
	<Warning class="size-6" slot="warning-icon" />
</Toaster>
