<script lang="ts">
  import * as Card from "#lib/components/ui/card/index.ts";
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();
</script>

<div class="place-content-center">
  <img class="m-auto" src={data.profile?.kao} alt="x" />
</div>

<div class="mx-20 my-4 flex flex-col gap-6">
  <section class="flex flex-col gap-2">
    <h2 class="text-lg font-medium text-center">Profile</h2>
    <div class="flex flex-wrap justify-center gap-4 *:w-48">
      <Card.Root>
        <Card.Header>
          <Card.Description>Name</Card.Description>
          <Card.Title class="text-3xl">{data.profile?.name}</Card.Title>
        </Card.Header>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Description>Profile id</Card.Description>
          <Card.Title class="text-3xl">{data.profile?.id}</Card.Title>
        </Card.Header>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Description>Adventure level</Card.Description>
          <Card.Title class="text-3xl"
            >{data.profile?.adventure_level}</Card.Title
          >
        </Card.Header>
      </Card.Root>
    </div>
  </section>
  <section class="flex flex-col gap-2">
    <h2 class="text-lg font-medium text-center">Studied in total</h2>
    <div class="flex flex-wrap justify-center gap-4 *:w-48">
      <Card.Root>
        <Card.Header>
          <Card.Description>
            <a href="/terms" class="underline-offset-4 hover:underline"
              >All terms</a
            >
          </Card.Description>
          <Card.Title class="text-3xl">{data.profile?.total}</Card.Title>
        </Card.Header>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Description>
            <a href="/terms/vocab" class="underline-offset-4 hover:underline"
              >Vocabulary</a
            >
          </Card.Description>
          <Card.Title class="text-3xl">{data.profile?.total_vocab}</Card.Title>
        </Card.Header>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Description>
            <a href="/terms/kanji" class="underline-offset-4 hover:underline"
              >Kanji</a
            >
          </Card.Description>
          <Card.Title class="text-3xl">{data.profile?.total_kanji}</Card.Title>
        </Card.Header>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Description>
            <a href="/terms/grammar" class="underline-offset-4 hover:underline"
              >Grammar</a
            >
          </Card.Description>
          <Card.Title class="text-3xl">{data.profile?.total_grammar}</Card.Title
          >
        </Card.Header>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Description>
            <a href="/terms/sent" class="underline-offset-4 hover:underline"
              >Sentences</a
            >
          </Card.Description>
          <Card.Title class="text-3xl">{data.profile?.total_sent}</Card.Title>
        </Card.Header>
      </Card.Root>
    </div>
  </section>

  <section class="flex flex-col gap-2">
    <h2 class="text-lg font-medium text-center">Studied today</h2>
    <div class="flex flex-wrap justify-center gap-4 *:w-48">
      <Card.Root>
        <Card.Header>
          <Card.Description>All terms</Card.Description>
          <Card.Title class="text-3xl">{data.profile?.today_all}</Card.Title>
        </Card.Header>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Description>Vocabulary</Card.Description>
          <Card.Title class="text-3xl">{data.profile?.today_vocab}</Card.Title>
        </Card.Header>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Description>Kanji</Card.Description>
          <Card.Title class="text-3xl">{data.profile?.today_kanji}</Card.Title>
        </Card.Header>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Description>Grammar</Card.Description>
          <Card.Title class="text-3xl">{data.profile?.today_grammar}</Card.Title
          >
        </Card.Header>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Description>Sentences</Card.Description>
          <Card.Title class="text-3xl">{data.profile?.today_sent}</Card.Title>
        </Card.Header>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Description>Verb conjugations</Card.Description>
          <Card.Title class="text-3xl">{data.profile?.today_conj}</Card.Title>
        </Card.Header>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Description>Adjective conjugations</Card.Description>
          <Card.Title class="text-3xl">{data.profile?.today_aconj}</Card.Title>
        </Card.Header>
      </Card.Root>
    </div>
  </section>
</div>
