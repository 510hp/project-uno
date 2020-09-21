import firebase from 'firebase/app'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    async creatRecord ({ commit, dispatch }, record) {
      try {
        const uid = await dispatch('getUid');
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (error) {
        commit('setErrore', error);
        throw error
      }
    }
  },
  getters: {
  }
}
