<template>
  <div class="modern-table-container">
    <!-- Loading State con diseño moderno -->
    <div v-if="userStore.loading" class="loading-container">
      <div class="loading-card">
        <div class="loading-spinner">
          <BSpinner variant="primary" class="spinner-custom"></BSpinner>
        </div>
        <h5 class="loading-text">Cargando usuarios</h5>
        <p class="loading-subtitle">Obteniendo la información más reciente...</p>
      </div>
    </div>

    <!-- Error Alert moderno -->
    <BAlert v-if="userStore.error" :model-value="true" variant="danger" dismissible @dismissed="userStore.clearError"
      class="modern-alert">
      <div class="d-flex align-items-center">
        <i class="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
        <div>
          <strong>Error:</strong>
          {{ userStore.error }}
        </div>
      </div>
    </BAlert>

    <!-- Tabla moderna -->
    <div v-if="!userStore.loading" class="table-wrapper">
      <div class="table-header">
        <div class="table-title">
          <h4 class="mb-0">
            <i class="bi bi-people-fill me-2"></i>
            Lista de Usuarios
          </h4>
          <span class="user-count">{{ userStore.userCount }} usuarios</span>
        </div>
      </div>

      <div class="modern-table-scroll">
        <BTable :items="userStore.users" :fields="tableFields" responsive borderless
          :empty-text="'No hay usuarios disponibles'"
          empty-filtered-text="No se encontraron usuarios que coincidan con el filtro" class="modern-table">
          <!-- Avatar y nombre -->
          <template #cell(name)="{ item }">
            <div class="user-info">
              <div class="user-avatar">
                {{ getInitials(item.name) }}
              </div>
              <div class="user-details">
                <div class="user-name">{{ item.name }}</div>
                <div class="user-username">@{{ item.username || 'usuario' }}</div>
              </div>
            </div>
          </template>

          <!-- Email con ícono -->
          <template #cell(email)="{ item }">
            <div class="contact-info">
              <i class="bi bi-envelope me-2 text-muted"></i>
              <a :href="`mailto:${item.email}`" class="email-link">
                {{ item.email }}
              </a>
            </div>
          </template>

          <!-- Teléfono con ícono -->
          <template #cell(phone)="{ item }">
            <div class="contact-info">
              <i class="bi bi-telephone me-2 text-muted"></i>
              <a>
                {{ item.phone }}
              </a>
            </div>
          </template>

          <!-- Acciones -->
          <template #cell(actions)="{ item }">
            <div class="action-buttons">
              <BButton size="sm" variant="light" @click="$emit('edit-user', item)" class="action-btn edit-btn"
                title="Editar usuario">
                <i class="bi bi-pencil-square"></i>
              </BButton>
              <BButton size="sm" variant="light" @click="$emit('delete-user', item)" class="action-btn delete-btn"
                title="Eliminar usuario">
                <i class="bi bi-trash3"></i>
              </BButton>
            </div>
          </template>
        </BTable>
      </div>

      <!-- Estado vacío -->
      <div v-if="!userStore.hasUsers" class="empty-state">
        <div class="empty-icon">
          <i class="bi bi-people"></i>
        </div>
        <h5>No hay usuarios aún</h5>
        <p class="text-muted">Agrega tu primer usuario para comenzar</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BTable,
  BButton,
  BSpinner,
  BAlert
} from 'bootstrap-vue-next';
import type { User } from '../../types/user';
import { useUserStore } from '../../stores/userStore';

// Emits
interface Emits {
  (e: 'edit-user', user: User): void;
  (e: 'delete-user', user: User): void;
}

defineEmits<Emits>();

// Store
const userStore = useUserStore();

// Configuración de campos de la tabla
const tableFields = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Nombre', sortable: true },
  { key: 'username', label: 'Usuario', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'phone', label: 'Teléfono', sortable: false },
  { key: 'actions', label: 'Acciones', sortable: false, thClass: 'text-center' }
];

// Función para obtener iniciales del nombre
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};
</script>

<style scoped>
.modern-table-container {
  background: #f8f9fa;
  min-height: 400px;
  border-radius: 16px;
  padding: 0px 20px 20px 20px;
}

/* Loading State */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.loading-card {
  background: white;
  padding: 48px 32px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 300px;
}

.loading-spinner {
  margin-bottom: 24px;
}

.spinner-custom {
  width: 48px;
  height: 48px;
}

.loading-text {
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 8px;
}

.loading-subtitle {
  color: #6c757d;
  margin: 0;
  font-size: 14px;
}

/* Alert moderno */
.modern-alert {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(220, 53, 69, 0.15);
  border-left: 4px solid #dc3545;
}

/* Table Wrapper */
.table-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.table-header {
  padding: 24px 24px 16px;
  border-bottom: 1px solid #e9ecef;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.table-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.modern-table-scroll {
  max-height: 600px;
  overflow-y: auto;
}

/* Tabla moderna */
.modern-table {
  margin: 0;
  overflow-x: visible !important;
}

.modern-table :deep(thead th) {
  background: #f8f9fa;
  border: none;
  color: #495057;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
  padding: 16px 24px;
}

.modern-table :deep(tbody td) {
  border: none;
  padding: 20px 24px;
  vertical-align: middle;
  border-bottom: 1px solid #f1f3f4;
}

.modern-table :deep(tbody tr) {
  transition: all 0.3s ease;
}

.modern-table :deep(tbody tr:hover) {
  background: #f8f9ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* User Info */
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px !important;
  height: 40px !important;
  min-width: 40px !important;
  min-height: 40px !important;
  max-width: 40px !important;
  max-height: 40px !important;
  font-size: 14px !important;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
}


.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 2px;
}

.user-username {
  font-size: 12px;
  color: #6c757d;
}

/* Contact Info */
.contact-info {
  display: flex;
  align-items: center;
}

.email-link,
.phone-link,
.website-link {
  color: #495057;
  text-decoration: none;
  transition: color 0.3s ease;
}

.email-link:hover {
  color: #007bff;
}

.phone-link:hover {
  color: #28a745;
}

.website-link:hover {
  color: #6f42c1;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  border: 1px solid #e9ecef;
  background: white;
  color: #6c757d;
  transition: all 0.3s ease;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-btn:hover {
  background: #007bff;
  color: white;
  border-color: #007bff;
  transform: translateY(-2px);
}

.delete-btn:hover {
  background: #dc3545;
  color: white;
  border-color: #dc3545;
  transform: translateY(-2px);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 64px 32px;
  color: #6c757d;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.5;
}

.empty-state h5 {
  margin-bottom: 8px;
  color: #495057;
}

/* Responsive */
@media (max-width: 768px) {
  .modern-table-container {
    padding: 16px;
    border-radius: 12px;
  }

  .table-header {
    padding: 16px;
  }

  .table-title {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .modern-table :deep(tbody td) {
    padding: 16px 12px;
  }

  .user-info {
    gap: 8px;
  }

  .user-avatar {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px !important;
    min-height: 32px !important;
    max-width: 32px !important;
    max-height: 32px !important;
    font-size: 12px !important;
  }
}
</style>