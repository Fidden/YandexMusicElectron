<template>
    <main class="main">
        <TheNavigation/>
        <div class="item-head">
            <img
                v-lazy="useImage(playlist, '200x200')"
                :alt="playlistTitle">
            <div class="item-info">
                <p class="info-type">
                    Плейлист
                </p>
                <h2>{{ playlistTitle }}</h2>

                <div class="info-row">
                    <h3
                        v-if="playlist.owner"
                        class="info-artists">
                        Составитель: {{ playlist.owner.name }}
                    </h3>
                    <img
                        alt="circle"
                        class="info-circle"
                        src="../assets/img/circle-white.svg">
                    <p
                        v-if="playlist.trackCount"
                        class="info-tracks-count">
                        {{ useTracksCount(playlist) }}
                    </p>
                    <img
                        alt="circle"
                        class="info-circle"
                        src="../assets/img/circle-white.svg">
                    <p class="info-tracks-duration">
                        {{ useConvertDuration(playlist.durationMs) }}
                    </p>
                </div>

                <div class="item-controls">
                    <button
                        class="btn"
                        @click="usePlayShuffle($store, playlist.tracks)">
                        <i class="fas fa-play fa-sm"/> Перемешать
                    </button>
                </div>
            </div>
        </div>
        <TheTracksTable
            v-if="playlist.tracks"
            :tracks="playlist.tracks"/>
    </main>
</template>

<script setup>
import usePlayShuffle from '../composables/usePlayShuffle.js';
import TheTracksTable from '../components/TheTracksTable.vue';
import useTracksCount from '../composables/useTracksCount.js';
import useConvertDuration from '../composables/useConvertDuration.js';
import useImage from '../composables/useImage.js';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import usePlaylist from '../composables/usePlaylist.js';
import TheNavigation from '../components/TheNavigation.vue';

const route = useRoute();
const playlist = ref({});

onMounted(async () => {
    playlist.value = await usePlaylist(route.params.kind, route.params.uid);
});

const playlistTitle = computed(() => {
    return playlist.value.title === '' ? 'Без названия' : playlist.value.title;
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

.info-artists, .info-tracks-count, .info-tracks-duration {
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
