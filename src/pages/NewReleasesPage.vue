<template>
    <LayoutPage>
        <template #title>
            Новые релизы
        </template>

        <template #subtitle>
            Новые треки, альбомы и сборники
        </template>

        <template #body>
            <div class="main-body">
                <AlbumCard
                    v-for="release in newReleases"
                    :key="release.id"
                    :item="release"/>
            </div>
        </template>
    </LayoutPage>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import AlbumCard from '../components/AlbumCard.vue';
import LayoutPage from '../layouts/LayoutPage.vue';

const request = inject('$request');
const newReleases = ref([]);

onMounted(async () => {
    newReleases.value = await getAlbumsData(await getNewReleases());
});

async function getNewReleases() {
    let res = await request.get('/landing3/new-releases');
    return res.data.result.newReleases;
}

async function getAlbumsData(ids) {
    let params = new URLSearchParams();
    params.append('albumIds', ids.toString());

    let res = await request.post('/albums', params, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });

    return res.data.result;
}

</script>

<style scoped>
.main-body {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px 6px;
}
</style>
