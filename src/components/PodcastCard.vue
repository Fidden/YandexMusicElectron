<template>
    <div class="podcast-card">
        <img
            v-lazy="useImage(actual.data, '400x400')"
            :alt="actual.data.title"
            class="preview-block-image">
        <p class="heading">
            {{ actual.data.heading }}
        </p>
        <p class="title">
            {{ actual.data.title }}
        </p>
        <p class="subtitle">
            {{ actual.data.subtitle }}
        </p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import useImage from '../composables/useImage.js';

defineProps({
    actual: {
        type: Object,
        required: true,
    }
});
</script>

<style scoped>

</style>
