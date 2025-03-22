<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <button @click="goToRegister" class="register-button">Register</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:8080/users/login', {
      username: username.value,
      password: password.value,
    });

    if (response.data.success) {
      console.log('登录成功:', response.data);
      window.location.href = 'https://www.bilibili.com';
    } else {
      errorMessage.value = response.data.message || '登录失败，请重试';
    }
  } catch (error) {
    console.error('登录失败:', error);
    errorMessage.value = '登录失败，请检查网络或稍后重试';
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
.login-form {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #369f6e;
}

.register-button {
  margin-top: 10px;
  background-color: #007bff;
}

.register-button:hover {
  background-color: #0056b3;
}
</style>
