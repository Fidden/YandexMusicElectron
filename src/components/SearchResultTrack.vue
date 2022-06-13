<template>
    <div class="result-best-body">
        <img
            v-lazy="useImage(result, '100x100')"
            :alt="result.name">
        <p class="result-best-name">
            {{ result.title }}
        </p>
        <div class="footer">
            <div class="result-best-artist">
                <ArtistsLinks :artists="result.artists"/>
            </div>
            <p class="result-best-type">
                Трек
            </p>
        </div>
        <button
            class="play-btn"
            @click="playTrack">
            <i class="fas fa-play"/>
        </button>
    </div>
</template>

<script setup>
import useTrack from '../composables/useTrack.js';
import ArtistsLinks from '../components/ArtistsLinks.vue';
import useImage from '../composables/useImage.js';
import { defineProps, inject } from 'vue';
import { useStore } from 'vuex';

const request = inject('$request');
const store = useStore();

const props = defineProps({
    result: {
        type: Object,
        required: true,
    }
});

async function playTrack() {
    let track = await useTrack(request, props.result.id);

    await store.dispatch('unshiftToQueue', {track: track[0]});
}
</script>

<style scoped>
.result-best-body:hover .play-btn {
    opacity: 1;
    transition: 0.2s;
    transform: translateY(0px);
}

img {
    border-radius: 8px;
    margin-bottom: 20px;
}

.result-best-name {
    font-size: 28px;
    font-weight: bold;
}

.result-best-type {
    background: #1b202a;
    border-radius: 20px;
    padding: 2px 10px;
    width: min-content;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
}

.footer {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.result-best-artist {
    margin-right: 10px;
}

.result-best-artist a {
    cursor: pointer;
    font-size: 14px;
}

.result-best-artist a:hover {
    text-decoration: underline;
}

.play-btn {
    width: 50px;
    height: 50px;
    position: absolute;
    right: 20px;
    bottom: 20px;
    border-radius: 50%;
    background: var(--main-color);
    opacity: 0;
    transform: translateY(10px);
    transition: 0.2s;
}

.play-btn i {
    transform: translate(1px, 1px);
}

</style>
