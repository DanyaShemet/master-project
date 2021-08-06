import firebase from "firebase/app";

export default {
    actions: {
        // Вход по почте
        async login({dispatch, commit}, {email, password}){
            try{
                await firebase.auth().signInWithEmailAndPassword(email, password) // Запит на вхід по пошті та паролю
                const uid = await dispatch('getUid'); // Отримання id
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val(); // Отримання інформації про користувача
                await firebase.database().ref(`/users/${uid}/info`).set({ // Запис інформації або 0, якщо перший вхід
                    outcomeCount: info.outcomeCount || 0,
                    incomeCount: info.incomeCount || 0,
                    emotions: info.incomeCount - info.outcomeCount || 0,
                    name: info.name,
                    sort: info.sort
                })
            }catch (e){
                commit ('setError', e)
                throw e
            }
        },

        // Выход
        async logout(){
            await firebase.auth().signOut()
        },

        // Регистрация по почте
        async registerUser({dispatch, commit}, {email, password, name}){
            try{
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid');
                await firebase.database().ref(`/users/${uid}/info`).set({
                    outcomeCount: 0,
                    incomeCount: 0,
                    emotions: 0,
                    name,
                    sort: 'all'
                })
            }catch (e){
                commit ('setError', e)
                throw e
            }
        },

        // Регистрация или вход через гугл
        async loginGoogleUser({dispatch, commit}, {email, password, name}){
            try{
                const info = (await firebase.database().ref(`/users/${password}/info`).once('value')).val();
                await firebase.database().ref(`/users/${password}/info`).set({ // Запис інформації або 0, якщо перший вхід
                    outcomeCount: info.outcomeCount || 0,
                    incomeCount: info.incomeCount || 0,
                    emotions: info.incomeCount - info.outcomeCount || 0,
                    name: name,
                    sort: info.sort | 'all'
                })
            }catch (e) {
                commit('setError', e)
                throw e
            }
        },

        // Получение айди юзера
        getUid(){
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        }
    }
}