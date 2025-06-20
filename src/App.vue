<template>
  <div id="app">
    <BContainer fluid class="py-4">
      <!-- Header -->
      <header class="mb-4">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h1 class="h2 mb-1">
              <i class="bi bi-people-fill text-primary me-2"></i>
              Gestión de Usuarios
            </h1>
          </div>
          <BBadge variant="info" class="fs-6">
            {{ userStore.userCount }} usuarios
          </BBadge>
        </div>
      </header>

      <!-- Botón Agregar Usuario -->
      <div class="mb-4">
        <BButton variant="primary" size="lg" @click="openCreateModal">
          <i class="bi bi-plus-lg me-2"></i>
          Nuevo Usuario
        </BButton>
      </div>

      <!-- Componente Tabla -->
      <UserTable @edit-user="openEditModal" @delete-user="handleDeleteUser" />

      <!-- Modal de Formulario -->
      <UserFormModal v-model:show="showFormModal" :user="selectedUser" @submit="handleSubmitUser"
        @close="handleCloseModal" />
    </BContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  BContainer,
  BButton,
  BBadge
} from 'bootstrap-vue-next';
import UserTable from './components/user/UserTable.vue';
import UserFormModal from './components/user/UserFormModal.vue';
import type { User, CreateUserData } from './types/user';
import { useUserStore } from './stores/userStore';
import { useSweetAlert } from './composables/useSweetAlert';

// Store y composables
const userStore = useUserStore();
const { confirmDelete, showSuccess, showError } = useSweetAlert();

// Estado local del componente
const showFormModal = ref(false);
const selectedUser = ref<User | null>(null);

// Métodos para modal
const openCreateModal = () => {

  selectedUser.value = null;
  showFormModal.value = true;
};

const openEditModal = (user: User) => {
  selectedUser.value = user;
  showFormModal.value = true;
};

const handleCloseModal = () => {
  selectedUser.value = null;
  showFormModal.value = false;
};

// Métodos CRUD
const handleSubmitUser = async (userData: CreateUserData, user?: User | null) => {
  try {
    if (user) {
      // Editar usuario existente
      const success = userStore.updateUser(user.id, userData);
      if (success) {
        await showSuccess(`Usuario ${userData.name} actualizado correctamente`);
      } else {
        await showError('No se pudo actualizar el usuario');
      }
    } else {
      // Crear nuevo usuario
      const newUser = userStore.createUser(userData);
      await showSuccess(`Usuario ${newUser.name} creado correctamente`);
    }
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    await showError('Ocurrió un error al guardar el usuario');
  }
};

const handleDeleteUser = async (user: User) => {
  try {
    const confirmed = await confirmDelete(user);

    if (confirmed) {
      const success = userStore.deleteUser(user.id);
      if (success) {
        await showSuccess(`Usuario ${user.name} eliminado correctamente`);
      } else {
        await showError('No se pudo eliminar el usuario');
      }
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    await showError('Ocurrió un error al eliminar el usuario');
  }
};

// Cargar datos al montar
onMounted(async () => {
  try {
    await userStore.fetchUsers();
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    await showError('No se pudieron cargar los usuarios iniciales');
  }
});
</script>

<style scoped>
#app {
  min-height: 100vh;
  background-color: #f8f9fa;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  margin-bottom: 2rem;
  margin-top: -2rem;
}

header h1 {
  color: white;
}

header .text-muted {
  color: rgba(255, 255, 255, 0.8) !important;
}
</style>