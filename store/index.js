export const state = () => ({
  memoList: [
    {
      toppo: null,
      left: null,
      text: null,
      color: null
    }
  ]
})

export const getters = {
  memoData(state) {
    return index => state.memoList[index]
  }
}

export const plugins = []

export const mutations = {
  setMemoList(state, memoList) {
    state.memoList = memoList
  }
}

export const actions = {
  async getMemoList(store) {
    const memoList = await this.$axios.$get('/data')
    store.commit('setMemoList', memoList)
  },
  async postMemo(store, memoList) {
    await this.$axios.$post('/data', memoList)
    store.commit('setMemoList', memoList)
  },
  async minusMemo(store, index) {
    const memoList = await this.$axios.$post('/delete', { index })
    store.commit('setMemoList', memoList)
  },
  async moveMemo(store, { toppo, left, index, text, background }) {
    const memoList = await this.$axios.$post('/move', {
      toppo,
      left,
      index,
      text,
      background
    })
    store.commit('setMemoList', memoList)
  },
  async updateText(store, { index, text }) {
    const memoList = await this.$axios.$post('/text', { index, text })
    store.commit('setMemoList', memoList)
  },
  async colorChange(store, { index, color }) {
    const memoList = await this.$axios.$post('/color', { index, color })
    store.commit('setMemoList', memoList)
  }
}
