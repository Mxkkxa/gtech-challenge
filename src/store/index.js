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
      fillCount: 0,
      results: []
    },
    loadedMovieAndTVShows: [],
    currentPage: 1,
    sortType: '',
    searchTerm: '',
    selectedMovieOrTVId: '',

  },
  getters: {
    getFetchMoviesUrl: state => `${state.moviesUrl}${state.apiKey}&page=${state.currentPage}`,
    getFetchTVShowsUrl: state => `${state.TVShowsUrl}${state.apiKey}&page=${state.currentPage}`
  },
  mutations: {
    SET_POPULAR_MOVIES(state, payload) {
      state.popularMovies = payload
    },
    SET_POPULAR_TV_SHOWS(state, payload) {
      state.popularTVShows = payload
    },
    SET_CURRENT_PAGE(state, payload) {
      state.currentPage = payload
    },
    INCREASE_CURRENT_PAGE(state) {
      state.currentPage = state.currentPage + 1
    },
    SET_SORT_TYPE(state, payload) {
      state.sortType = payload
    },
    SET_SEARCH_TERM(state, payload) {
      state.searchTerm = payload
    },
    SET_SELECTED_MOVIE_OR_TV_ID(state, payload) {
      state.selectedMovieOrTVId = payload
    },
    SET_MOVIE_AND_TV_BUCKET(state, payload) {
      state.movieAndTVBucket = payload
    },
    ADD_LOADED_MOVIE_AND_TV_SHOWS(state, payload) {
      state.loadedMovieAndTVShows.push(payload)
    },
  },
  actions: {
    _fetchMovies({ getters }) {
      return axios.get(getters.getFetchMoviesUrl)
        .then(response => {
          return response.data
        })
    },
    _fetchTVShows({ getters }) {
      return axios.get(getters.getFetchTVShowsUrl)
        .then(response => {
          return response.data
        })
    },
    _fetchAndAssignAllShows({ dispatch, commit }) {
      return Promise.all([dispatch('_fetchMovies'), dispatch('_fetchTVShows')]).then((shows) => {
        commit('SET_POPULAR_MOVIES', shows[0].data)
        commit('SET_POPULAR_TV_SHOWS', shows[1].data)
      })
    },
    _prepareShowsBucket({ state }) {
      const combinedShows = [].concat(state.popularMovies.results, state.popularTVShows.results)
      state.movieAndTVBucket.fillCount = 1
      state.movieAndTVBucket.results = combinedShows
    },
    // todo mixture of 2 arrays
    async fillMoviesAndTVBucket({ dispatch, state, commit }) {
      await dispatch('_fetchAndAssignAllShows')
      dispatch('_prepareShowsBucket')
      commit('INCREASE_CURRENT_PAGE')
      if (state.movieAndTVBucket.fillCount <= 0) {
        return state.movieAndTVBucket.results.slice(0, 20)
      } else {
        state.movieAndTVBucket.fillCount--
        return state.movieAndTVBucket.results.slice(20, 41)
      }
    },
  },
  modules: {
  }
})
