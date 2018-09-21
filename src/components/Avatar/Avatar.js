export default {
  name: 'Avadar',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // shortName: ''
    }
  },
  computed: {
    shortName() {
      return this.name.trim().substring(0, 1).toUpperCase();
    }
  },
  mounted() { // 这种方式不好, 放在 computed中好些,数据处理
    // this.shortName = this.name.trim().substring(0, 1).toUpperCase();

  }
}