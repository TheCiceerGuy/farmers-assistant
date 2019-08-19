<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate class="primary--text" :width="7" :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="pink--text">Farmer's Data</h4>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-entry-details-dialog :entries="entries"></app-edit-entry-details-dialog>
            </template>
          </v-card-title>
          <v-card>
            <v-img class="white--text" height="400px" :src="entries.image"></v-img>
          </v-card>
          <v-card-text>
            <div>
              <h3 class="pink--text">Title:</h3>
              <h2>{{entries.title}}</h2>

              <br />
            </div>
            <hr />
            <div>
              <h3 class="pink--text">Description :</h3>
              <br />
              {{entries.description}}
            </div>
            <hr />
            <div>
              <h3 class="pink--text">Phone Number</h3>
              <h4>
                {{entries.phone}}
                <v-btn round color="primary" dark>Contact farmer</v-btn>
              </h4>
            </div>
            <hr />
            <div>
              <h3 class="pink--text">Price :</h3>
              <br />
              <h4>
                {{entries.price}}
                <v-btn round color="#F06292" dark pt-5>Instock</v-btn>
              </h4>
            </div>
            <hr />
            <div>
              <h2>Time of Post:</h2>
              {{ entries.date | date }}
            </div>
            <hr />
            <div>
              <h3 class="pink--text">Location</h3>
              <h4>{{entries.location}}</h4>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ["id"],
  computed: {
    entries() {
      return this.$store.getters.loadedSingleEntry(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.entries.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
    