<template>
  <div class="home">
      <div class="upload" @dragover.prevent="dragover" @dragleave="dragleave" @drop.prevent="drop">
        <label for="assetsFieldHandle" class="block cursor-pointer">
          <input
            class="upload__input"
            type="file"
            multiple
            name="fields[assetsFieldHandle][]"
            id="assetsFieldHandle"
            @change="onChange"
            ref="file"
          />
          <div class="upload__text">
            Click👆 to upload your files 🗂<br>
            or just Drag'n'Drop them here)
          </div>
        </label>
        <ul class="upload__list" v-if="this.fileList.length">
          <li
            v-for="(file, index) in fileList"
            :key="index"
          >
            {{ file.name }}
          </li>
        </ul>
      </div>

    <button
      :class="['home__button', {disabled: isScanDisabled || errors || fileList.length === 0}]"
      @click="scanFiles"
    >
      🔍 Scan<template v-if="isProcessScanning">ning...</template>
      <IconLoader v-if="isProcessScanning" />
    </button>

    <div class="home__errors" v-if="errors">
      {{errors}}
    </div>

    <div v-if="isScanCompleted" class="home__result result">
      <div>
        <span class="result__title">
          Found vulnerabilities ☢️:
        </span>
        <ul class="result__list">
          <ListItem
            v-for="(file, key) in scanResult"
            :key="key"
            :file="file"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import IconLoader from '@/components/IconLoader.vue';
import ListItem from '@/components/ListItem.vue';

export default {
  name: 'Home',
  components: {
    IconLoader,
    ListItem,
  },
  data() {
    return {
      fileList: [],
      isScanDisabled: false,
      delayMs: 1000,
      intervalId: null,
      isProcessScanning: false,
      isScanCompleted: false,
    };
  },
  computed: {
    ...mapGetters({
      errors: 'files/getErrors',
      isScanReady: 'files/getIsScanReady',
      scanResult: 'files/getScanResult',
    }),
  },
  methods: {
    ...mapActions({
      uploadFiles: 'files/uploadFiles',
      finishUpload: 'files/scanFiles',
      getStatus: 'files/getStatus',
      resetErrors: 'files/resetErrors',
    }),
    async onChange() {
      this.fileList = [...this.$refs.file.files];
      this.isScanDisabled = true;
      await this.uploadFiles(this.fileList).then(() => {
        this.isScanDisabled = false;
      });
    },
    async scanFiles() {
      this.isProcessScanning = true;
      await this.finishUpload();
    },
    async statusResult() {
      await this.getStatus();
    },
    dragover(event) {
      // Add some visual to show the user can drop its files
      if (!event.currentTarget.classList.contains('isActive')) {
        event.currentTarget.classList.add('isActive');
      }
    },
    dragleave(event) {
      event.currentTarget.classList.remove('isActive');
    },
    drop(event) {
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange(); // trigger the onChange event manually
      event.currentTarget.classList.remove('isActive');
    },
    stopTimer() {
      clearInterval(this.intervalId);
    },
  },
  mounted() {
    this.resetErrors();
  },
  watch: {
    isScanReady(newValue) {
      if (!newValue) {
        return;
      }
      // fetch results every second
      this.intervalId = setInterval(async () => {
        try {
          await this.statusResult();
          const { scanResult } = this;
          if (scanResult) {
            const resultValues = Object.values(scanResult);
            const isProgressFinished = resultValues.every((file) => file.progress === 100);
            if (isProgressFinished) {
              this.isScanCompleted = true;
              this.stopTimer(); // stop timer when each file's progress is 100%
            }
          }
        } finally {
          this.isProcessScanning = false;
        }
      }, this.delayMs);
    },
  },
  beforeDestroy() {
    this.stopTimer();
  },
};
</script>
<style lang="scss">
  .home {
    margin-top: 50px;
    &__button {
      width: 100%;
      max-width: 500px;
      background: #00c853;
      border: initial;
      border-radius: 5px;
      padding: 5px 15px;
      font-weight: bold;
      cursor: pointer;
      color: #fff;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 2.5;
      margin: 0 auto;
      span {
        line-height: 2.5;
      }
      &.disabled {
        transition: .4s;
        opacity: .3;
        pointer-events: none;
      }
    }
    &__errors {
      color: tomato
    }
  }
  .upload {
    display: inline-block;
    background: #2f3e71;
    font-size: 19px;
    border-radius: 5px;
    width: 100%;
    max-width: 500px;
    &__input {
      display: none
    }
    &__text {
      padding: 50px 0;
      color: #fff;
      cursor: pointer;
    }
    &__list {
      list-style-type: "\1F4C1";
      color: #fff;
      li {
        text-align: left;
        padding-left: 10px;
      }
    }
    &.isActive {
      opacity: .4;
      transition: .3s;
    }
  }
  .result {
    margin-top: 30px;
    &__title {
      display: block;
      text-align: left;
      font-size: 20px;
      font-weight: bold;
    }
    &__list {
      background-color: #d5d2d2;
      padding: 0;
    }
  }
</style>
