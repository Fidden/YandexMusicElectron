<template>
    <header class="header">
        <div class="header-logo">
            <img
                alt="logo"
                src="@/assets/img/logo.svg">
            <p>Яндекс.Музыка</p>
        </div>

        <TheSearch/>

<!--        <RouterLink-->
<!--            class="account"-->
<!--            to="/">-->
<!--            A-->
<!--        </RouterLink>-->

        <div class="controls">
            <button @click="minimize">
                <img
                    alt="min"
                    src="../assets/img/minimize.svg">
            </button>
            <button @click="maximize">
                <img
                    alt="min"
                    src="../assets/img/maxsimize.svg">
            </button>
            <button @click="close">
                <img
                    alt="min"
                    src="../assets/img/close.svg">
            </button>
        </div>
    </header>
</template>

<script setup>
import TheSearch from './TheSearch.vue';

const {ipcRenderer} = require('electron');

function minimize() {
    ipcRenderer.send('minimize');
}

function maximize() {
    ipcRenderer.send('maximize');
}

function close() {
    ipcRenderer.send('close');
}
</script>

<style scoped>
.header, .controls, .header-logo {
    display: flex;
    flex-direction: row;
}

.header {
    height: 35px;
    color: white;
    align-items: center;
    position: relative;
    margin: 15px 0 15px 20px;
}

.header-logo img {
    width: 15px;
    height: 15px;
    margin: auto 10px auto 0;
}

.header-logo {
    font-size: 12px;
    font-weight: 400;
}

.controls {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
}

.controls button {
    width: 45px;
    height: 35px;
    background: none;
    outline: none;
    border: none;
}

.controls button img {
    width: 10px;
    height: 10px;
}

.account {
    margin-right: 20px;
    border-radius: 999px;
    background: yellow;
    color: black;
    text-decoration: none;
    width: 35px;
    height: 35px;
}


</style>
