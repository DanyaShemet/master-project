import firebase from "firebase/app";

export default {
    actions: {
        async createRecord({commit, dispatch}, record) {
            try {
                const uid = await dispatch('getUid')
                return await firebase.database().ref(`/users/${uid}/records`).push(record)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async deleteRecords({commit, dispatch}, catId) {
            const uid = await dispatch('getUid')
            await firebase.database().ref(`users/${uid}/records/`).child(catId).remove()
            const emotions = {
                outcomeCount: 0,
                incomeCount: 0,
                emotions: 0
            }
            const records = (await firebase.database().ref(`users/${uid}/records`).once('value')).val() || {};
            Object.keys(records).map(key => ({...records[key]})).forEach(el => {
                if (el.type === 'income'){
                    emotions.incomeCount += el.countEmotions
                    emotions.emotions = emotions.incomeCount - emotions.outcomeCount
                }else{
                    emotions.outcomeCount += el.countEmotions
                    emotions.emotions = emotions.incomeCount - emotions.outcomeCount
                }
            })
            await dispatch ('updateInfo', emotions)
        },
        async fetchRecords({commit, dispatch}) {
            try {
                const uid = await dispatch('getUid')
                const records = (await firebase.database().ref(`users/${uid}/records`).once('value')).val() || {};
                return Object.keys(records).map(key => ({...records[key], id: key}))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    }
}