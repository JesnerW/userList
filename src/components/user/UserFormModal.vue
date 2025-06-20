<template>
  <BModal
    v-model="isVisible"
    size="md"
    @hide="handleClose"
    @shown="handleShown"
    no-footer
    centered
    noHeader
    body-class="p-0"
    modal-class="transparent-modal-content"
  >
    <UserForm
      :user="user"
      @submit="handleSubmit"
      @cancel="handleClose"
    />
  </BModal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { BModal } from 'bootstrap-vue-next';
import UserForm from './UserForm.vue';
import type { User, CreateUserData } from '../../types/user';

// Props
interface Props {
  show: boolean;
  user?: User | null;
}

// Emits
interface Emits {
  (e: 'update:show', value: boolean): void;
  (e: 'submit', userData: CreateUserData, user?: User | null): void;
  (e: 'close'): void;
}

const props = withDefaults(defineProps<Props>(), {
  user: null
});

const emit = defineEmits<Emits>();

// Computed
const isVisible = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value)
});

// Methods
const handleSubmit = (userData: CreateUserData) => {
  emit('submit', userData, props.user);
  handleClose();
};

const handleClose = () => {
  emit('close');
  emit('update:show', false);
};

const handleShown = () => {
  // Enfocar el primer campo cuando se muestre el modal
  const firstInput = document.querySelector('#name') as HTMLInputElement;
  if (firstInput) {
    firstInput.focus();
  }
};
</script>

<style>
/* Quitar el fondo y bordes del modal */
.transparent-modal-content .modal-content {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.transparent-modal-content .modal-body {
  padding: 0 !important;
}
</style>