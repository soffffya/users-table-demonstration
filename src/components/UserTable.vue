<script>
import UserRow from './UserRow';

export default {
  name: 'UserTable',
  components: { UserRow },
  props: {
    users: { type: Array, required: true },
    sortField: String,
    sortDirection: String,
  },
  methods: {
    emitSort(field) {
      this.$emit('sort', field);
    },
    handleDelete(userId) {
      this.$emit('delete', userId);
    },
    flatten(users, level = 0) {
      return users.reduce((acc, user) => {
        const copy = { ...user, level };
        acc.push(copy);
        if (user.children && user.children.length) {
          acc.push(...this.flatten(user.children, level + 1));
        }
        return acc;
      }, []);
    },
  },
  computed: {
    flatUsers() {
      return this.flatten(this.users);
    },
  },
};
</script>

<template>
  <div class="user-table">
    <div class="header-row">
      <div class="col name-col" @click="emitSort('name')">
        Имя
        <span v-if="sortField === 'name'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
      </div>
      <div class="col phone-col" @click="emitSort('phone')">
        Телефон
        <span v-if="sortField === 'phone'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
      </div>
      <div class="col action-col"></div>
    </div>

    <user-row
      v-for="user in flatUsers"
      :key="user.id"
      :user="user"
      @delete="handleDelete"
    />
  </div>
</template>

<style scoped>
.user-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  font-size: 14px;
  min-width: 350px;
  overflow: scroll;
}

.header-row {
  display: flex;
  background-color: #f9f9f9;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}

.header-row .col {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.header-row:hover {
  background-color: #f0f0f0;
}

.name-col {
  flex: 2;
}

.phone-col {
  flex: 2;
}

.action-col {
  flex: 0 0 70px;
}
</style>
