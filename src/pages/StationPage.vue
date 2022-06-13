<template>
    <main class="main">
        <div class="main-container">
            <h2 class="main-container-title">
                Радио
            </h2>
            <div
                v-if="stations?.stations"
                class="my-wave-container">
                <div
                    v-for="item in stations.stations"
                    :key="item.station.idFroFrom"
                    class="my-wave-block">
                    <StationCard :item="item"/>
                </div>
            </div>
        </div>
        <div class="main-container">
            <h2 class="main-container-title">
                Жанры
            </h2>
            <div class="genres-container">
                <div
                    v-for="item in stationsAll"
                    :key="item.station.id.tag"
                    class="genre-block">
                   <StationCardSmall :item="item"/>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { computed, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import StationCard from '../components/StationCard.vue';
import StationCardSmall from '../components/StationCardSmall.vue';

const store = useStore();
const request = inject('$request');

const stations = computed(() => {
    return store.state.stations.dashboard;
});

const stationsAll = computed(() => {
    return store.state.stations.list;
});

onMounted(async () => {
    if (!stations.value.length)
        await store.dispatch('setStationsDashboard', await getStationDashboard());

    if (!stationsAll.value.length)
        await store.dispatch('setStationsList', await getStationsList());
});

async function getStationDashboard() {
    let res = await request.get('/rotor/stations/dashboard');
    return res.data.result;
}

async function getStationsList() {
    let res = await request.get('/rotor/stations/list');
    return res.data.result;
}

</script>

<style scoped>
.my-wave-container {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-between;
    width: 100%;
    gap: 10px;
}


.genres-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 7px;
    width: 100%;
    grid-auto-flow: row;
    justify-content: space-between;
}

</style>
