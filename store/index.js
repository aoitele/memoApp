const STRAGAGE_NAME = 'vuex_data'
const storageData = localStorage.getItem(STRAGAGE_NAME)

export const state = () =>
  storageData
    ? JSON.parse(storageData)
    : {
      memoList: []
    }

export const getters = {
  memoData(state) {
    return index => state.memoList[index]
  }
}

export const plugins = [
  (store) => {
    store.subscribe(() => {
      localStorage.setItem(STRAGAGE_NAME, JSON.stringify(store.state))
    })
  }
]

export const mutations = {
  addMemo(state, memo) {
    state.memoList = [...state.memoList, memo]
  },
  moveMemo(state, { toppo, left, index }) {
    state.memoList = [...state.memoList]
    state.memoList[index] = { toppo, left }
  },
  minusMemo(state, index) {
    state.memoList = [...state.memoList]
    state.memoList.splice(index, 1)
  },
  updateText(state, { index, text }) {
    state.memoList = [...state.memoList]
    state.memoList[index] = {
      ...state.memoList[index],
      text
    }
  }
}
