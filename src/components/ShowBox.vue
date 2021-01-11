<template>
  <v-col cols="9" sm="4" md="4" lg="3" xl="2">
    <v-card class="pa-2" outlined>
      <v-img
        width="300"
        :src="$store.state.posterImgUrl + show.poster_path"
      ></v-img>
      <v-card-title>{{ show.title ? show.title : show.name }}</v-card-title>
      <v-card-text
        >{{ $t("published-date") }}:
        {{
          show.release_date ? show.release_date : show.first_air_date
        }}</v-card-text
      >
      <v-card-actions>
        <v-btn color="blue lighten-2" text @click="gotoShowDetail(show.id)">
          {{ $t("details-button") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import langMixin from "../mixins/langMixin";
export default {
  name: "ShowBox",
  props: ["show"],
  mixins: [langMixin],
  methods: {
    async gotoShowDetail(id) {
      this.$store.commit("SET_SELECTED_MOVIE_OR_TV_ID", id);
      await this.$store.dispatch("loadShowCreditsAndDetails");
      this.$router.push("showdetails");
    }
  }
};
</script>

<i18n>
{
  "en": {
    "details-button": "Details",
    "published-date": "Published Date"
  },
  "tr": {
    "details-button": "Detaylar",
    "published-date": "Gösterim Tarihi"
  }
}
</i18n>