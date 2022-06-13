<template>
    <LayoutItems>
        <template #title>
            Исполнители
        </template>
        <template #body>
            <ArtistCard
                v-for="artist in artists"
                :key="artist.id"
                :artist="artist"/>
        </template>
    </LayoutItems>
</template>

<script setup>
import ArtistCard from '../components/ArtistCard.vue';
import { computed, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import LayoutItems from '../layouts/LayoutItems.vue';

const store = useStore();
const request = inject('$request');

const artists = computed(() => {
    return store.state.artists.data;
});

onMounted(async () => {
    await store.dispatch('setArtists', await getUserArtists());
});

//get user favorite artists
async function getUserArtists() {
    let res = await request.get(`/users/${store.state.user.account.uid}/likes/artists`);
    return res.data.result;
}
</script>

<style scoped>

</style>
