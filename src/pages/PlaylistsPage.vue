<template>
    <LayoutItems>
        <template #title>
            Плейлисты
        </template>
        <template #body>
            <PlaylistCard
                v-for="playlist in playlists"
                :key="playlist.id"
                :item="playlist"/>
        </template>
    </LayoutItems>
</template>

<script setup>
import PlaylistCard from '../components/PlaylistCard.vue';
import { inject, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import LayoutItems from '../layouts/LayoutItems.vue';

const store = useStore();
const request = inject('$request');
const playlists = ref([]);

onMounted(async () => {
    playlists.value = await getUserPlaylists();
});

async function getUserPlaylists() {
    let res = await request.get(`/users/${store.getters.userId}/playlists/list`);
    return res.data.result;
}

</script>

<style scoped>

</style>
