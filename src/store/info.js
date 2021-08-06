import firebase from "firebase/app";

export default {
    state: {
        info: {}
    },
    mutations:{
      setInfo(state, info){
          state.info = info
      }
    },
    actions: {
        async fetchInfo({commit, dispatch}){
            try{
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
                commit('setInfo', info)
            }catch (e) {
                commit('setError',e)
                throw e
            }
        },
        async updateInfo({commit, dispatch, getters}, toUpdate){
            try{
                const uid = await dispatch('getUid')
                const updateDate = {...getters.info, ...toUpdate}
                await firebase.database().ref(`/users/${uid}/info`).update(updateDate)
                commit('setInfo', updateDate)
            }catch (e) {
                commit('setError',e)
                throw e
            }
        }
    },

    getters: {
        info: s => s.info
    },
}