export default {
  install(app) {
    app.directive('focus', {
      mounted(el, binding, vnode, prevVnode) {
        el.focus();
        // el.remove();
      }
    });
  },
};
