<template>
  <div class="login">
    <p class="login__subtitle">
      Sign in with your Debricked credentials 🕵️‍♂️
    </p>
    <form @submit.prevent="onSubmit">
      <div class="login__form">
        <label for="username">
          <input
            class="login__input"
            id="username"
            type="email"
            placeholder="Username"
            v-model="username"
            required
          >
        </label>
        <label for="password">
          <input
            class="login__input"
            id="password"
            type="password"
            placeholder="Password"
            v-model="password"
            required
          >
        </label>
        <button
          :class="['login__button', {'disabled': isLoginProcessing}]"
          type="submit"
          @click.prevent="onSubmit"
        >
          <IconLoader v-if="isLoginProcessing" />
          <span v-else>
            Sign in
          </span>
        </button>

        <div class="login__errors" v-if="errors">⚠️ {{errors}}</div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import IconLoader from '@/components/IconLoader.vue';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      isLoginProcessing: false,
    };
  },
  components: {
    IconLoader,
  },
  computed: {
    ...mapGetters({
      errors: 'account/getErrors',
    }),
  },
  methods: {
    ...mapActions({
      login: 'account/login',
    }),
    async onSubmit() {
      if (this.username && this.password) {
        this.isLoginProcessing = true;
        this.login({
          username: this.username,
          password: this.password,
        }).then((result) => {
          this.isLoginProcessing = false;
          if (result) {
            this.$router.push({ name: 'Home' });
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
.login {
  max-width: 350px;
  margin: 0 auto;
  &__subtitle {
    font-size: 17px;
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  &__input {
    font-size: 19px;
    color: #333;
    padding: 10px 12px;
    width: 100%;
    border: 2px solid rgb(47, 62, 113);
    border-radius: 5px;
    cursor: pointer;
    outline: initial;
    box-sizing: border-box;
  }
  &__button {
    background: #00c853;
    border: initial;
    border-radius: 5px;
    padding: 5px 15px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    color: #fff;
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
</style>
