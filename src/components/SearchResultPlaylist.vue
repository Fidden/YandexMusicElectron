<template>
    <RouterLink
        :to="{name: 'playlist', params: {kind: result.kind, uid: result.owner.uid}}"
    >
        <div class="result-best-body">
            <img
                v-lazy="useImage(result, '100x100')"
                :alt="result.name">
            <p class="result-best-name">
                {{ result.title }}
            </p>

            <div class="footer">
                <div class="result-best-artist">
                    От {{ result.owner.name }}
                </div>
                <p class="result-best-type">
                    Плейлист
                </p>
            </div>
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
    border-radius: 8px;
    margin-bottom: 20px;
}

.result-best-name {
    font-size: 28px;
    font-weight: bold;
    line-height: 28px;
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
</style>
