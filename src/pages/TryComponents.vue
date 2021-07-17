<template>
  <TextInput label="Texxxxtttt" type="Text">
    <Button small>Max</Button>
  </TextInput>
  <TextInput label="enter password" type="password" />
  <TextInput v-model="inputText" label="I'm Disabled" type="Text" disabled>
    <template #prepend><div class="font-medium">My_Wallet</div></template>
  </TextInput>
  <div class="row">
    <TextInput type="Text" inline label="With Icon" right-label="I'm right">
      <template #prepend>
        <Icon name="euro" />
      </template>
      <template #append>
        <Icon name="stack" />
      </template>
    </TextInput>
    <TextInput
      v-model="inputText"
      label="I'm Inline"
      right-label="Readonly"
      type="Text"
      inline
      readonly
    >
      <template #append>
        <Icon name="eye" />
      </template>
    </TextInput>
  </div>
  <div>
    <Icon name="eye" size="50px" />
    <Icon name="person-fill" />
    <Icon name="plane-fill" />
    <Icon name="repeat" />
  </div>
  <Button large-icon>
    <Icon name="credit-card-fill" size="24px" />
  </Button>
  <Button icon>
    <Icon name="person-fill" size="16px" />
  </Button>
  <Button primary>Primary</Button>
  <Button>
    <Icon name="circle-fill" size="8px" left />
    Ronin Wallet
  </Button>
  <Button primary block>Primary</Button>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue';

export default defineComponent({
  name: 'TryComponents',
  setup: () => {
    const inputText = ref<string>('initial text');

    return {inputText};
  },
});
</script>
