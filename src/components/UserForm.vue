<template>
  <div class="user-form-wrapper">
    <button class="form-close" @click="$emit('close')" aria-label="Закрыть">×</button>
    <h2 class="form-title">Добавить пользователя</h2>
    <form @submit.prevent="onSubmit" class="user-form">
      <input v-model="name" placeholder="Имя" required />
      <input
        v-model="phone"
        v-mask="'+7 (###) ###-##-##'"
        placeholder="+7 (___) ___-__-__"
        required
      />
      <select v-model="parentId">
        <option :value="null">Без начальника</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['users'],
  data() {
    return {
      name: '',
      phone: '',
      parentId: null,
    };
  },
  methods: {
    onSubmit() {
      const cleanPhone = this.phone.replace(/\D/g, '');

      if (cleanPhone.length < 11) {
        alert('Введите полный номер телефона');
        return;
      }

      const user = {
        id: Date.now().toString(),
        name: this.name,
        phone: this.phone,
        parentId: this.parentId || null,
      };
      this.$emit('save', user);
      this.name = '';
      this.phone = '';
      this.parentId = null;
    },
  },
};
</script>

<style scoped>
.user-form-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 24px 24px 32px;
  background-color: #fff;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto;
}

.form-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  color: #999;
}

.form-close:hover {
  color: #007bff;
}

.form-title {
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  color: #333;
  user-select: none;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-form input,
.user-form select {
  padding: 10px 14px;
  font-size: 14px;
  font-family: inherit;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  appearance: none;
  transition: border-color 0.2s ease;
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

.user-form select {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg width='14' height='14' viewBox='0 0 24 24' fill='gray' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5H7z'/%3E%3C/svg%3E");
  padding-right: 2.5rem;
}

.user-form input:focus,
.user-form select:focus {
  border-color: #007bff;
}

.user-form button {
  padding: 10px 14px;
  font-size: 14px;
  font-family: inherit;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.user-form button:hover {
  background-color: #0056b3;
}

.user-form * {
  -webkit-tap-highlight-color: transparent;
}
</style>
