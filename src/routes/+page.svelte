<script lang="ts">
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();
</script>

<p class="text-3xl">
  Name on renshuu: {data.salo_profile?.name}
</p>
<pre>{JSON.stringify(data.salo_profile, null, 2)}</pre>
