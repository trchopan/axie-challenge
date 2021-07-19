<template>
  <div class="px-5 py-5">
    <TopBar
      title="Roni Walletttt"
      prepend-icon="chevron-left"
      @click:prepend-icon="onClickTopbarIcon"
    />
    <TopBar
      title="Honto niiiii"
      append-icon="close"
      @click:append-icon="onClickTopbarIcon"
    />
    <TextInput
      label="TEXXXXTTTT"
      right-label="naniii kore"
      placeholder="Place holderrrrr"
    />
    <TextInput
      label="TEXXXXTTTT"
      right-label="naniii kore"
      placeholder="Place holderrrrr"
      inline
    />
    <TextInput label="Texxxxtttt" type="Text">
      <template #append>
        <Button small @click="onClickButton">Max</Button>
      </template>
    </TextInput>
    <TextInput label="enter password" type="password" />
    <TextInput
      model-value="EUR"
      :options="['USD', 'EUR']"
      type="text"
      label="ASSET"
    >
      <template #prepend>
        <Icon name="euro" />
      </template>
      <template #append>
        <Icon name="stack" />
      </template>
    </TextInput>
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
    <div class="flex">
      <Button @click="onClickButton" large-icon="credit-card-fill"> </Button>
      <Button icon="person-fill"></Button>
      <Button primary @click="onClickButton">Primary</Button>
      <Button>
        <Icon name="circle-fill" size="8px" left />
        Ronin Wallet
      </Button>
      <Button>Cancel</Button>
      <Button primary disabled>Primary</Button>
    </div>
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
      <ListItem append-icon="repeat">
        <div class="text-center">
          Sit aliquam voluptates
        </div>
      </ListItem>
    </div>
    <div>
      <Card primary class="px-5">
        <div>
          Ipsum esse sequi eligendi sequi recusandae? Dolor voluptate deleniti
          ipsum
        </div>
        <hr />
        <div>Adipisicing nihil ipsam amet molestiae.</div>
      </Card>
    </div>
    <div>
      <Button @click="showModal = true">Show Modal</Button>
      <Modal v-model="showModal">
        <Card class="px-5">
          <h3>Modal Header</h3>
          <p>
            Elit impedit voluptate eveniet optio quasi, illo Libero officiis
            accusantium voluptate blanditiis sed corporis Quaerat ipsum quasi
            necessitatibus vitae provident Nulla molestias repellendus incidunt
            autem sapiente? Eos quis harum labore fugit iure. Eligendi nulla
            iusto natus fugiat atque reprehenderit Iste totam nulla debitis
            quaerat harum praesentium harum. Quas adipisci id iusto provident
            perferendis aliquam. Laboriosam fuga nemo consectetur saepe
            voluptate sapiente. Dolores aut quas cupiditate possimus dignissimos
            at aperiam, odit Nobis soluta optio perferendis illo facilis saepe
            Aut perferendis tempore ullam omnis rem, impedit? Quasi voluptate
            praesentium ipsum modi deserunt Quo mollitia laudantium sapiente rem
            officiis? Sed tempora quaerat ratione
          </p>
          <Button @click="showModal = false">Close</Button>
        </Card>
      </Modal>
    </div>
    <!-- NOTE: Comment out Loading because animation spin up CPU -->
    <!-- <Loading /> -->
    <!-- <Loading color="red" /> -->
    <!-- <Button primary :disabled="true" :loading="true">Disabled</Button> -->
    <!-- <Button :loading="true">Loading</Button> -->
  </div>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue';

export default defineComponent({
  name: 'TryComponents',
  setup: () => {
    const showModal = ref<boolean>(false);
    const inputText = ref<string>('initial text');

    const onClickList = () => {
      console.log('test onClickList', Math.random());
    };

    const onClickButton = () => {
      console.log('test onClickButton', Math.random());
    };

    const onClickTopbarIcon = () => {
      console.log('test onClickTopbarIcon', Math.random());
    };

    return {
      inputText,
      onClickList,
      onClickButton,
      onClickTopbarIcon,
      showModal,
    };
  },
});
</script>
