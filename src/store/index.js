import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: '6708a977e4d39945009e7bd4e0cb9acd',
    moviesUrl: 'https://api.themoviedb.org/3/movie/popular?api_key=',
    TVShowsUrl: 'https://api.themoviedb.org/3/tv/popular?api_key=',
    creditsUrl: 'https://api.themoviedb.org/3/',
    castImgUrl: 'https://image.tmdb.org/t/p/w200/',
    posterImgUrl: 'https://image.tmdb.org/t/p/w300/',
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
    selectedMovieOrTVId: 0, //464052, 63174
    selectedShowCredits: {},
    selectedShowDetails: {},
    isFetching: false,
  },
  getters: {
    getFetchMoviesUrl: state => `${state.moviesUrl}${state.apiKey}&page=${state.currentPage}`,
    getFetchTVShowsUrl: state => `${state.TVShowsUrl}${state.apiKey}&page=${state.currentPage}`,
    getFetchShowCreditsUrl: (state, getters) => {
      const show = getters.getSelectedShowById
      if (show !== undefined && Object.prototype.hasOwnProperty.call(show, "adult")) {
        return `${state.creditsUrl}movie/${state.selectedMovieOrTVId}/credits?api_key=${state.apiKey}`
      } else {
        return `${state.creditsUrl}tv/${state.selectedMovieOrTVId}/credits?api_key=${state.apiKey}`
      }
    },
    getFetchShowDetailsUrl: (state, getters) => {
      const show = getters.getSelectedShowById
      if (show !== undefined && Object.prototype.hasOwnProperty.call(show, "adult")) {
        return `${state.creditsUrl}movie/${state.selectedMovieOrTVId}?api_key=${state.apiKey}`
      } else {
        return `${state.creditsUrl}tv/${state.selectedMovieOrTVId}?api_key=${state.apiKey}`
      }
    },
    getSelectedShowById: state => state.loadedMovieAndTVShows.filter(show => show.id === state.selectedMovieOrTVId)[0],
    getFilteredShows: state => {
      if (state.searchTerm !== '') {
        const results = state.loadedMovieAndTVShows.filter(show => {
          if (show.title?.includes(state.searchTerm)) {
            return show;
            // for movies
          } else if (show.original_title?.toLowerCase().includes(state.searchTerm.toLowerCase())
            || show.title?.toLowerCase().includes(state.searchTerm.toLowerCase())) {
            return show;
            // for tv series
          } else if (show.original_name?.toLowerCase().includes(state.searchTerm.toLowerCase())
            || show.name?.toLowerCase().includes(state.searchTerm.toLowerCase())) {
            return show;
          }
        });
        // console.log(results)
        return results
      } else {
        switch (state.sortType) {
          case 'popularity-asc':
            return state.loadedMovieAndTVShows.sort((a, b) => a.popularity - b.popularity)
          case 'popularity-desc':
            return state.loadedMovieAndTVShows.sort((a, b) => b.popularity - a.popularity)
          case 'vote-asc':
            return state.loadedMovieAndTVShows.sort((a, b) => a.vote_average - b.vote_average)
          case 'vote-desc':
            return state.loadedMovieAndTVShows.sort((a, b) => b.vote_average - a.vote_average)
          default:
            // popularity-desc
            return state.loadedMovieAndTVShows.sort((a, b) => b.popularity - a.popularity)
        }
      }
    },
    lang: state => state.lang,
    getSelectedShowDetails: state => state.selectedShowDetails,
    getSelectedShowCredits: state => state.selectedShowCredits
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
      state.loadedMovieAndTVShows = [].concat(state.loadedMovieAndTVShows, payload)
    },
    SET_SELECTED_SHOW_CREDITS(state, payload) {
      state.selectedShowCredits = payload
    },
    SET_SELECTED_SHOW_DETAILS(state, payload) {
      state.selectedShowDetails = payload
    },
    SET_LANGUAGE(state, payload) {
      state.lang = payload
    },
    SET_IS_FETCHING(state, payload) {
      state.isFetching = payload
    }
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
        commit('SET_POPULAR_MOVIES', shows[0])
        commit('SET_POPULAR_TV_SHOWS', shows[1])
      })
    },
    _prepareShowsBucket({ state }) {
      const combinedShows = [].concat(state.popularMovies.results, state.popularTVShows.results)
      state.movieAndTVBucket.fillCount = 1
      state.movieAndTVBucket.results = combinedShows
    },
    // todo mixture of 2 arrays
    async _fillMoviesAndTVBucket({ dispatch, state, commit }) {
      if (state.movieAndTVBucket.fillCount <= 0) {
        await dispatch('_fetchAndAssignAllShows')
        dispatch('_prepareShowsBucket')
        commit('INCREASE_CURRENT_PAGE')
        // return new Promise((resolve) => {
        //   resolve(state.movieAndTVBucket.results.slice(0, 20))
        // })
        return state.movieAndTVBucket.results.slice(0, 20)
      } else {
        state.movieAndTVBucket.fillCount--
        // return new Promise((resolve) => {
        //   resolve(state.movieAndTVBucket.results.slice(20, 41))
        // })
        return state.movieAndTVBucket.results.slice(20, 41)
      }
    },
    async loadShowsData({ commit, dispatch, state }) {
      if (state.isFetching === true) return;
      commit('SET_IS_FETCHING', true)
      const showsData = await dispatch('_fillMoviesAndTVBucket')
      commit('ADD_LOADED_MOVIE_AND_TV_SHOWS', showsData)
      commit('SET_IS_FETCHING', false)
    },
    async _getSelectedShowCast({ commit, getters }) {
      axios.get(getters.getFetchShowCreditsUrl)
        .then(response => {
          commit('SET_SELECTED_SHOW_CREDITS', response.data)
        })
    },
    async _getSelectedShowDetail({ commit, getters }) {
      axios.get(getters.getFetchShowDetailsUrl)
        .then(response => {
          commit('SET_SELECTED_SHOW_DETAILS', response.data)
        })
    },
    async loadShowCreditsAndDetails({ dispatch }) {
      return await Promise.all([dispatch('_getSelectedShowCast'), dispatch('_getSelectedShowDetail')])
    }
  },
  modules: {
  }
})
