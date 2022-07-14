<template>
  <li class="list">
    <button class="list__activator" @click="toggleContent">
      <span>
        <template  v-if="isCollapsed">📂</template>
        <template v-else>📁</template>
        <span>{{ file.fileName }}</span>
      </span>
      <span class="list__activator--total">{{ file.vulnerabilitiesCount }} in total 🧮</span>
    </button>
    <transition name="fade">
      <ul v-show="isCollapsed" class="list__vulnerability">
        <li
          v-for="vulnerability in file.vulnerabilities"
          :key="vulnerability.cveId"
          class="list__vulnerability__item"
        >
          📝 {{ vulnerability.cveId }}:
          <span
            v-for="(dependency, index) in vulnerability.dependencies"
            :key="index"
            class="list__vulnerability__item--dependency"
          >
            {{ dependency.dependencyName }} ℹ️v.{{ dependency.version }}
          </span>
        </li>
      </ul>
    </transition>
  </li>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    file: {
      type: Object,
    },
  },
  data() {
    return {
      isCollapsed: true,
    };
  },
  methods: {
    toggleContent() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style lang="scss">
.list {
  text-align: left;
  list-style: none;
  font-size: 18px;
  &__activator {
    font-size: 20px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 7px 12px;
    &--total {
      font-size: 17px;
      color: rgb(3, 75, 192)
    }
  }
  &__vulnerability {
    list-style: none;
    padding-left: 20px;
    &__item {
      padding: 6px;
      &--dependency {
        display: inline-block;
        border-radius: 12px;
        background: #2f3e71;
        color: #eee;
        padding: 4px;
        margin: 0 4px;
        font-size: 14px;
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
