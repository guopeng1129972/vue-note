import router from "../../router";
import request from "../../utils/request";

const state = {
  step: {
    payAccount: "123456",
    receiverAccount: {
      type: "bank",
      number: "12345645",
    },
  },
};

const actions = {
  async submitStepForm({ commit }, { payload }) {
    await request({
      url: "/api/form",
      method: "POST",
      data: payload,
    });
    commit("saveStepFormData", { payload });
    router.push("/form/step-form/result");
  },
};

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = { ...state.step, ...payload };
  },
};

export default {
  // namespaced 全部为小写
  namespaced: true,
  state,
  actions,
  mutations,
};
