<template>
    <LayoutPage>
        <template #title>
            Вы недавно слушали
        </template>
        <template #body>
            <div class="main-body">
                <div
                    v-for="item in store.state.track.recent"
                    :key="item.id">
                    <AlbumCard
                        v-if="item.data.context === 'album'"
                        :item="item.data.payload"/>

                    <PlaylistCard
                        v-else-if="item.data.context === 'playlist'"
                        :item="item.data.payload"
                        :tracks-count="true"/>

                    <ArtistCard
                        v-else-if="item.data.context === 'artist'"
                        :artist="item.data.payload"/>
                </div>
            </div>
        </template>
    </LayoutPage>
</template>

<script setup>
import LayoutPage from '../layouts/LayoutPage.vue';
import AlbumCard from '../components/AlbumCard.vue';
import PlaylistCard from '../components/PlaylistCard.vue';
import ArtistCard from '../components/ArtistCard.vue';

import { useStore } from 'vuex';
const store = useStore();

</script>

<style scoped>
.main-body {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px 6px;
}
</style>
