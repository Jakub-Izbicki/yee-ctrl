import {v4 as uuid} from "uuid"

export default {
  namespaced: true,
  state: {
    toasts: []
  },
  mutations: {
    CREATE_TOAST(state, newToast) {
      state.toasts.push(newToast);
    },
    REMOVE_TOAST(state, toastId) {
      state.toasts = state.toasts.filter(toast => {
        return toast.id !== toastId;
      })
    }
  },
  actions: {
    createToast(context, newToast) {
      context.commit('CREATE_TOAST', {
        id: uuid(),
        ...newToast,
      });
    },
    removeToast(context, toastId) {
      context.commit('REMOVE_TOAST', toastId);
    }
  },
  getters: {
    getToasts(state) {
      return state.toasts;
    }
  }
}


