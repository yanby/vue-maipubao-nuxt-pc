<template>
<section class="container">
    <nav-bar/>
    <div>地图找房</div>
</section>
</template>

<script>
import NavBar from '~/components/Nav/Nav.vue';
export default {
  head () {
    return {
      title: '地图找房',
      meta: [
        { hid: 'description', name: 'description', content: '地图找房' },
        { hid: 'title', name: 'title', content: '地图找房' },
        { hid: 'keywords', name: 'keywords', content: '地图找房' }
      ]
    }
  },
  components: {
    NavBar

  },
  methods: {
    
  },
  mounted(){
    
  }
}
</script>

<style lang="less" type="text/less" scoped>

</style>

