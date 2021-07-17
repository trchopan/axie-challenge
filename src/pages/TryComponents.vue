<template>
  <TextInput label="Texxxxtttt" type="Text">
    <Button small>Max</Button>
  </TextInput>
  <TextInput label="enter password" type="password" />
  <div>
    <TextInput label="With Icon" type="Text" inline>
      <Icon name="stack" />
    </TextInput>
    <TextInput label="With Icon" type="Text" inline>
      <Icon name="eye" />
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
    //
  },
});
</script>
