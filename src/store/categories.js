import firebase from "firebase/app";
export default {
    actions: {
        async createCategory({commit, dispatch}, category){
            try {
                const uid = await dispatch('getUid')
                return await firebase.database().ref(`users/${uid}/categories`).push(category)
            }
            catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async deleteCategory({commit, dispatch}, catId){
            const uid = await dispatch('getUid')
            await firebase.database().ref(`users/${uid}/categories/`).child(catId).remove()
            const records = (await firebase.database().ref(`users/${uid}/records`).once('value')).val() || {};
            Object.keys(records).map(key => ({...records[key], recordId: key})).forEach(el => {
                if (el.categoryId === catId){
                    dispatch('deleteRecords', el.recordId)
                }
            })

        },

        async updateCategory({commit, dispatch}, {id,title,icon}){
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`users/${uid}/categories`).child(id).update({title, icon})
            }
            catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async fetchCategoryById({commit, dispatch}, id){
            try {
                const uid = await dispatch('getUid')
                const category = (await firebase.database().ref(`users/${uid}/categories`).child(id).once('value')).val() || {};
                return {
                    ...category, id
                }
            }
            catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchCategories({commit, dispatch}){
            try {
                const uid = await dispatch('getUid')
                const categories = (await firebase.database().ref(`users/${uid}/categories`).once('value')).val() || {};
                return Object.keys(categories).map(key => ({...categories[key], id: key}))
            }
            catch (e) {
                commit('setError', e)
                throw e
            }
        },
    }
}