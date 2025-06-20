<template>
  <div class="user-row">
    <div class="col name-col">
      <span
        v-if="user.level > 0"
        class="level-indent"
        :style="{
          marginLeft: `${(user.level - 1) * 16}px`,
        }"
      ></span>
      <p class="name">{{ user.name }}</p>
    </div>

    <div class="col phone-col">
      {{ user.phone }}
    </div>

    <div class="col action-col">
      <button
        @click="$emit('delete', user.id)"
        class="delete-btn"
        :disabled="hasChildren"
        :title="hasChildren ? 'Нельзя удалить пользователя' : 'Удалить пользователя'"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserRow',
  props: {
    user: Object,
  },
  computed: {
    hasChildren() {
      return this.user.children && this.user.children.length > 0;
    },
  },
};
</script>

<style scoped>
.user-row {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.user-row:hover {
  background-color: #f5f5f5;
}

.col {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
}

.name-col {
  flex: 2;
  display: flex;
  align-items: center;
}

.phone-col {
  flex: 2;
}

.action-col {
  flex: 0 0 60px;
  display: flex;
  justify-content: flex-end;
}

.level-indent {
  width: 8px;
  height: 24px;
  border-left: 2px solid #ccc;
  margin-right: 8px;
  flex-shrink: 0;
}

.name {
  margin: 0;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 4px 6px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background-color: #b02a37;
}

.delete-btn:disabled {
  background-color: #e0aeb4;
  cursor: not-allowed;
}
</style>
