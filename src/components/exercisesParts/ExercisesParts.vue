<template>
  <div>
    <div class="h2">BodyPart List</div>
    <select @change="onBodyPart">
      <option v-for="item in list" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAllBodypartList } from "../../services/exerciseService";

export default {
  setup(props, { emit }) {
    const list = ref([]);

    onMounted(async () => {
      const bodyPartList = await getAllBodypartList();
      list.value = ["all", ...bodyPartList];
    });

    const onBodyPart = (event) => {
      const selectedBodyPart = event.target.value;
      emit("update:bodyPart", selectedBodyPart);
    };

    return {
      list,
      onBodyPart,
    };
  },
};
</script>

<style lang="scss"></style>
