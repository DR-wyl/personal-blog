# vuex持久化插件

>在Vue2中的示例
>
>注意事项:一定要调用mutations才会被插入到Loal storage中
>
>版本记录
>
>​    "vue": "^2.6.14",
>
>​    "vuex": "^3.6.2",
>
>​    "vuex-persistedstate": "^3.2.1"
>
>目前测试
>
>​    "vuex-persistedstate": "^4.1.0"
>
>好像版本可兼容

1.安装

```javascript
npm install --save vuex-persistedstate
```

2.sotre/index.js中

>核心为plugins: [createPersistedState()],

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  // plugins: [createPersistedState()],
  plugins: [createPersistedState({
    // 存储方式：localStorage、sessionStorage、cookies  默认: localStorage
    storage: window.sessionStorage,
    // 存储的 key 的key值
    key: "store",
    reducer(state) {
      // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
      console.log(state);
      return { ...state };
    }
  })],

  state: {
    title: 'Vuex',
    whyDonotShow: 'false!!!!!!!!'
  },
  getters: {
  },
  mutations: {
    SETTITLE(state, value) {
      state.title = value;
    }
  },
  actions: {
  },
  modules: {
    sonmodule1: {
      state: {
        sontitle: 'sonmodule1'
      }
    }
  }
});

export default store;

```
