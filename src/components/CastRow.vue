<template>
  <div class="cast-row">
    <v-row align="center">
      <v-img
        max-width="45"
        :src="$store.state.castImgUrl + person.profile_path"
      ></v-img>
      <template v-if="$store.state.lang === 'en'">
        {{ person.name }} {{ $t("as") }} {{ person.character }}
      </template>
      <template v-if="$store.state.lang === 'tr'">
        {{ person.name }}, {{ person.character }} {{ $t("as") }}.
      </template>
    </v-row>
  </div>
</template>

<script>
import langMixin from "../mixins/langMixin";
export default {
  name: "CastRow",
  props: ["person"],
  mixins: [langMixin]
};
</script>

<style lang="scss">
.cast-row {
  margin-bottom: 30px;
  margin-top: 30px;
}
</style>

<i18n>
{
  "en": {
    "as": "as"
  },
  "tr": {
    "as": "olarak"
  }
}
</i18n>