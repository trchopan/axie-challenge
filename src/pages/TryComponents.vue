<template>
  <TextInput label="Texxxxtttt" type="Text">
    <template #append>
      <Button small @click="onClickButton">Max</Button>
    </template>
  </TextInput>
  <TextInput label="enter password" type="password" />
  <TextInput v-model="inputText" label="I'm Disabled" type="Text" disabled>
    <template #prepend><div class="font-medium">My_Wallet</div></template>
  </TextInput>
  <div class="row">
    <TextInput model-value="EUR" type="Text" inline label="With Icon">
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
  <Button large-icon @click="onClickButton">
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
  <Button block>Cancel</Button>
  <Button primary block>Primary</Button>
  <div>
    <ListItem
      prepend-icon="euro"
      title="50 EUR"
      subtitle="1,531,972 VND"
    ></ListItem>
    <ListItem
      @click="onClickList"
      prepend-icon="usd"
      title="5000 USD"
      subtitle="10,531,972 VND"
      tile
    ></ListItem>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue';

export default defineComponent({
  name: 'TryComponents',
  setup: () => {
    const inputText = ref<string>('initial text');

    const onClickList = () => {
      console.log('test onClickList');
    };

    const onClickButton = () => {
      console.log('test onClickButton');
    };

    return {inputText, onClickList, onClickButton};
  },
});
</script>
