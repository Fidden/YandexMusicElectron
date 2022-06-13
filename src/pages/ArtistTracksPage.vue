<template>
    <LayoutPage>
        <template #title>
            {{ route.params.artist_name }}
        </template>
        <template #subtitle>
            Все треки
        </template>
        <template
            v-if="tracks.length"
            #body>
            <TheTracksTable :tracks="tracks"/>
        </template>
    </LayoutPage>
</template>

<script setup>
import LayoutPage from '../layouts/LayoutPage.vue';
import { inject, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import TheTracksTable from '../components/TheTracksTable.vue';

const request = inject('$request');
const route = useRoute();
const tracks = ref([]);

onMounted(async () => {
    tracks.value = await getTracksData(await getTracks());
});

async function getTracksData(ids) {
    let params = new URLSearchParams();
    params.append('trackIds', ids.toString());

    let res = await request.post('/tracks', params, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });

    return res.data.result.map(item => {
        return {track: item};
    });
}

async function getTracks() {
    let res = await request.get(`/artists/${route.params.id}/track-ids-by-rating`);
    return res.data.result.tracks;
}

</script>

<style scoped>
</style>
