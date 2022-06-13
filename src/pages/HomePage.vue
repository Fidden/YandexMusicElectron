<template>
    <main class="main">
        <div
            v-if="playLists.length"
            class="main-container">
            <h2 class="main-container-title">
                Главное
            </h2>
            <div class="playlists-container">
                <PlaylistCardSmall
                    v-for="playlist in playLists"
                    :key="playlist.playlistUuid"
                    :playlist="playlist"
                />
            </div>
        </div>
        <div class="main-container">
            <div class="main-container-title">
                <h2>
                    Новые релизы<br>
                    <span class="main-container-subtitle">Новые треки, альбомы и сборники</span>
                </h2>
                <RouterLink
                    :to="{name: 'new-releases'}"
                    class="main-container-show-all">
                    Показать все
                </RouterLink>
            </div>
            <Flickity
                v-if="firstReleases.length"
                ref="flickity"
                :options="useFlickityOptionsDefault">
                <div
                    v-for="release in firstReleases"
                    :key="release.id"
                    class="carousel-cell"
                >
                    <AlbumCard
                        :item="release"
                        @data-loaded="dispatchNewRelease"
                    />
                </div>
            </Flickity>
        </div>
        <div class="main-container">
            <div class="main-container-title">
                <h2>
                    Хиты и новинки<br>
                    <span class="main-container-subtitle">Новая популярная музыка для вас от нашей редакции</span>
                </h2>
                <RouterLink
                    :to="{name: 'hits'}"
                    class="main-container-show-all">
                    Показать все
                </RouterLink>
            </div>
            <Flickity
                v-if="firstHits.length"
                ref="flickity"
                :options="useFlickityOptionsDefault">
                <div
                    v-for="hit in firstHits"
                    :key="hit.uid + hit.kind"
                    class="carousel-cell"
                >
                    <PlaylistCard
                        :item="hit"
                        @data-loaded="dispatchHits"
                    />
                </div>
            </Flickity>
        </div>
        <TheChart/>
        <TheRecentPlayed/>
    </main>
</template>

<script setup>
//https://api.music.yandex.net/landing3?blocks=personalplaylists,promotions,new-releases,new-playlists,mixes,chart,charts,artists,albums,playlists,play_contexts,podcasts
import { useStore } from 'vuex';
import PlaylistCardSmall from '../components/PlaylistCardSmall';
import AlbumCard from '../components/AlbumCard';
import PlaylistCard from '../components/PlaylistCard';
import TheChart from '../components/TheChart';
import { computed } from 'vue';
import TheRecentPlayed from '../components/TheRecentPlayed.vue';
import Flickity from 'vue-flickity';
import useFlickityOptionsDefault from '../composables/useFlickityOptionsDefault.js';
const store = useStore();

const playLists = computed(() => store.getters.playLists);
const firstReleases = computed(() => store.getters.firstReleases);
const firstHits = computed(() => store.getters.firstHits);


function dispatchNewRelease(value) {
    store.dispatch('setNewReleaseData', value);
}

function dispatchHits(value) {
    store.dispatch('setHitData', value);
}

</script>

<style scoped>
.playlists-container {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
}

@media (max-width: 1000px) {
    .playlists-container .playlist-block:nth-child(n+7) {
        display: none;
    }
}

@media (min-width: 1001px) {
    .playlists-container {
        grid-template-columns: repeat(6, 1fr);
    }

    .playlists-container .playlist-block:nth-child(n+13) {
        display: none;
    }
}

</style>
