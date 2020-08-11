<template>
  <div :class="styles.className1">
    <comp>
      <template v-slot:bar="{data}">
        <span>Hello</span>
        <span>{{data.m1}}</span>
      </template>
      <div>
        <template>
          world
        </template>
      </div>
    </comp>
    <input v-model="name" />
    <comp1 :name="name" />
    <el-input />
  </div>
  <!-- <comp1 /> -->
  <!-- <div
    style="display: flex; flex-direction: column; height: 100%;"
    class="name"
    :class="styles.className1"
  >
    {{isA}}
    <div
      style="flex: none; display: flex; align-items: center;"
      :class="styles.className1"
    > -->
  <!-- <div style="flex: none">姓名:</div> -->
  <!-- <el-input
        v-model="name"
        style="flex: none"
      /> -->
  <!-- <el-button @click="handleClick">
        确定
      </el-button> -->
  <!-- </div> -->
  <!-- <div class="app">
      <div ref="msgDiv">{{msg}}</div>
      <div v-if="msg1">Message got outside $nextTick: {{msg1}}</div>
      <div v-if="msg2">Message got inside $nextTick: {{msg2}}</div>
      <div v-if="msg3">Message got outside $nextTick: {{msg3}}</div>
      <button @click="changeMsg">
        Change the Message
      </button>
    </div> -->
  <!-- <el-select
      v-model="value"
      placeholder="请选择"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <tree-select
      v-model="value1"
      :options="options1"
      :always-open="alwaysOpen"
    />
    <div
      class="a"
      style="width: 500px; height: 500px;"
    ></div>
    <div
      class="b-color"
      style="width: 500px; height: 500px;"
    ></div> -->
  <!-- <input v-model="name" /> -->
  <!-- <input v-model="msg1" />
    <div v-if="isA">哈哈哈哈</div> -->
  <!-- <comp :name="name">
      <template v-slot:bar>
        <span>Hello</span>
      </template>
      <div>world</div>
    </comp>
    <comp1 /> -->
  <!-- </div> -->
</template>

<script>
import styles from "../assets/css/index.module.css";
import comp from "./comp";

export default {
  props: ["haha"],
  components: {
    comp,
    comp1: {
      name: "comp1",
      props: {
        name: String
      },
      data() {
        return {
          msg: "World"
        };
      },
      render(h) {
        return <div domPropsInnerHTML="he"></div>;
      }
    }
  },
  data() {
    return {
      msg: "Hello Vue.",
      msg1: "",
      msg2: "",
      msg3: "",
      name: null,
      styles,
      list: [1, 2, 3],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: null,
      // define the default value
      value1: null,
      // define options
      options1: [
        {
          id: "a",
          label: "a",
          children: [
            {
              id: "aa",
              label: "aa"
            },
            {
              id: "ab",
              label: "ab"
            }
          ]
        },
        {
          id: "b",
          label: "b"
        },
        {
          id: "c",
          label: "c"
        }
      ]
    };
  },
  computed: {
    isA() {
      return this.name === "2" || this.msg1 != null;
    }
  },
  mounted() {
    console.log(styles);
    console.log(this.$style);
    var element = document.getElementsByClassName("a");
    console.log(element);
  },
  methods: {
    async handleClick() {
      // const { default: _ } = await import(
      //   /* webpackChunkName: "lodash" */ /* webpackPrefetch: true */ "lodash"
      // );
      // console.log(_.map);
    },
    changeMsg() {
      this.msg = "Hello world.";
      this.msg1 = this.$refs.msgDiv.innerHTML;
      this.$nextTick(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML;
      });
      this.msg3 = this.$refs.msgDiv.innerHTML;
    }
  }
};
</script>

<style lang="scss" module>
.title-wrap {
  font-size: 20px;
  color: red;
}
.vue-treeselect {
  /deep/.vue-treeselect__label {
    color: #606266 !important;
  }
}
</style>
