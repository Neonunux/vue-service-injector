<script lang="ts">
import BaseVueInstance from '../../BaseVueInstance';

export default BaseVueInstance.extend({
  methods: {
    goToLogInPage() {
      this.$router.push('/login');
    },
  },
});
</script>

<template>
  <Portal to="main-menu">
    <button type="button" @click="goToLogInPage">
      Log in
    </button>
  </Portal>
</template>
