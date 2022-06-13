<template>
    <LayoutPage>
        <template #title>
            Чарт Яндекс.Музыки
        </template>
        <template #subtitle>
            Треки, популярные на Яндекс.Музыке прямо сейчас
        </template>
        <template #body>
            <div
                v-if="chartTracks.length"
                class="main-body">
                <TheTracksTable :tracks="chartTracks"/>
            </div>
        </template>
    </LayoutPage>
</template>

<script setup>
import LayoutPage from '../layouts/LayoutPage.vue';
import TheTracksTable from '../components/TheTracksTable.vue';
import { inject, onMounted, ref } from 'vue';

const request = inject('$request');
const chartTracks = ref([]);

onMounted(async () => {
    chartTracks.value = await getChartTracks();
});

async function getChartTracks() {
    let res = await request.get('/landing3/chart');
    return res.data.result.chart.tracks;
}

</script>

<style scoped>

</style>
