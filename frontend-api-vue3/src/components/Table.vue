<template>
    <table>
      <caption>
        {{
          caption
        }}
      </caption>
      <tr>
        <th v-for="(keyName, index) in keyNames" :key="index">
          {{ keyName }}
        </th>
        <th v-if="showControls"></th>
        <slot name="additionalHeaders"></slot>
      </tr>
      <tr v-for="item in items" :key="item.id">
        <td v-for="(keyName, index) in Object.keys(item)" :key="index">
          {{ item[keyName] }}
        </td>
        <td v-if="showControls">
          <button @click="$emit('show', item)">Show</button>
          <button @click="$emit('delete', item)">Delete</button>
        </td>
        
        <slot name="additionalColumns"></slot>
      </tr>
    </table>
  </template>
  <script>
  export default {
    props: {
      caption: String,
      items: Array,
      showControls: Boolean,
    },
    emits: ["show", "delete"],
    computed: {
      keyNames() {
        return this.items.length > 0 ? Object.keys(this.items[0]) : [];
      },
    },
  };
  </script>
  <style>
  table,
  th,
  td {
    border: 1px solid black;
  }
  </style>