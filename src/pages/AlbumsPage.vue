<template>
    <LayoutItems>
        <template #title>
            Альбомы
        </template>
        <template #body>
            <AlbumCard
                v-for="album in albums"
                :key="album.id"
                :item="album"/>
        </template>
    </LayoutItems>
</template>

<script setup>
import AlbumCard from '../components/AlbumCard.vue';
import { inject, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import useAlbum from '../composables/useAlbum.js';
import LayoutItems from '../layouts/LayoutItems.vue';

const request = inject('$request');
const store = useStore();

const albums = ref([]);

onMounted(async () => {
    let res = await request.get(`/users/${store.state.user.account.uid}/likes/albums`);
    for (const item of res.data.result) {
        const index = res.data.result.indexOf(item);
        albums.value[index] = await useAlbum(request, item.id);
    }
});

</script>

<style scoped>

</style>
