<template>
    <div>
        <TheFilter
            v-if="filterBar"
            :data="tracks"
            :filter-func="filterFunc"
            @filtered="onFiltered"
        />
        <table
            v-if="filteredTracks.length > 0"
            :class="{'with-out-image': withoutImage}">
            <thead>
            <tr>
                <th>№</th>
                <th v-if="!withoutImage"/>
                <th style="margin-left: 14px;">
                    Название
                </th>
                <th>Артист</th>
                <th style="margin-right: 5px;">
                    <i class="fal fa-clock fa-sm"/>
                </th>
            </tr>
            </thead>
            <tbody>
            <!--fixme: при клике на артиста трек включается заного (сделать через релатив tr и накинуть сверху блок (z-index))-->
            <tr
                v-for="(track, index) in filteredTracks"
                :key="track.id"
                :class="{'playing': store.state.player.track_index === track.track.id}"
            >
                <td
                    class="index"
                    @click="playCurrent(track, index)">
                    <span>{{ index + 1 }}</span>
                    <i class="fas fa-play"/>
                </td>
                <td
                    v-if="!withoutImage"
                    class="image"
                    @click="playCurrent(track, index)">
                    <img
                        v-lazy="useImage(track.track)"
                        :alt="track.track.title">

                    <PlayingIcon
                        v-if="store.state.player.track_index === track.track.id"
                        :stop="!store.state.player.playing"/>
                </td>
                <td
                    class="title"
                    @click="playCurrent(track, index)">
                    {{ track.track.title }}
                </td>
                <td>
                    <ArtistsLinks :artists="track.track.artists"/>
                </td>
                <td
                    class="duration"
                    @click="playCurrent(track, index)">
                    {{ useConvertDuration(track.track.durationMs) }}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import ArtistsLinks from '../components/ArtistsLinks.vue';
import useConvertDuration from '../composables/useConvertDuration.js';
import useImage from '../composables/useImage.js';
import { defineProps, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import PlayingIcon from './PlayingIcon.vue';
import TheFilter from './TheFilter.vue';

const props = defineProps({
    tracks: {
        type: Array,
        required: true,
    },
    withoutImage: {
        type: Boolean,
        default() {
            return false;
        }
    },
    filterBar: {
        type: Boolean,
        default() {
            return true;
        }
    }
});

const store = useStore();

const filterFunc = reactive([
    compareName,
    compareArtists,
    compareDuration,
]);

const filteredTracks = ref([]);

onMounted(() => {
    filteredTracks.value = props.tracks;
});

watch(props, (value) => {
    filteredTracks.value = value.tracks;
}, {deep: true});

function playCurrent(track, index = -1) {
    store.dispatch('setShuffle', false);
    if (index === -1) {
        store.dispatch('unshiftToQueue', track);
    } else {
        //add tracks after index
        let newQueue = props.tracks.slice(index, props.tracks.length);
        //add to the end tracks before index
        newQueue = newQueue.concat(props.tracks.slice(0, index));

        store.dispatch('setQueue', newQueue);
    }
    store.dispatch('setIsPlaying', false);
}

function getArtistMappingName(artists) {
    return artists.map(item => item.name[0]).toString();
}

function compareName(a, b) {
    if (a.track.title > b.track.title)
        return 1;

    if (a.track.title < b.track.title)
        return -1;

    return 0;
}

function compareArtists(a, b) {
    if (getArtistMappingName(a.track.artists) > getArtistMappingName(b.track.artists))
        return 1;

    if (getArtistMappingName(a.track.artists) < getArtistMappingName(b.track.artists))
        return -1;

    return 0;
}

function compareDuration(a, b) {
    if (a.track.durationMs > b.track.durationMs)
        return 1;

    if (a.track.durationMs < b.track.durationMs)
        return -1;

    return 0;
}

function onFiltered(data) {
    filteredTracks.value = data;
}

</script>

<style scoped>

table {
    display: grid;
    border-collapse: collapse;
    min-width: 100%;
    grid-template-columns: min-content 40px 2fr 1fr min-content;
    gap: 10px 0;
    margin-top: 20px;
}

.with-out-image {
    grid-template-columns: min-content 2fr 1fr min-content;
    gap: 0;
}

.with-out-image td {
    padding: 10px 0;
}

tr {
    border-radius: 8px;
    transition: 0.2s;
    cursor: pointer;
}

tr:hover td {
    transition: 0.2s;
    background: #1E222D;
}

thead,
tbody,
tr {
    display: contents;
}

th,
td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

thead {
    margin-bottom: 20px;
}

th {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;
    color: #8E929C;
    text-align: left;
}

th:last-child {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

td {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    padding: 0;
    height: 40px;
}

td:first-child {
    border-radius: 8px 0 0 8px;
    padding-inline: 5px;
}

td:last-child {
    border-radius: 0 8px 8px 0;
    padding-right: 5px;
}

.index {
    min-width: 25px;
}

.image {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
}

.image img {
    border-radius: 4px;
}

.title {
    padding-left: 14px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
}

.duration {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    align-items: center;
}

tr .index i {
    display: none;
    font-size: 10px;
}

tr .index span {
    display: block;
}

tr:hover .index i {
    display: block;
}

tr:hover .index span {
    display: none;
}

.playing {
    transition: 0.2s;
}

.playing .index, .playing .title {
    color: var(--main-color)
}


</style>
