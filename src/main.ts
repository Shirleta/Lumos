import { createApp } from 'vue';
import './style.css'; // 引入样式文件
import App from './App.vue'; // 引入主组件
import router from './router'; // 引入路由配置

// 创建 Vue 应用实例并挂载路由
const app = createApp(App);
app.use(router); // 使用路由
app.mount('#app'); // 挂载到页面上的 id 为 app 的元素
