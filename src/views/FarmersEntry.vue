<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="primary--text">Create a New Farmers Entry</h2>
      </v-flex>
    </v-layout>

    <v-form v-model="valid" lazy-validation @submit.prevent="onFarmersEntry">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field name="title" id="title" v-model="title" label="Title" required></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-textarea
            name="description"
            id="description"
            v-model="description"
            label="Description"
            multi-line
            required
          ></v-textarea>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field name="status" id="status" v-model="status" label="Status" required></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field name="price" id="price" v-model="price" label="Price(/kg)" required></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field name="location" id="location" v-model="location" label="Location" required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field name="phone" id="phone" v-model="phone" label="Phone Number" required></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field name="image" id="image" v-model="image" label="Image Url" required></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <img :src="image" height="200" />
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <h4>Choose a Data & Time</h4>
        </v-flex>
      </v-layout>

      <v-layout row class="mb-2">
        <v-flex xs12 sm6 offset-sm3>
          <v-date-picker v-model="date"></v-date-picker>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-time-picker v-model="time" format="24hr"></v-time-picker>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-btn class="primary" :disabled="!formIsValid" type="submit">Submit Entry</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      status: "",
      price: "",
      image: "",
      location: "",
      phone: "",
      date: new Date(),
      time: new Date()
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.description !== "" &&
        this.status !== "" &&
        this.price !== "" &&
        this.image !== "" &&
        this.phone !== ""
      );
    },
    submittableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        let hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    }
  },
  methods: {
    onFarmersEntry() {
      if (!this.formIsValid) {
        return;
      }
      const entryData = {
        title: this.title,
        description: this.description,
        status: this.status,
        price: this.price,
        image: this.image,
        location: this.location,
        phone: this.phone,
        date: this.submittableDateTime
      };

      this.$store.dispatch("farmersEntry", entryData);
      this.$router.push("/farmer");
    }
  }
};
</script>
