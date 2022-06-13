<template>
    <div class="settings-container">
        <p class="title">
            Моя волна
        </p>
        <div class="setting-block">
            <p class="settings-block-title">
                По характеру
            </p>
            <div class="settings-block-body">
                <button class="active">Любимое</button>
                <button>Незнакомое</button>
                <button>Популярное</button>
                <button>Любое</button>
            </div>
        </div>
        <div class="setting-block">
            <p class="settings-block-title">
                Под настроение
            </p>
            <div class="settings-block-body">
                <button class="active">Бодрое</button>
                <button>Веселое</button>
                <button>Спокойное</button>
                <button>Грустное</button>
                <button>Любое</button>
            </div>
        </div>
        <div class="setting-block">
            <p class="settings-block-title">
                По языку
            </p>
            <div class="settings-block-body">
                <button class="active">Русское</button>
                <button>Иностранное</button>
                <button>Любой</button>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.settings-container {
    position: absolute;
    left: 0;
    top: -10px;
    transform: translateY(-100%);
    background: #242833;
    padding: 20px;
    border-radius: 6px;
    color: white;
    flex-direction: column;
    gap: 20px;
    display: none;
}

.title {
    font-size: 18px;
    font-weight: 400;
    text-align: center;
}

.setting-block {
    display: flex;
    flex-direction: column;
}

.settings-block-title {
    font-size: 12px;
    margin-bottom: 7px;
}

.settings-block-body {
    display: flex;
    flex-direction: row;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    background: var(--background);
}

.settings-block-body button {
    flex: 1;
    padding: 10px 12px;
    background: none;
    color: white;
    font-size: 14px;
    font-weight: 400;
}

.settings-block-body .active {
    background: var(--main-color);
    color: black;
}
</style>
