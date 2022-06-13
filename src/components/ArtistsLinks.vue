<template>
    <RouterLink
        v-for="(artist, index) in artists"
        :key="artist.id"
        :style="{fontSize: small? '12px': '14px'}"
        :to="{name: 'artist', params: {id: artist.id}}">
        {{ useArtistName(artist, index, artists.length) }}
    </RouterLink>
</template>

<script setup>
import useArtistName from '../composables/useArtistName.js';
import { defineProps } from 'vue';

defineProps({
    artists: {
        type: Array,
        required: true,
    },
    small: {
        type: Boolean,
        default() {
            return false;
        }
    }
});
</script>

<style scoped>
a {
    font-size: 14px;
    margin-right: 5px;
}

a:hover {
    text-decoration: underline;
}
</style>
