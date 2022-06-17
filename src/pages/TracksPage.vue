<template>
    <main class="main">
        <div class="main-container">
            <h2 class="main-container-title">
                Треки
            </h2>
            <TheTracksTable
                v-if="tracks.length"
                :tracks="tracks"/>
        </div>
    </main>
</template>

<script setup>
import TheTracksTable from '../components/TheTracksTable.vue';
import { useStore } from 'vuex';
import { computed, inject, onMounted } from 'vue';
import useTrack from '../composables/useTrack.js';
import usePlaylists from '../composables/usePlaylists.js';
import usePlaylistsData from '../composables/usePlaylistsData.js';

const store = useStore();
const request = inject('$request');

const tracks = computed(() => store.state.user.tracks);

onMounted(async () => {
    if (!tracks.value.length) {
        //получаем все плейлисты
        let playlists = await usePlaylists(request, store);
        //берем только kind
        let kinds = playlists.map(item => item.kind);
        //яндекс музыка не считает плейлистом "мне нравится" поэтому добавим ручками
        kinds.push(3);
        //получаем все плейлисты с информацией о треках (id, albumId)
        let playlistWithTracks = await usePlaylistsData(request, store, kinds);


        //форматируем данные
        let ids = [];
        playlistWithTracks.forEach(item => {
            if (item.albumId)
                ids.push(item.tracks.map(item => `${item.id}:${item.albumId}`));
            else
                ids.push(item.tracks.map(item => `${item.id}`));
        });

        //получаем треки и оставляем только те которые можем послушать
        let tracks = await useTrack(request, ids);
        tracks = tracks.filter(item => item.available).map(item => ({track: item}));

        //записываем чтоб не получать постоянно ибо это занимает минуту
        await store.dispatch('setUserTracks', tracks);
    }
});

</script>

<style scoped>

</style>
