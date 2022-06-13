<template>
    <RouterLink
        :to="{name: 'artist', params: {id: artist.id}}"
        class="artist-card"
    >
        <img
            v-lazy="useImage(artist, '200x200')"
            :alt="artist.name"
            class="card-image">
        <h4>{{ artist.name }}</h4>
        <p class="tracks-count">
            {{ artist.counts.tracks }} Треков
        </p>
    </RouterLink>
</template>

<script setup>
import { defineProps } from 'vue';
import useImage from '../composables/useImage.js';

defineProps({
    artist: {
        type: Object,
        required: true,
    }
});

</script>

<style scoped>
.artist-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.card-image {
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
}

.tracks-count {
    font-weight: 400;
    font-size: 12px;
}

h4 {
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 7px;
}

</style>
