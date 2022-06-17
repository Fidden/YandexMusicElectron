<template>
    <div
        v-if="artists.length"
        class="container">
        <RouterLink
            v-for="(artist, index) in artists"
            :key="artist.id"
            :to="{name: 'artist', params: {id: artist.id}}">
            {{ useArtistName(artist, index, artists.length) }}
        </RouterLink>
    </div>
</template>

<script setup>
import useArtistName from '../composables/useArtistName.js';
import { defineProps } from 'vue';

defineProps({
    artists: {
        type: Array,
        required: true,
    }
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    font-size: 14px;
}

a {
    font-size: inherit;
    margin-right: 3px;
}

a:hover {
    text-decoration: underline;
}
</style>
