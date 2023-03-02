<template>
    <table>
        <caption> {{ caption }} </caption>
        <tr>
            <th v-for="(keyNames,index) in Object.keys(items[0])" :key="index"></th>
        </tr>
    </table>
</template>
<script>
export default {
    props: {
        caption: String,
        items: Array,
    },
};
</script>
<style>

</style>