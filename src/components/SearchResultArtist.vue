<template>
    <!--todo: пофиксить верстку при использовании RouterLink-->
    <div
        class="result-best-body"
        @click="redirect"
    >
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
</template>

<script setup>
import useImage from '../composables/useImage.js';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    result: {
        type: Object,
        required: true,
    }
});

function redirect() {
    router.push({name: 'artist', params: {id: props.result.id}});
}

</script>

<style scoped>
.result-best-body {
    cursor: pointer;
}

img {
    border-radius: 50%;
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
</style>
