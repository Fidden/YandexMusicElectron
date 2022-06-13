<template>
    <main class="main">
        <div
            v-for="podcast in podcastData.slice(1)"
            :key="podcast.id"
            class="podcast-container">
            <h2>{{ podcast.title }}</h2>
            <div
                v-if="podcast?.entities"
                class="podcast-block">
                <PodcastCard
                    v-for="actual in podcast.entities"
                    :key="actual.id"
                    :actual="actual"/>
            </div>
        </div>
    </main>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import PodcastCard from '../components/PodcastCard.vue';

const request = inject('$request');

const podcastData = ref([]);

onMounted(async () => {
    let res = await request.get('/non-music/catalogue');
    podcastData.value = res.data.result.blocks;
});

</script>

<style scoped>
.podcast-container {

}

.podcast-block {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 50px;
}
</style>
