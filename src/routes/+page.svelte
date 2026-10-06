<script lang="ts">
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();
</script>

<pre>{JSON.stringify(data.renshuu, null, 2)}</pre>
