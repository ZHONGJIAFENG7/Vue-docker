<template>
  <div>
    <slot>
      <!-- <comp1>
        <div>222</div>
      </comp1> -->
    </slot>
    <slot
      name="bar"
      :data="msg"
    ></slot>
  </div>
</template>

<script>
import comp1 from "./comp1";
export default {
  components: { comp1 },
  data() {
    return {
      msg: {
        m1: 22
      }
    };
  }
};
</script>