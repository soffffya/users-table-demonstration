import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import App from './App';

Vue.config.productionTip = false;
Vue.use(VueTheMask);

const app = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});

export default app;
