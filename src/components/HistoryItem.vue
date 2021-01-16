<template>
  <div
    class="history-record-item"
    :class="{ 'history-record-item-current': active }"
  >
    <span class="history-record-item-index">{{ item[0] }}</span>
    <div class="history-record-item-img">
      <img :src="item[1].data" width="30" height="30" />
    </div>
    <span class="history-record-item-text">{{ item[1].tools.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'HistoryItem',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style scoped>
.history-record-item {
  display: flex;
  color: #fff;
  align-items: center;
  border-bottom: 1px solid #525252;
}
.history-record-item-img {
  width: 30px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(0, 0, 0);
  margin-right: 20px;
}
.history-record-item-index {
  width: 30px;
  height: 30px;
  color: rgb(141, 141, 141);
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.history-record-item-text {
  color: #fff;
}
.history-record-item-current {
  background: #000;
}
</style>
