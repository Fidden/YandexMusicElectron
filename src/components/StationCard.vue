<template>
    <div class="station-card">
        <div
            :style="{background: item.station.icon.backgroundColor }"
            class="station-image-block"
            @click="playStation(item.station.id)">
            <img
                v-lazy="useImage(item.station.icon, '200x200')"
                :alt="item.station.name">
            <div class="play-icon">
                <i class="fas fa-play"/>
            </div>
        </div>


        <p>{{ item.station.name }}</p>
    </div>
</template>

<script setup>
import useImage from '../composables/useImage.js';
import useSendStationFeedback from '../composables/useSendStationFeedback.js';
import useStationTracks from '../composables/useStationTracks.js';
import { useStore } from 'vuex';
import { defineProps, inject } from 'vue';

const store = useStore();
const request = inject('$request');

defineProps({
    item: {
        type: Object,
        required: true,
    }
});

async function playStation(station_id) {
    //reset queue and reset played list
    await store.dispatch('setQueue', []);
    await store.dispatch('clearPlayed');
    await store.dispatch('setIsPlaying', true);

    await store.dispatch('setCurrentStation',
        `${station_id.type}:${station_id.tag}`);

    await useSendStationFeedback(store, request, 'radioStarted');

    await store.dispatch('setQueue',
        await useStationTracks(store, request, store.state.stations.current));
}

</script>

<style scoped>
.station-image-block {
    width: 100%;
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-bottom: 10px;
    position: relative;
}

.station-image-block img {
    width: 50%;
    height: 50%;
}

.play-icon {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 0.2s;
    border-radius: 4px;
}

.station-card:hover .play-icon {
    transition: 0.2s;
    opacity: 1;
}

.fa-play {
    padding: 12px;
    font-size: 14px;
    background: var(--main-color);
    color: black;
    border-radius: 25px;
}

.station-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: #292C3B;
    border-radius: 6px;
    padding: 13px 13px 21px 13px;
}

@media (min-width: 1001px) {
    .fa-play {
        font-size: 24px;
        border-radius: 30px;
        width: 50px;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
}

</style>
