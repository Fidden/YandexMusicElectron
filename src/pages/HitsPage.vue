<template>
    <LayoutPage>
        <template #title>
            Хиты и новинки
        </template>
        <template #subtitle>
            Новая и популярная музыка для вас от нашей редакции
        </template>
        <template #body>
            <div class="main-body">
                <PlaylistCard
                    v-for="playlist in newPlaylists"
                    :key="playlist.id"
                    :item="playlist"/>
            </div>
        </template>
    </LayoutPage>
</template>

<script setup>
import LayoutPage from '../layouts/LayoutPage.vue';
import { inject, onMounted, ref } from 'vue';
import PlaylistCard from '../components/PlaylistCard.vue';

const request = inject('$request');
const newPlaylists = ref([]);

onMounted(async () => {
    newPlaylists.value = await getNewPlaylistsData(await getNewPlaylists());
});

async function getNewPlaylists() {
    let res = await request.get('landing3/new-playlists');
    return res.data.result.newPlaylists;
}

async function getNewPlaylistsData(ids) {
    ids = ids.map(item => {
        return `${item.uid}:${item.kind}`;
    });

    let params = new URLSearchParams();
    params.append('playlistIds', ids.toString());

    let res = await request.post('/playlists/list', params, {
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
