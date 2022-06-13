<template>
    <main class="main">
        <TheNavigation/>
        <div class="item-head">
            <img
                v-if="album.ogImage"
                :alt="album.title"
                :src="useImage(album, '150x150')">

            <div class="item-info">
                <p
                    v-if="album.type === 'single'"
                    class="info-type">
                    Сингл
                </p>
                <p
                    v-else
                    class="info-type">
                    Альбом
                </p>


                <h2 class="info-title">
                    {{ album.title }}
                    <span v-if="album.year">
                        ({{ album.year }})
                    </span>
                </h2>

                <div class="info-row">
                    <h3
                        v-if="album.artists"
                        class="info-artists">
                        Исполнители:
                        <RouterLink
                            v-for="(artist, index) in album.artists"
                            :key="artist.id"
                            :to="{name: 'artist', params: {id: artist.id}}">
                            {{ useArtistName(artist, index, album.artists.length) }}
                        </RouterLink>
                    </h3>
                    <img
                        alt="circle"
                        class="info-circle"
                        src="../assets/img/circle-white.svg">
                    <p
                        v-if="album.trackCount"
                        class="info-tracks-count">
                        {{ useTracksCount(album) }}
                    </p>
                </div>

                <div class="item-controls">
                    <button
                        class="btn"
                        @click="usePlayShuffle($store, album.volumes[0])">
                        <i class="fas fa-play fa-sm"/>{{ album.type === 'single' ? 'Слушать' : 'Перемешать' }}
                    </button>
                </div>
            </div>
        </div>
        <TheTracksTable
            v-if="album.volumes"
            :filter-bar="album.type !== 'single'"
            :tracks="album.volumes[0]"
            :without-image="true"
        />
    </main>
</template>

<script setup>
import usePlayShuffle from '../composables/usePlayShuffle.js';
import useArtistName from '../composables/useArtistName.js';
import TheTracksTable from '../components/TheTracksTable.vue';
import TheNavigation from '../components/TheNavigation.vue';
import useImage from '../composables/useImage.js';
import useTracksCount from '../composables/useTracksCount.js';
import { inject, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const request = inject('$request');

const album = ref({});

onMounted(async () => {
    let res = await request.get(`/albums/${route.params.id}/with-tracks`);
    let result = res.data.result;

    result.volumes[0].forEach((item, index) => {
        result.volumes[0][index] = {track: item};
    });

    album.value = result;
});

</script>

<style scoped>

.item-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 40px;
}

.item-head img {
    width: 140px;
    height: 140px;
    margin-right: 20px;
    border-radius: 6px;
}

.item-info {
    display: flex;
    flex-direction: column;
}

.item-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.item-controls button i {
    margin-right: 5px;
}

.item-info-additional p:first-child {
    margin-right: 5px;
}

.info-type {
    font-weight: 400;
    font-size: 12.8px;
    line-height: 16px;
    color: #8E929C;
    margin-bottom: 10px;
}

.info-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 16px;
    color: #FFFFFF;
    margin-bottom: 20px;
}

.info-artists, .info-tracks-count {
    font-weight: 400;
    font-size: 12.8px;
    line-height: 16px;
    color: #8E929C;
}

.info-artists a:hover {
    text-decoration: underline;
}

.info-tracks-count {
    color: white;
}

.info-artists span {
    color: white;
}

.info-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 17px;
}

.info-circle {
    width: 3px !important;
    height: 3px !important;
    margin-inline: 10px !important;
}

</style>
