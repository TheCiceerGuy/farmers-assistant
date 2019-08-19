<template>
  <nav>
    <v-toolbar color="secondary" dark flat app>
      <v-toolbar-side-icon @click="drawer=!drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Farmer's Assistant</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="hov in hovMenu" :key="hov.text" :to="hov.route">
          <v-icon>{{ hov.icon }}</v-icon>
          {{hov.text}}
        </v-btn>

        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon>exit_to_app</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>//navigation starts
    <v-navigation-drawer app v-model="drawer" class="secondary" temporary>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon class="white--text">exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "person", text: "Farmer's Index", route: "/Farmer" },

        {
          icon: "directions_run",
          text: "Supplier's Index",
          route: "/Supplier"
        },
        {
          icon: "airline_seat_recline_extra",
          text: "Experts's Index",
          route: "/searchpage"
        }
      ]
    };
  },
  computed: {
    hovMenu() {
      let hovMenu = [
        { icon: "person", text: "Register", route: "/signup" },
        { icon: "dashboard", text: "Login", route: "/login" }
      ];
      if (this.userIsAuthenticated) {
        hovMenu = [
          { icon: "book", text: "Farmer Entry", route: "/farmersentry" }
        ];
      }
      return hovMenu;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>