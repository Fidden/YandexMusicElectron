<template>
    <div class="recent-container">
        <div class="recent-head">
            <h2 class="recent-title">
                Вы недавно слушали
            </h2>
            <RouterLink
                :to="{name: 'recent'}"
                class="show-all">
                Показать все
            </RouterLink>
        </div>
        <Flickity
            v-if="recent.length"
            ref="flickity"
            :options="useFlickityOptionsDefault"
        >
            <div
                v-for="item in recent"
                :key="item.id"
                class="carousel-cell">
                <AlbumCard
                    v-if="item.data.context === 'album'"
                    :item="item.data.payload"/>

                <PlaylistCard
                    v-else-if="item.data.context === 'playlist'"
                    :item="item.data.payload"
                    :tracks-count="true"/>

                <ArtistCard
                    v-else-if="item.data.context === 'artist'"
                    :artist="item.data.payload"/>
            </div>
        </Flickity>
    </div>
</template>

<script setup>
import useFlickityOptionsDefault from '../composables/useFlickityOptionsDefault.js';
import { inject, onMounted, ref } from 'vue';
import AlbumCard from './AlbumCard.vue';
import PlaylistCard from './PlaylistCard.vue';
import ArtistCard from './ArtistCard.vue';
import Flickity from 'vue-flickity';
import { useStore } from 'vuex';

const store = useStore();
const request = inject('$request');
const recent = ref([]);

onMounted(async () => {
    recent.value = await getRecent();
    await store.dispatch('setRecent', recent.value);
});

async function getRecent() {
    if (!store.state.track.recent.length) {
        let res = await request.get('landing3?blocks=play_contexts');
        return res.data.result.blocks[0].entities;
    } else
        return store.state.track.recent;
}

</script>

<style scoped>
.recent-container {
    margin-top: 45px;
}

.recent-title {
    font-weight: 500;
    font-size: 25px;
    line-height: 20px;
}

.recent-head {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.show-all {
    color: var(--main-color);
    margin-left: auto;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: right;
}

.recent-body {
    display: grid;
    grid-template-rows: 240px;
    grid-template-columns: repeat(5, minmax(150px, 1fr));
    gap: 7px;
}
</style>
