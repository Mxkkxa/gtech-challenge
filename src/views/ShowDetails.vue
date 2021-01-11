<template>
  <v-container class="grey lighten-5">
    <v-row align="center" dense>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <div>
          <v-img
            class="justify-center justify-space-between align-center align-self-center"
            :src="'https://image.tmdb.org/t/p/w300/' + showDetails.poster_path"
          ></v-img>
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <v-card shaped outlined>
          <v-btn
            color="blue lighten-2"
            class="float-right"
            text
            @click="goBack"
          >
            {{ $t("back-button") }}
          </v-btn>
          <v-card-title>
            {{ showDetails.title ? showDetails.title : showDetails.name }}
          </v-card-title>
          <v-card-text>
            <div>
              {{ $t("published-date") }}:
              {{
                showDetails.release_date
                  ? showDetails.release_date
                  : showDetails.first_air_date
              }}
            </div>
            <div>{{ $t("genres") }}: {{ genres.join(", ") }}</div>
          </v-card-text>
          <v-card-title> {{ $t("overview") }} </v-card-title>
          <v-card-text>{{ showDetails.overview }}</v-card-text>
          <v-card-subtitle>
            <b>{{ $t("castlist") }}</b>
          </v-card-subtitle>
          <v-card-text>
            <!-- <div>{{ castList.join(", ") }}</div> -->
            <div class="cast_list">
              <CastRow
                v-for="person in showCredits.cast"
                :person="person"
                :key="person.id"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CastRow from "../components/CastRow";
import langMixin from "../mixins/langMixin";

export default {
  components: {
    CastRow
  },
  mixins: [langMixin],
  computed: {
    showDetails() {
      return this.$store.state.selectedShowDetails;
    },
    showCredits() {
      return this.$store.state.selectedShowCredits;
    },
    genres() {
      if (this.showDetails.genres !== undefined) {
        return this.showDetails.genres?.map(genre => genre.name);
      } else {
        return [];
      }
    },
    castList() {
      return this.showCredits.cast?.map(person => person.name);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.cast_list {
  height: 300px;
  overflow: auto;
  overflow-x: hidden;
}
</style>

<i18n>
{
  "en": {
    "details-button": "Details",
    "published-date": "Published Date",
    "overview": "Overview",
    "genres": "Genres",
    "castlist": "Cast list",
    "back-button": "< Back"
  },
  "tr": {
    "details-button": "Detaylar",
    "published-date": "Gösterim Tarihi",
    "overview": "Özet",
    "genres": "Türler",
    "castlist": "Oyuncular",
    "back-button": "< Geri"
  }
}
</i18n>