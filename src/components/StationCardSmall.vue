<template>
    <div class="station-card-small">
        <div
            :style="{background: item.station.icon.backgroundColor}"
            class="station-image-block"
            @click="playStation(item.station.id)"
        >
            <img
                v-lazy="useImage(item.station.icon)"
                :alt="item.station.name ">
            <div class="play-icon">
                <i class="fas fa-play"/>
            </div>
        </div>
        <p>{{ item.station.name }}</p>
    </div>
</template>

<script setup>
import useImage from '../composables/useImage.js';
import { defineProps, inject } from 'vue';
import useSendStationFeedback from '../composables/useSendStationFeedback.js';
import useStationTracks from '../composables/useStationTracks.js';
import { useStore } from 'vuex';

const store = useStore();
const request = inject('$request');

defineProps({
    item: {
        type: Object,
        required: true
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
.station-card-small {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
}

.station-image-block {
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 5px;
    margin-right: 10px;
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
}

.play-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    transition: 0.2s;
    opacity: 0;
}

.station-card-small:hover .play-icon {
    opacity: 1;
    transition: 0.2s;
}


</style>
