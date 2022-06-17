<template>
    <div
        class="chart-tracks-block"
        @click="playTrack"
    >
        <div class="chart-block-info">
            <p class="chart-block-info-pos">
                {{ item.data.chart.position }}
            </p>
            <i
                v-if="item.data.chart.progress === 'up'"
                class="fas fa-caret-up fa-xs"/>
            <i
                v-else-if="item.data.chart.progress === 'down'"
                class="fas fa-caret-down fa-xs"/>
            <i
                v-else
                class="far fa-horizontal-rule"/>
        </div>
        <div class="chart-track-body">
            <img
                v-lazy="useImage(item.data.track)"
                :alt="item.data.track.title">
            <div class="chart-track-body-title">
                <p>{{ item.data.track.title }}</p>
                <ArtistsLinks
                    :artists="item.data.track.artists"
                    :small="true"
                    style="font-size: 12px"
                />
            </div>
        </div>
        <p class="chart-track-duration">
            {{ useConvertDuration(item.data.track.durationMs) }}
        </p>
    </div>
</template>

<script setup>
import useConvertDuration from '../composables/useConvertDuration.js';
import useImage from '../composables/useImage.js';
import { defineProps, inject } from 'vue';
import { useStore } from 'vuex';
import ArtistsLinks from './ArtistsLinks.vue';
import useTrack from '../composables/useTrack.js';

const store = useStore();
const request = inject('$request');

const props = defineProps({
    item: {
        type: Object,
        required: true,
    }
});

async function playTrack() {
    await store.dispatch('unshiftToQueue', {track: await useTrack(request, props.item.data.track.id)});
}

</script>

<style scoped>
.chart-tracks-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 4px;
}

.chart-tracks-block img {
    width: 50px;
    height: 50px;
}

.chart-block-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 15px;
}

.chart-block-info-pos {
    font-size: 14px;
    font-weight: 300;
}

.fa-horizontal-rule {
    width: 8px;
    overflow: hidden;
}

.chart-track-body {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 4px;
    flex: 1;
    border-radius: 4px;
    overflow: hidden;
}

.chart-track-body img {
    margin-right: 10px;
    border-radius: 4px;
}

.chart-track-body-title {
    display: flex;
    flex-direction: column;
}

.chart-track-body-title p {
    line-height: 14px;
}

.chart-track-duration {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #8E929C;
}

.fa-caret-up {
    color: lightgreen;
}

.fa-caret-down {
    color: lightcoral;
}
</style>
