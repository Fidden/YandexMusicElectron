<template>
    <div class="layout-container">
        <TheHeader/>
        <div class="content">
            <TheBar/>
            <router-view/>
            <ThePlayer/>
        </div>
    </div>
</template>

<script setup>
import TheHeader from '../components/TheHeader.vue';
import TheBar from '../components/TheBar.vue';
import ThePlayer from '../components/ThePlayer.vue';
</script>

<style scoped>

</style>
