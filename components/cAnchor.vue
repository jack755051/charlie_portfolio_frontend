<template>
    <a-anchor
        :affix="affix"
        :items="anchorData"
        @change="onChange"
        >
    </a-anchor>
</template>
<script  setup lang="ts">
import { defineProps } from 'vue';
import type { IAnchor } from '~/types/anchor.interface';

interface Props {
    anchorData: IAnchor,
    affix: boolean,
}

const rawProps = defineProps<{
    anchorData?: IAnchor[],
    affix?: boolean
}>()

const onChange = (link: string) => {
  console.log('Anchor:OnChange', link);
};

</script>