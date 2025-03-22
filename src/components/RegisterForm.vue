<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="text" id="phone" v-model="phone" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <div class="form-group">
        <label for="inviteCode">Invite Code</label>
        <input type="text" id="inviteCode" v-model="inviteCode" required />
      </div>
      <button type="submit">Register</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const inviteCode = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleRegister = async () => {
  // 校验邀请码
  if (inviteCode.value !== '12345') {
    errorMessage.value = '邀请码错误';
    return;
  }

  // 校验两次输入的密码是否一致
  if (password.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致';
    return;
  }

  try {
    const response = await axios.post('http://localhost:8080/users/register', {
      username: username.value,
      phone: phone.value,
      password: password.value,
    });

    if (response.data.success) {
      console.log('注册成功:', response.data);
      router.push('/login');
    } else {
      errorMessage.value = response.data.message || '注册失败，请重试';
    }
  } catch (error) {
    console.error('注册失败:', error);
    errorMessage.value = '注册失败，请检查网络或稍后重试';
  }
};
</script>

<style scoped>
.register-form {
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>