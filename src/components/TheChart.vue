<template>
    <div class="chart-container">
        <div class="main-container-title">
            <h2>
                Чарт Яндекс.Музыки<br>
                <span class="chart-container-subtitle">{{ chart.title }}</span>
            </h2>
            <RouterLink
                :to="{name: 'chart'}"
                class="main-container-show-all">
                Показать все
            </RouterLink>
        </div>
        <div
            v-if="chart.length"
            class="chart-tracks-container">
            <ChartTrack v-for="item in chart" :key="item.id" :item="item"/>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, inject, onMounted } from 'vue';
import ChartTrack from './ChartTrack.vue';

const store = useStore();
const request = inject('$request');

onMounted(async () => {
    await store.dispatch('setChart', await getChartTracks());
});

const chart = computed(() => store.state.chart.all);

//gets first 10 tracks from chart
async function getChartTracks() {
    let res = await request.get('landing3?blocks=chart');
    return res.data.result.blocks[0].entities;
}

</script>

<style scoped>
.chart-tracks-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 7px 40px;
}

</style>
