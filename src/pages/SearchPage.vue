<template>
    <main
        v-if="Object.keys(response).length"
        class="main">
        <div
            v-if="response?.best"
            class="result-block">
            <div class="result-best">
                <h2 class="result-best-title">
                    Лучший результат
                </h2>

                <SearchResultArtist
                    v-if="response.best.type === 'artist'"
                    :result="response.best.result"/>

                <SearchResultTrack
                    v-else-if="response.best.type === 'track'"
                    :result="response.best.result"/>
            </div>
            <div
                v-if="tracks.length"
                class="result-tracks"
            >
                <h2 class="result-tracks-title">
                    Треки
                </h2>
                <TheTracksTable
                    :filter-bar="false"
                    :tracks="tracks"/>
            </div>
        </div>
        <div
            v-if="response.artists?.results.length"
            class="result-container">
            <h2 class="result-container-title">
                Исполнители
            </h2>
            <Flickity
                ref="flickity"
                :options="useFlickityOptionsDefault">
                <div
                    v-for="artist in response.artists.results"
                    :key="artist.id"
                    class="carousel-cell">
                    <ArtistCard :artist="artist"/>
                </div>
            </Flickity>
        </div>
        <div
            v-if="response.albums?.results.length"
            class="result-container">
            <h2 class="result-container-title">
                Альбомы
            </h2>
            <Flickity
                ref="flickity"
                :options="useFlickityOptionsDefault">
                <div
                    v-for="album in response.albums.results"
                    :key="album.id"
                    class="carousel-cell">
                    <AlbumCard :item="album"/>
                </div>
            </Flickity>
        </div>
        <div
            v-if="response.playlists?.results.length"
            class="result-container">
            <h2 class="result-container-title">
                Плейлисты
            </h2>
            <Flickity
                ref="flickity"
                :options="useFlickityOptionsDefault">
                <div
                    v-for="playlist in response.playlists.results"
                    :key="playlist.id"
                    class="carousel-cell">
                    <PlaylistCard :item="playlist"/>
                </div>
            </Flickity>
        </div>
    </main>
</template>

<script setup>
import useFlickityOptionsDefault from '../composables/useFlickityOptionsDefault.js';
import Flickity from 'vue-flickity';
import { useStore } from 'vuex';
import { computed } from 'vue';
import TheTracksTable from '../components/TheTracksTable.vue';
import ArtistCard from '../components/ArtistCard.vue';
import AlbumCard from '../components/AlbumCard.vue';
import PlaylistCard from '../components/PlaylistCard.vue';
import SearchResultArtist from '../components/SearchResultArtist.vue';
import SearchResultTrack from '../components/SearchResultTrack.vue';

const store = useStore();

const response = computed(() => store.state.search.response);
const tracks = computed(() => store.getters.getSearchTracks.slice(0, 4));
</script>

<style scoped>
.result-best-body {
    background: var(--background);
    border-radius: 6px;
    height: calc(100% - 45px);
    padding: 20px 80px 20px 20px;
    position: relative;
    overflow: hidden;
}

.result-best-body img {
    border-radius: 8px;
}

.result-best-name {
    font-size: 32px;
    font-weight: 600;
    margin-top: 20px;
}

.result-block {
    display: grid;
    grid-template-columns: minmax(200px, min-content) minmax(200px, min-content) 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "best best tracks tracks tracks";
}

.result-tracks {
    grid-area: tracks;
    flex: 1;
}

.result-best {
    grid-area: best;
    margin-right: 40px;
}

.result-best-title, .result-tracks-title {
    margin-bottom: 15px;
}

.result-container-title {
    margin: 20px 0;
}


</style>
