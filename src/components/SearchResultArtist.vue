<template>
    <RouterLink
        :to="{name: 'artist', params: {id: result.id}}"
    >
        <div class="result-best-body">
            <img
                v-lazy="useImage(result, '100x100')"
                :alt="result.name">
            <p class="result-best-name">
                {{ result.name }}
            </p>

            <p class="result-best-type">
                Артист
            </p>
        </div>
    </RouterLink>
</template>

<script setup>
import useImage from '../composables/useImage.js';
import { defineProps } from 'vue';

defineProps({
    result: {
        type: Object,
        required: true,
    }
});

</script>

<style scoped>
.result-best-body {
    background: var(--background);
    border-radius: 6px;
    height: calc(100% - 45px);
    padding: 20px 80px 20px 20px;
    position: relative;
    overflow: hidden;
}

.result-best-body img {
    margin-bottom: 20px;
    border-radius: 50%;
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
</style>
