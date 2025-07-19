<template>
    <a-table :dataSource="mockStore.dataSource" :columns="columns" />
</template>

<script lang="ts" setup>
import { useMockStore } from '~/stores/useMockStore';

const mockStore = useMockStore();
</script>