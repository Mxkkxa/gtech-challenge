<template>
  <v-container class="grey lighten-5">
    <v-row class="mb-6">
      <v-col cols="10" sm="12" md="8" lg="8" xl="8" order="1">
        <v-text-field
          v-model="showSearchTerm"
          :label="$t('search-label')"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" xl="4" order="0">
        <v-select
          :items="languageItems"
          v-model="language"
          :label="$t('select-language')"
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col cols="12" sm="4" md="4" lg="4" xl="4">
        <v-select
          :items="items"
          v-model="sortType"
          :label="$t('sort-label')"
        ></v-select>
      </v-col>

      <ShowBox v-for="show in shows" :show="show" :key="show.id" />

      <button @click="$store.dispatch('loadShowsData')">
        {{ $t("more") }}
      </button>
    </v-row>
  </v-container>
</template>

<script>
import ShowBox from "../components/ShowBox";
import langMixin from "../mixins/langMixin";
export default {
  name: "Home",
  mixins: [langMixin],
  components: {
    ShowBox
  },
  beforeMount() {
    this.$store.dispatch("loadShowsData");
  },
  computed: {
    shows() {
      return this.$store.getters.getFilteredShows;
    },
    showSearchTerm: {
      get() {
        return this.$store.state.searchTerm;
      },
      set(val) {
        this.$store.commit("SET_SEARCH_TERM", val);
      }
    },
    sortType: {
      get() {
        return this.$store.state.sortType;
      },
      set(val) {
        this.$store.commit("SET_SORT_TYPE", val);
      }
    },
    language: {
      get() {
        return this.$store.state.lang;
      },
      set(val) {
        this.$store.commit("SET_LANGUAGE", val);
      }
    },
    items() {
      return [
        {
          text: this.$t("pop-desc"),
          value: "popularity-desc"
        },
        {
          text: this.$t("pop-asc"),
          value: "popularity-asc"
        },
        {
          text: this.$t("vote-desc"),
          value: "vote-desc"
        },
        {
          text: this.$t("vote-asc"),
          value: "vote-asc"
        }
      ];
    }
  },
  methods: {
    async loadm() {
      console.log(await this.$store.dispatch("loadShowsData"));
    },
    async filtershows() {
      console.log(this.$store.getters.getFilteredShows("popularity-desc"));
    },
    async getSelectedShow() {
      console.log(this.$store.getters.getSelectedShowById);
    },
    async getCast() {
      await this.$store.dispatch("getSelectedShowCast");
    }
  },
  data: function() {
    return {
      languageItems: [
        {
          text: "Türkçe",
          value: "tr"
        },
        {
          text: "English",
          value: "en"
        }
      ]
    };
  }
};
</script>

<i18n>
{
  "en": {
    "select-language": "Language",
    "more": "more",
    "search-label": "Movie or TV series name",
    "details-button": "Details",
    "sort-label": "Sort by",
    "pop-desc": "Descending popularity",
    "pop-asc": "Ascending popularity",
    "vote-desc": "Descending votes",
    "vote-asc": "Ascending votes"
  },
  "tr": {
    "select-language": "Dil",
    "more": "daha fazla",
    "search-label": "Film veya dizi adı",
    "details-button": "Detaylar",
    "sort-label": "Sıralama",
    "pop-desc": "Azalan popülerlik",
    "pop-asc": "Artan popülerlik",
    "vote-desc": "Azalan oylar",
    "vote-asc": "Artan oylar"
  }
}
</i18n>