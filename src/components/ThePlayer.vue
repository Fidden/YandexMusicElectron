<template>
    <Transition>
        <div
            v-show="currentTrack"
            class="player-container">
            <TheStationSettings/>
            <div class="player-seek-slider">
                <p class="start-time">
                    {{ convertToTime(player.time) }}
                </p>

                <RangeSlider
                    :max-value="player.duration"
                    :step="0.01"
                    :value="player.time"
                    @change="setTime"/>

                <p class="end-time">
                    {{ convertToTime(player.duration) }}
                </p>
            </div>
            <div class="player-body">
                <audio
                    ref="audio"
                    autoplay
                    crossorigin
                    preload="auto"
                    style="display: none"
                    @buffered="update"
                    @loadeddata="load"
                    @pause="pause"
                    @play="play"
                    @timeupdate="update"
                />
                <!--todo: сделать вывод саб заголовка ( Remix, MIX Instr. etc ) -->
                <div
                    v-if="currentTrack"
                    class="player-track-info">
                    <img
                        v-lazy="useImage(currentTrack.track)"
                        alt="img"
                        class="player-track-image">
                    <div class="player-track-text">
                        <a
                            class="player-track-title"
                            href="#">
                            {{ currentTrack.track.title }}
                        </a>
                        <div class="player-track-artist">
                            <ArtistsLinks
                                :artists="currentTrack.track.artists"
                                style="font-size: 12px"/>
                        </div>
                    </div>
                </div>

                <button
                    class="like control-btn"
                    @click="handleLike">
                    <i
                        v-if="currentTrack?.liked"
                        class="fas fa-heart"/>
                    <i
                        v-else
                        class="fal fa-heart"/>
                </button>

                <div class="player-body-controls">
                    <button
                        v-if="!isStationPlaying"
                        class="control-btn"
                        @click="shuffleTracks">
                        <i
                            :class="{'active': shuffle}"
                            class="fal fa-random"/>
                    </button>
                    <button
                        v-else
                        class="control-btn">
                        <i class="far fa-sliders-h"/>
                    </button>

                    <button
                        v-if="!isStationPlaying"
                        class="control-btn"
                        @click="prev">
                        <i class="fal fa-step-backward"/>
                    </button>
                    <LoadingSpinner v-if="!player.loaded"/>
                    <div v-else>
                        <button
                            v-if="player.playing"
                            class="control-btn"
                            @click="pause">
                            <i class="fas fa-pause"/>
                        </button>
                        <button
                            v-else
                            class="control-btn"
                            @click="play">
                            <i class="fas fa-play"/>
                        </button>
                    </div>

                    <button
                        class="control-btn"
                        @click="next">
                        <i class="fal fa-step-forward"/>
                    </button>
                    <button
                        class="control-btn"
                        @click="repeat"
                    >
                        <i
                            :class="repeatIcon"
                            class="fal"/>
                    </button>
                </div>
                <div class="volume-container">
                    <button
                        v-if="player.volume > 0"
                        class="control-btn"
                        @click="mute">
                        <i
                            :class="volumeIcon"
                            class="fal"/>
                    </button>
                    <button
                        v-else
                        class="control-btn"
                        @click="unmute">
                        <i class="fal fa-volume-mute"/>
                    </button>

                    <RangeSlider
                        :max-value="100"
                        :value="player.volume"
                        @change="setVolume"
                    />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import useImage from '../composables/useImage.js';
import RangeSlider from './RangeSlider.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import TheStationSettings from './TheStationSettings.vue';
import useLikeAction from '../composables/useLikeAction.js';
import { computed, inject, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import sendStationFeedback from '../composables/useSendStationFeedback.js';
import useTrackDirectLink from '../composables/useTrackDirectLink.js';
import ArtistsLinks from './ArtistsLinks.vue';

const store = useStore();
const request = inject('$request');

const audio = ref(null);
const player = ref({
    player: null,
    time: 0,
    duration: 0,
    buffered: 0,
    playing: false,
    volume: 20,
    loaded: false,
    volumeBackup: 0,
    currentTrackLiked: false,
});

onMounted(() => {
    audio.value.volume = player.value.volume * 0.01;
});

const shuffle = computed(() => store.state.player.shuffle);

const currentTrack = computed(() => {
    if (!store.state.track.queue.length)
        return null;

    let randIndex = Math.floor(
        Math.random() * (store.state.track.queue.length - 1));

    let track = store.state.track.queue[shuffle.value
        ? randIndex
        : 0];

    store.dispatch('setTrackIndex', track.track.id);
    store.dispatch('setRpc', track.track.title);

    return track;
});

const volumeIcon = computed(() => {
    if (player.value.volume === 0)
        return 'fa-volume-off';
    else if (player.value.volume <= 25)
        return 'fa-volume-down';
    else if (player.value.volume >= 75)
        return 'fa-volume-up';
    else
        return 'fa-volume';
});

const repeatIcon = computed(() => {
    switch (store.state.player.repeat) {
        case 1:
            return 'fa-repeat active';
        case 2:
            return 'fa-repeat-1 active';
        default:
            return 'fa-repeat';
    }
});

const isStationPlaying = computed(() => store.state.stations.isPlaying);

watch(player, async (value) => {

    //Включаем плеер или ставим на паузу
    await store.dispatch('setPlaying', value.playing);

    //Устанавливаем громкость
    audio.value.volume = value.volume * 0.01;

    //Переключаем трек если время пришло
    if (value.time >= value.duration && (value.time !== 0 && value.duration !== 0))
        await next(false);

}, {deep: true});

watch(currentTrack, async (value) => {
    if (!value)
        return;

    player.value.currentTrackLiked = value?.liked;

    await pause();
    {
        audio.value.currentTime = 0;
        player.value.loaded = false;
        audio.value.src = await useTrackDirectLink(request, value.id || value.track.id);
        await audio.value.load();
    }
    await play();
});

async function play() {
    await audio.value.play();
    player.value.playing = true;
}

async function pause() {
    await audio.value.pause();
    player.value.playing = false;
}

async function next(skip = true) {
    //if repeat is set
    if (store.state.player.repeat > 0) {
        //repeat once
        if (store.state.player.repeat === 1)
            await store.dispatch('setRepeat', 0);

        return audio.value.currentTime = 0;
    }

    await pause();
    await store.dispatch('addToPlayed', currentTrack.value);
    await store.dispatch('removeFromQueue', currentTrack.value);

    if (store.state.stations.isPlaying) {

        await sendStationFeedback(
            store,
            request,
            skip ? 'skip' : 'trackFinished',
            audio.value.currentTime,
            store.state.stations.current.batch_id,
            `${currentTrack.value.track.id}:${currentTrack.value.track.albums[0].id}`,
        );

        await loadNewStationTracks();

        await sendStationFeedback(
            store,
            request,
            'trackStarted',
            null,
            store.state.stations.current.batch_id,
            `${currentTrack.value.track.id}:${currentTrack.value.track.albums[0].id}`,
        );
    }
}

async function prev() {
    if (player.value.time > 3) {
        audio.value.currentTime = 0;
    } else {
        await pause();
        await store.dispatch('unshiftToQueue', store.state.track.played.pop());
    }
}

async function shuffleTracks() {
    await store.dispatch('setShuffle', !shuffle.value);
}

function update() {
    player.value.time = audio.value.currentTime;
    player.value.buffered = audio.value.buffered.length ? audio.value.buffered.end(0) : 0;
}

function load() {
    if (audio.value.readyState >= 2) {
        player.value.loaded = true;
        player.value.duration = parseInt(audio.value.duration);
        return audio.value.play();
    }
    throw new Error('Failed to load sound file.');
}

function mute() {
    player.value.volumeBackup = player.value.volume;
    player.value.volume = 0;
}

function unmute() {
    player.value.volume = player.value.volumeBackup;
}

function repeat() {
    if (store.state.player.repeat < 2) {
        store.dispatch('incrementRepeat');
    } else
        store.dispatch('setRepeat', 0);
}

function convertToTime(value) {
    const time = new Date(value * 1000).toISOString().substr(11, 8);
    return time.indexOf('00:') === 0 ? time.substr(3) : time;
}

function setVolume(volume) {
    player.value.volume = volume;
}

function setTime(time) {
    audio.value.currentTime = time;
}

async function loadNewStationTracks() {
    let newQueue = store.state.track.queue[0];
    await store.dispatch('setQueue', newQueue);

    let tracks = await getStationTracks(false,
        store.state.track.played[store.state.track.played.length - 1]);

    tracks = tracks.filter(item => item.track.id !== newQueue.track.id);

    await store.dispatch('addTracksToQueue', tracks);
}

async function handleLike() {
    let result = await useLikeAction(request,
        store,
        'track',
        `${currentTrack.value.track.id}:${currentTrack.value.track.albums[0].id}`,
        currentTrack.value?.liked);

    if (Object.hasOwn(currentTrack, 'liked'))
        currentTrack.value.liked = result;
}

async function getStationTracks(settings = false, track_id_before = -1) {
    let params = track_id_before ? {'queue': track_id_before} : (settings ? {'settings2': 'true'} : false);

    let res = await request.get(`rotor/station/${store.state.stations.current.name}/tracks`, {
        data: params,
    });

    await store.dispatch('setCurrentStationBatchId', res.data.result.batchId);

    return res.data.result.sequence;
}
</script>

<style scoped>
.player-container {
    background: #242833;
    display: flex;
    flex-direction: column;
    padding: 8px;
    border-radius: 6px;
    position: fixed;
    left: 68px;
    bottom: 8px;
    width: calc(100% - 76px);
    -webkit-app-region: no-drag;
}

.player-seek-slider {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
}

.start-time, .end-time {
    font-weight: 400;
    font-size: 10px;
    line-height: 16px;
    color: #D8DBE4;
    width: 30px;
}

.start-time {
    margin-right: 5px;
}

.end-time {
    margin-left: 5px;
}

.player-body {
    display: flex;
    flex-direction: row;
    margin-top: 16px;
}

.control-btn {
    color: #C4C4C4;
    background: none;
}

.player-track-image {
    width: 42px;
    height: 42px;
    border-radius: 4px;
    margin-right: 10px;
    z-index: 100;
}

.player-track-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 17px;
    width: 200px;
    overflow: hidden;
}

.player-track-text {
    display: flex;
    flex-direction: column;
}

.player-track-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    color: white;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: normal;
    overflow: hidden;
}

.player-track-artist {
    color: #8E919A;
    white-space: nowrap;
}

.player-body-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 35px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 69%;
    transform: translate(-50%, -50%);
}

.active {
    color: var(--main-color);
}

.volume-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;
}

.v-enter-active,
.v-leave-active {
    transition: transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    transform: translateY(120%);
}

</style>
