<template>
  <div class="card p-3">
    <div class="text-center">
      <img class="img-fluid" :src="item.logo" width="100" alt="Card   image cap" />
      <div class="card-body">
        <h5 class="card-title">{{ item.name | capitalize }}</h5>
        <h5 class="teal--text">{{item.email}}</h5>
        <h5>{{item.phone}}</h5> 
      </div>
      <div>
        <span
          v-for="(group, index) in item.stack"
          :key="index"
          :class="`badge badge-${tags[group]}`"
        >{{ group }}</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn class="primary">Contact Expert</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // list of tags to giving each stack a different color
      tags: {
        blight: "primary",
        canker: "dark",
        gall: "success",
        leafcurl: "danger",
        leafspot: "warning",
        powderymildew: "secondary",
        rootrot: "info",
        wilt: "danger",
        stunting: "danger",
        discoloration: "warning"
      }
    };
  },
  filters: {
    // this filter will can be used to capitalize a word
    capitalize: item => {
      return item.toUpperCase();
    }
  },
  props: {
    // this component expects a prop of type object
    item: {
      type: Object,
      required: true
    }
  }
};
</script>