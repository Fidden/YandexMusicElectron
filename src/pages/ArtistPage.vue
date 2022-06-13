<template>
    <main
        v-if="Object.keys(artist).length"
        class="main">
        <TheNavigation/>
        <div class="artist-head">
            <img
                v-lazy="useImage(artist.artist, '150x150')"
                :alt="artist.artist.name"
                class="artist-image"
            >
            <div class="artist-head-info">
                <p>Исполнитель</p>
                <h1>{{ artist.artist.name }}</h1>
            </div>
        </div>
        <div class="artist-body">
            <div class="artist-body-title">
                <h2>Популярные треки</h2>
                <RouterLink
                    :to="{name: 'artist-tracks', params: {id: route.params.id, artist_name: artist.artist.name}}">
                    Посмотреть все
                </RouterLink>
            </div>
            <div
                v-if="popularTracks.length"
                class="artist-body-block">
                <TheTracksTable
                    :filter-bar="false"
                    :tracks="popularTracks"/>
            </div>

            <div class="artist-body-block">
                <div class="artist-body-title">
                    <h2>Популярные альбомы</h2>
                </div>
                <Flickity
                    v-if="popularAlbums.length"
                    ref="flickity"
                    :options="useFlickityOptionsDefault">
                    <div
                        v-for="album in popularAlbums"
                        :key="album.id"
                        class="carousel-cell"
                    >
                        <AlbumCard :item="album"/>
                    </div>
                </Flickity>
            </div>

            <div class="artist-body-block">
                <div class="artist-body-title">
                    <h2>Похожие артисты</h2>
                </div>
                <div class="artist-body-block-body">
                    <ArtistCard
                        v-for="similarArtist in similarArtists"
                        :key="similarArtist.id"
                        :artist="similarArtist"/>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import useFlickityOptionsDefault from '../composables/useFlickityOptionsDefault.js';
import TheTracksTable from '../components/TheTracksTable.vue';
import AlbumCard from '../components/AlbumCard.vue';
import ArtistCard from '../components/ArtistCard.vue';
import useImage from '../composables/useImage.js';
import useArtistBriefInfo from '../composables/useArtistBriefInfo.js';
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import TheNavigation from '../components/TheNavigation.vue';
import Flickity from 'vue-flickity';

const route = useRoute();
const request = inject('$request');

const artist = ref({});

onMounted(async () => {
    artist.value = await useArtistBriefInfo(route.params.id, request);
});

const popularTracks = computed(() => artist.value.popularTracks?.map(item => ({track: item})));

const popularAlbums = computed(() => artist.value.albums.concat(artist.value.alsoAlbums));

const similarArtists = computed(() => artist.value.similarArtists.slice(0, 5));

watch(route, async (value) => {
    //todo: подумать над красивым решением проблемы
    if (value.params.id) {
        artist.value = {};
        await nextTick();
        artist.value = await useArtistBriefInfo(route.params.id, request);
    }
});

</script>

<style scoped>
.artist-head {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.artist-image {
    border-radius: 50%;
    margin-right: 40px;
}

.artist-body-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 20px 0;
}

#app > div > div > main > div.artist-body > div.artist-body-title:first-child {
    margin-bottom: 0;
}

.artist-body-title a {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: var(--main-color);
    margin-left: auto;
}

/*fixme: сделать 1 классом */
.artist-body-block {
    display: flex;
    flex-direction: column;
}

.artist-body-block-body {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
}


</style>
