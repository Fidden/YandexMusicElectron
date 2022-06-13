<template>
    <TheLayout v-if="$store.state.app.state === AppStatusEnum.LOADED"/>
    <LoadingPage v-else-if="$store.state.app.state === AppStatusEnum.LOADING"/>
    <LoginPage v-else-if="$store.state.app.state === AppStatusEnum.LOGIN"/>
</template>

<script setup>
import AppStatusEnum from './enums/AppStatusEnum.js';
import TheLayout from './layouts/TheLayout.vue';
import LoadingPage from './pages/LoadingPage.vue';
import LoginPage from './pages/LoginPage.vue';

import { ipcRenderer } from 'electron';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { useStore } from 'vuex';
import { inject, onMounted, watch } from 'vue';
import useDiscordRPC from './composables/useDiscordRPC.js';


const store = useStore();
const request = inject('$request');

onMounted(async () => {
    if (localStorage.getItem('token'))
        await store.dispatch('setAppState', AppStatusEnum.LOADING);
    else
        return await store.dispatch('setAppState', AppStatusEnum.LOGIN);

    cacheImages();

    useDiscordRPC(store, '978250588540272651');
});


watch(store.state.app, async (value) => {
    switch (value.state) {
        case AppStatusEnum.LOADED:
            ipcRenderer.send('loaded');
            break;
        case AppStatusEnum.LOGIN:
            ipcRenderer.send('loading');
            break;
        case AppStatusEnum.LOADING:
            request.defaults.headers.common['Authorization'] = `OAuth ${localStorage.getItem('token')}`;
            ipcRenderer.send('loading');
            await setStoreData();
            break;
    }

}, {deep: true});

async function setStoreData() {
    await store.dispatch('setUser', await getAccountInfo());
    await store.dispatch('setPlaylists', await getPlaylists());
    await store.dispatch('setNewReleases', await getNewReleases());
    await store.dispatch('setHitsPlaylists', await getHitsPlaylists());
    await store.dispatch('setAppState', 0);
}

async function getAccountInfo() {
    let res = await request.get('account/status');
    return res.data.result;
}

async function getPlaylists() {
    let res = await request.get(`users/${store.state.user.account.uid}/playlists/list/`);
    return res.data.result;
}

async function getNewReleases() {
    let res = await request.get('/landing3/new-releases');
    return res.data.result.newReleases;
}

async function getHitsPlaylists() {
    let res = await request.get('/landing3/new-playlists');
    return res.data.result.newPlaylists;
}

function cacheImages() {
    registerRoute(
        // Cache image files.
        /\.(?:png|jpg|jpeg|svg|gif)$/,
        // Use the cache if it's available.
        new CacheFirst({
            // Use a custom cache name.
            cacheName: 'image-cache',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 1000,
                    maxAgeSeconds: 24 * 60 * 60,
                })
            ],
        })
    );
}
</script>

<style>
@import url('./assets/css/reset.css');
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

:root {
    --background: #151a22;
    --main-color: #FCCA00; /*old #F7F096*/
    --main-color-transperent: rgba(247, 240, 150, 0.03);
    --volume-width: 0px;
}

* {
    font-family: 'Rubik', sans-serif;
    box-sizing: border-box;
}

html, body, #app {
    width: 100%;
    height: 100%;
}

body {
    background: var(--background);
    overflow: hidden;
}

button, input, a {
    -webkit-app-region: no-drag;
    outline: none;
    border: none;
    text-decoration: none;
}

a {
    color: white;
    cursor: pointer;
}

button, a {
    cursor: pointer;
}

.layout-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.content {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

.main {
    padding: 45px 54px 180px 54px;
    background: rgba(30, 34, 45, 0.7);
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-app-region: no-drag;
    color: white;
    border-radius: 8px 0px;
}

.main-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 45px;
}

.main-container-title {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    justify-content: space-between;
}

.main-container-title h2 {
    font-weight: 500;
    font-size: 25px;
    line-height: 20px;
}

.main-container-show-all {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: var(--main-color);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.main-container-subtitle {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #8E929C;
}

.btn {
    color: var(--main-color);
    border-radius: 999px;
    padding: 7px 25px;
    background: none;
    border: 2px solid var(--main-color);
    font-size: 14px;
    transition: 0.2s;
}

.btn:hover {
    background: var(--main-color);
    color: black;
    transition: 0.2s;
}

*::-webkit-scrollbar {
    background: none;
    width: 4px;
}

*::-webkit-scrollbar-track {
    background: none;
}

*::-webkit-scrollbar-thumb {
    background-color: var(--main-color);
    border-radius: 10px;
}

.flickity-viewport {
    height: 240px !important;
}

.flickity-button {
    background: none !important;
    width: 34px !important;
    height: 34px !important;
    color: rgba(255, 255, 255, 0.7) !important;
    transition: 0.2s;
}

.flickity-button.previous {
    transform: translate(-120%, -50%) !important;
}

.flickity-button.next {
    transform: translate(120%, -50%) !important;
}

.flickity-button:hover {
    transition: 0.2s;
    color: var(--main-color) !important;
}

.carousel-cell {
    margin-right: 7px;
    width: 160px;
    height: 240px;
}

</style>
