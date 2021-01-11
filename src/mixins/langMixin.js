import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters({
            lang: "lang"
        })
    },
    beforeMount() {
        this.setLang()
    },
    watch: {
        lang() {
            this.setLang()
        }
    },
    methods: {
        setLang() {
            this.lang === "en"
                ? (this.$i18n.locale = "en")
                : (this.$i18n.locale = "tr");
        }
    }
}