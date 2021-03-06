<template>
    <RouterLink
        v-if="album"
        :to="{name: 'album', params: {id: props.item.id}}"
        class="album-card"
    >
        <img
            :alt="album.title"
            :src="useImage(album, '150x150')">

        <h3 class="title">
            {{ album.title }}
        </h3>
        <p
            v-if="album.artists && album.type !== 'compilation'"
            class="author">
            {{ useArtists(album.artists) }}
        </p>
        <div class="album-card-footer">
            <p
                v-if="album.type"
                class="type">
                {{ type }}
            </p>
            <p
                v-if="album.year"
                class="year">
                {{ album.year }}
            </p>
        </div>
    </RouterLink>
</template>

<script setup>
import { computed, defineProps, inject, onMounted, ref } from 'vue';
import useAlbum from '../composables/useAlbum.js';
import useImage from '../composables/useImage.js';
import useArtists from '../composables/useArtists.js';

const request = inject('$request');

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const album = ref({});

onMounted(async () => {
    album.value = Object.keys(props.item).length > 1 ?
        props.item :
        await useAlbum(request, props.item.id);
});

const type = computed(() => {
    if (album.value.type === 'compilation')
        return 'сборник';
    else if (album.value.type === 'playlist')
        return 'плейлист';
    else if (album.value.type === 'single')
        return 'сингл';
    else
        return album.value.type;
});

</script>

<style scoped>
.album-card {
    background: #292C3B;
    border-radius: 6px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 100%;
    height: 235px;
    max-width: 160px;
}

.album-card img {
    margin-bottom: 12px;
}

.title {
    font-size: 13px;
    font-weight: 500;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    line-height: 16px;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
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
}

.type {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8E929C;
}

.year {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8E929C;
    margin-left: auto;
}

.album-card-footer {
    display: flex;
    flex-direction: row;
    margin-top: auto;
}

.album-card-image button {
    opacity: 0;
    transition: 0.2s;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: var(--main-color);
    width: 45px;
    height: 45px;
    border-radius: 999px;
    z-index: 1000;
}

.album-card:hover .album-card-image button {
    opacity: 1;
    transition: 0.2s;
}

</style>
