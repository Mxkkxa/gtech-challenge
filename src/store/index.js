import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: '6708a977e4d39945009e7bd4e0cb9acd',
    moviesUrl: 'https://api.themoviedb.org/3/movie/popular?api_key=',
    TVShowsUrl: 'https://api.themoviedb.org/3/tv/popular?api_key=',
    lang: 'en',
    popularMovies: {},
    popularTVShows: {},
    movieAndTVBucket: {
      fillCount: 2,
      results: []
    },
    loadedMovieAndTVShows: [],
    currentPage: '',
    sortType: '',
    searchTerm: '',
    selectedMovieOrTVId: '',

  },
  getters: {
    getFetchMoviesUrl: state => `${state.moviesUrl}${state.apiKey}`,
    getFetchTVShowsUrl: state => `${state.TVShowsUrl}${state.apiKey}`
  },
  mutations: {
    SET_POPULAR_MOVIES({ state }, payload) {
      state.popularMovies = payload
    },
    SET_POPULAR_TV_SHOWS({ state }, payload) {
      state.popularTVShows = payload
    },
    SET_CURRENT_PAGE({ state }, payload) {
      state.currentPage = payload
    },
    SET_SORT_TYPE({ state }, payload) {
      state.sortType = payload
    },
    SET_SEARCH_TERM({ state }, payload) {
      state.searchTerm = payload
    },
    SET_SELECTED_MOVIE_OR_TV_ID({ state }, payload) {
      state.selectedMovieOrTVId = payload
    },
    SET_MOVIE_AND_TV_BUCKET({ state }, payload) {
      state.movieAndTVBucket = payload
    },
    ADD_LOADED_MOVIE_AND_TV_SHOWS({ state }, payload) {
      state.loadedMovieAndTVShows.push(payload)
    },
  },
  actions: {
    _fetchMovies({ getters }) {
      axios.get(getters.getFetchMoviesUrl)
        .then(response => {
          console.log(response)
        })
    },
    _fetchTVShows({ getters }) {
      axios.get(getters.getFetchTVShowsUrl)
        .then(response => {
          console.log(response)
        })
    }
  },
  modules: {
  }
})
