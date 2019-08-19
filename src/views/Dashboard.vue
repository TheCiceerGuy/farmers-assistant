<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/farmer" class="secondary">Farmer's Index</v-btn>
      </v-flex>

      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/farmersentry" class="secondary">Farmer's Entry</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"
        ></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout
      v-if="!loading"
      row
      wrap
      v-for="entries in entry"
      :src="entries.image"
      :key="entries.id "
      @click="onLoadsingleFarmer(entries.id)"
      class="mb-2"
    >
      <v-flex xs12>
        <v-card class="#E0E0E0">
          <v-container fluid>
            <v-layout row>
              <v-flex xs12 sm6 md4>
                <v-card>
                  <v-img class="white--text" height="150px" :src="entries.image"></v-img>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-card-title>
                  <div class="text-xs-center">
                    <h3 class="pink--text">{{entries.title}}</h3>
                    <br />
                    <h5>{{entries.description}}</h5>
                    <br />
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn round color="primary" dark :to="'/farmer/' + entries.id">View Full Post</v-btn>
                  <v-icon right>arrow_forward</v-icon>
                </v-card-actions>
              </v-flex>

              <v-flex xs12 sm6 md2>
                <v-card-title>
                  <div class="text-xs-center">
                    <h3 class="pink--text">Location</h3>
                    <br />
                    <h4>{{entries.location}}</h4>
                    <br />
                    <v-btn round color="primary" dark>Contact farmer</v-btn>
                  </div>
                </v-card-title>
              </v-flex>

              <v-flex xs12 sm6 md2>
                <v-card-title>
                  <div class="text-xs-center">
                    <h3 class="pink--text">Price</h3>
                    <br />
                    <h4>{{entries.price}}</h4>
                    <br />
                    <v-btn round color="#F06292" dark pt-5>{{entries.status}}</v-btn>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  computed: {
    entry() {
      return this.$store.getters.loadedEntrys;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>


 <style scoped>
</style>



