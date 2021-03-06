<template>
    <RouterLink
        v-if="playlist"
        :to="{name: 'playlist', params: {kind: props.item.kind, uid: props.item.uid}}"
        class="playlist-card"
    >
        <div class="playlist-card-image">
            <img
                :alt="playlist.title"
                :src="useImage(playlist, '200x200')">
        </div>

        <h3 class="title">
            {{ playlist.title }}
        </h3>
        <p
            v-if="playlist.owner"
            class="author">
            От {{ playlist.owner.name }}
        </p>
        <p
            v-if="tracksCount"
            class="track-count">
            {{ playlist.trackCount }} Треков
        </p>
    </RouterLink>
</template>

<script setup>
import useImage from '../composables/useImage.js';
import { defineProps, inject, onMounted, ref } from 'vue';
import usePlaylist from '../composables/usePlaylist.js';
import { useStore } from 'vuex';

const store = useStore();
const request = inject('$request');

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    tracksCount: {
        type: Boolean,
        default() {
            return false;
        }
    },
});

const playlist = ref({});

onMounted(async () => {
    playlist.value = Object.keys(props.item).length > 2 ?
        props.item :
        await usePlaylist(request, props.item.kind, props.item?.uid || store.getters.userId);
});

</script>

<style scoped>
.playlist-card {
    background: #292C3B;
    border-radius: 6px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    max-width: 160px;
    width: 100%;
    height: 235px;
}

.playlist-card img {
    margin-bottom: 12px;
}

.title {
    font-weight: 500;
    font-size: 12.8px;
    line-height: 16px;
}

.playlist-card-image {
    position: relative;
}

.playlist-card-image img {
    width: 100%;
    object-fit: cover;
}

.track-count {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8E929C;
}

.author {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8E929C;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    align-items: center;
    margin-top: auto;
}

</style>
