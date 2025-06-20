<script>
import UserTable from '@/components/UserTable';
import UserForm from '@/components/UserForm';
import Modal from '@/components/Modal';
import { loadUsers, saveUsers } from './utils/localStorage';

export default {
  components: { UserTable, UserForm, Modal },
  data() {
    return {
      users: [],
      showForm: false,
      sortField: null,
      sortDirection: 'asc',
    };
  },
  computed: {
    sortedTree() {
      const tree = this.buildTree(this.users);
      if (this.sortField) {
        return this.sortRecursive(tree);
      }
      return tree;
    },
  },
  created() {
    this.users = loadUsers();
  },
  methods: {
    deleteUser(id) {
      const removeUser = list =>
        list
          .filter(user => user.id !== id)
          .map(user => ({
            ...user,
            children: user.children ? removeUser(user.children) : [],
          }));
      this.users = removeUser(this.users);
      saveUsers(this.users);
    },
    addUser(user) {
      this.users.push(user);
      saveUsers(this.users);
      this.showForm = false;
    },
    toggleSort(field) {
      if (this.sortField === field) {
        if (this.sortDirection === 'desc') {
          this.sortDirection = 'asc';
        } else {
          this.sortDirection = 'desc';
        }
      } else {
        this.sortField = field;
        this.sortDirection = 'desc';
      }
    },
    buildTree(users) {
      const map = {};
      const roots = [];

      users.forEach((u) => {
        map[u.id] = { ...u, children: [], level: 0 };
      });

      users.forEach((u) => {
        const node = map[u.id];
        if (u.parentId !== null && map[u.parentId]) {
          node.level = map[u.parentId].level + 1;
          map[u.parentId].children.push(node);
        } else {
          roots.push(node);
        }
      });

      return roots;
    },
    sortRecursive(nodes) {
      return [...nodes]
        .sort((a, b) => {
          const aVal = a[this.sortField] || '';
          const bVal = b[this.sortField] || '';
          return this.sortDirection === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        })
        .map(node => ({
          ...node,
          children: this.sortRecursive(node.children),
        }));
    },
  },
};
</script>

<template>
  <div class="app">
    <h1>Пользователи</h1>
    <button @click="showForm = true" class="add-user-btn">Добавить пользователя</button>
    <UserTable
      :users="sortedTree"
      :sort-field="sortField"
      :sort-direction="sortDirection"
      @sort="toggleSort"
      @delete="deleteUser"
    />
    <Modal v-if="showForm" @close="showForm = false">
      <UserForm :users="users" @save="addUser" />
    </Modal>
  </div>
</template>

<style scoped>
.app {
  max-width: 600px;
  margin: auto;
  font-family: sans-serif;
}
button {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  font-size: 14px;
}
.add-user-btn {
  padding: 10px 14px;
  font-size: 14px;
  font-family: inherit;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.add-user-btn:hover {
  background-color: #0056b3;
}

.add-user-btn:active {
  transform: scale(0.98);
}
</style>
