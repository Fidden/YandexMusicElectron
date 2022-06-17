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
import { computed, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import LayoutItems from '../layouts/LayoutItems.vue';
import useUserMyFavoritesPlaylist from '../composables/useUserMyFavoritesPlaylist.js';

const store = useStore();
const request = inject('$request');
const playlists = computed(() => store.getters.playLists);

onMounted(async () => {
    if (!playlists.value.length) {
        playlists.value = await getUserPlaylists();
        playlists.value = [await useUserMyFavoritesPlaylist(request, store)].concat(playlists.value);
    }
});

async function getUserPlaylists() {
    let res = await request.get(`/users/${store.getters.userId}/playlists/list`);
    return res.data.result;
}

</script>

<style scoped>

</style>
