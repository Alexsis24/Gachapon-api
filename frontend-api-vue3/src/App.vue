<template>
  <div>
    <table border="1">
      <caption>
        Kõik Gachapon-masinad
      </caption>
      <tr>
        <th>Masina nimi</th>
      </tr>
      <tr v-for="gacha in gachas" :key="gacha.id">
        <td>{{ gacha.name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello wörld",
      gachas: [
        /* 
        {id:1,name:"testgachamachineforvue"},
    {id:2,name:"anothertestmachineforvue"}] */]
    }
  },
  async created() {this.gachas = await (await fetch("http://localhost:8090/gachas")).json}
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
