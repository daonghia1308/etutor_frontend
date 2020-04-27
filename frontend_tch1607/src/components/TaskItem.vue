<template id="task-item">
  <li class="tasks__item">
    <button :class="className" @click.self="$emit('complete')" style="width: 90%">{{ task.title }}</button>
    <button class="btn btn-danger" @click="$emit('remove')">
      <i class="el-icon-circle-close"></i>
    </button>
  </li>
</template>

<script>
export default {
  name: "task-item",
  props: ["task"],
  computed: {
    className() {
      let classes = ["tasks__item__toggle"];
      if (this.task.completed) {
        classes.push("tasks__item__toggle--completed");
      }
      return classes.join(" ");
    }
  }
};
</script>

<style scoped>
.tasks__item {
  margin-bottom: 0.5em;
  position: relative;
}

.tasks__item__toggle {
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 0.85em 2.25em 0.85em 1em;
  background-color: rgba(black, 0.05);
  border: 1px solid rgba(black, 0.1);
}

.tasks__item__toggle:hover {
  background-color: rgba(black, 0.1);
  border-color: rgba(black, 0.15);
}

.tasks__item__toggle--completed {
  text-decoration: line-through;
  background-color: rgba(green, 0.15);
  border-color: rgba(green, 0.2);
}

.tasks__item__toggle--completed:hover {
  background-color: rgba(green, 0.25);
  border-color: rgba(green, 0.3);
}

.tasks__item__remove {
  position: absolute;
  height: 100%;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.tasks__item__remove i {
  vertical-align: middle;
}

</style>