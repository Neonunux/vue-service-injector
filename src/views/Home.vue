<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    {{ age }}
  </div>
</template>

<script lang="ts">
/* eslint-disable */

import 'reflect-metadata';
import { Vue, Component } from 'vue-property-decorator';

function Service(target: unknown, propertyName: string) {
  // console.log(target);
  // console.log(propertyName);
  const type = Reflect.getMetadata('design:type', target as Record<string, unknown>, propertyName);

  target.beforeCreate = function () {
    this[propertyName] = new type();
  };
}

class HttpRequestService {
  get(thing: string) {
    console.log(`Here is/are your ${thing}!`);
  }
}

class DashboardService {
  get(thing: string) {
    console.log("Fuck off, you won't have anything, bitch!");
  }
}

// class DecoratorWtf {
//   @Service
//   lala!: DashboardService;
// }

@Component
export default class MyComponent extends Vue {
  age = 55

  @Service
  httpRequestService!: DashboardService

  created() {
    this.httpRequestService.get('potatoes');
  }
}
</script>
