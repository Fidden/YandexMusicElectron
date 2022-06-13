<template>
    <RouterLink
        :to="{name: 'playlist', params: {kind: playlist.kind}}"
        class="playlist-block">
        <img
            v-lazy="useImage(playlist)"
            :alt="playlist.title">
        <h4>{{ playlist.title }}</h4>
    </RouterLink>
</template>

<script setup>
import useImage from '../composables/useImage.js';
import { defineProps } from 'vue';

defineProps({
    playlist: {
        required: true,
        type: Object,
    }
});
</script>

<style scoped>
.playlist-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 56px;
    overflow: hidden;
    padding: 3px;
    border-radius: 4px;
    background: #292D39;
    -webkit-app-region: no-drag;
    cursor: pointer;
}

.playlist-block img {
    width: 50px;
    height: 50px;
    margin-right: 24px;
}

.playlist-block h4 {
    font-weight: 500;
    font-size: 14px;
}

</style>
