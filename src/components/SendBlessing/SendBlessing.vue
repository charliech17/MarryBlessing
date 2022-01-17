<template>
  <the-header></the-header>
  <transition name="edit" >
  <div class="buttons" v-if="!isEditingText">
    <addphoto-button></addphoto-button>
    <base-button buttonStyle="purple" @click="addText" :needImage="true"
      >新增文字 <template #img> <img src="../../img/text.png" /> </template
    ></base-button>
    <base-button buttonStyle="purple" :needImage="true"
      >上傳<template #img> <img src="../../img/upload.png" /> </template
    ></base-button>
  </div>
  </transition>
  <edit-blessing></edit-blessing>

  <add-blessing> </add-blessing>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import AddBlessing from "./blessingtext/AddBlessing.vue";
import EditBlessing from "./blessingtext/EditBlessing.vue";
import AddphotoButton from "./addphotos/AddphotoButton.vue";

export default {
  components: {
    AddBlessing,
    EditBlessing,
    AddphotoButton,
  },
  setup() {
    const store = useStore();
    const isEditingText = computed(
      () => store.getters["blessing/isEditText"].isEditing
    );

    function addText() {
      store.dispatch("blessing/isAddingText", true);
      nowEditText(true, "root");
    }

    function nowEditText(boolen, id) {
      const editTexting = {
        isEditing: boolen,
        editId: id,
      };
      store.dispatch("blessing/isEditingText", editTexting);
    }

    return {
      addText,
      isEditingText,
    };
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
}

.buttons > * {
  width: 30%;
  font-size: 1.5vw;
  margin: 1.5rem 1.5vw;
}

.buttons > button img {
  width: 100%;
  height: 100%;
}

/* .editTextControls-enter-form,
.editTextControls-leave-to{

} */

.edit-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.edit-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.edit-enter-active {
  transition: all 0.3s ease-out;
}

.edit-leave-active {
  transition: all 0.3s ease-in;
}

.edit-enter-to,
.edit-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* .add_photos {
  background: #350b79;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

}

.add_photos > div {
  display: inline-block;
  width: 1.8rem;
  height: 1.8rem;
  background-color: white;
  border-radius: 0.3rem;
  margin-right: 0.2rem;
}

.add_photos > div > img {
  width: 100%;
  height: 100%;
}

.add_photos>p{
  display: inline-block;
  color: white;
  padding-top: 0.9rem;
}
input[type="file"] {
  display: none;
} */
</style>
