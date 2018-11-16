const install = function (Vue) {
  const bus = new Vue({
    data() {
      return {
        store: {
          employeeList: [],
          employeeId: '1',
          employeeName: '2',
          // 类型选择
        }
      }
    },
    created() {
    },
    watch: {
    },
    methods: {

    }
  })
  Vue.prototype.$bus = bus
};
export default install