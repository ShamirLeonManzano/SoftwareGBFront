import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        token:"",
        rol:"",
        idUser:"",
        idGb:"",
        idSr:"",
        idR:"",
        idInf:"",
    },

    mutations:{
        setToken(state, value){
            state.token = value;
        },
        setRol(state, value){
            state.rol = value;
        },

        setIdUser(state,value){
            state.idUser = value;
        },

        setIdGb(state,value){
            state.idGb = value;
        },

        setIdSr(state,value){
            state.idSr = value;
        },

        setIdR(state,value){
            state.idR = value;
        },
        setIdInf(state,value){
            state.idInf = value;
        }
    },

    actions:{
        setToken(context, value){
            context.commit("setToken",value);
        },
        setRol(context, value){
            context.commit("setRol",value);
        },
        setIdUser(context,value){
            context.commit("setIdUser",value);
        },
        setIdGb(context,value){
            context.commit("setIdGb",value);
        },
        setIdSr(context,value){
            context.commit("setIdSr",value);
        },
        setIdR(context,value){
            context.commit("setIdR",value);
        },
        setIdInf(context,value){
            context.commit("setIdInf",value);
        }
    }
})