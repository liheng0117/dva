import { getList, addList, delList, updateList } from '@/services/home';

export default {
  namespace: 'home',
  state: {
    listData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *getDataList({ payload }, { call, put }) {
      const data = yield call(getList);
      data.users.forEach((v) => {
        v.key = v.id;
      });
      yield put({
        type: "getList",
        payload: data.users,
      });
    },
    *getAddList(actions, { call, put }) {
      const data = yield call(addList, actions.payload);
      if (data.status === "200") {
        yield put({
          type: "getDataList",
        });
      }
    },
    *getDelList(actions, { call, put }) {
      const data = yield call(delList, actions.payload);
      if (data.status === "200") {
        yield put({
          type: "getDataList",
        });
      }
    },
    *getUpdataList(actions, { call, put }) {
      const data = yield call(updateList, actions.payload);
      if (data.status === "200") {
        yield put({
          type: "getDataList",
        });
      }
    },
  },
  reducers: {
    getList(state, action) {
      return { ...state, listData: action.payload };
    },
  },
};
