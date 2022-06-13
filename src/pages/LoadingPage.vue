<template>
    <LayoutSmall>
        <div class="loading-page">
            <LoadingSpinner/>
            <p>Загрузка</p>
        </div>
    </LayoutSmall>
</template>

<script setup>
import LayoutSmall from '../layouts/LayoutSmall.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';</script>

<style scoped>
.loading-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
