<template>
  <div class="form-wrapper">
    <div class="form-header">
      <h4 class="form-title">
        <i class="bi bi-person-plus me-2" v-if="!isEditing"></i>
        <i class="bi bi-person-gear me-2" v-else></i>
        {{ isEditing ? 'Actualizar Usuario' : 'Crear Nuevo Usuario' }}
      </h4>
      <p class="form-subtitle">
        {{ isEditing ? 'Modifica los datos del usuario' : 'Completa los datos para crear un nuevo usuario' }}
      </p>
    </div>
    
    <BForm @submit.prevent="onSubmit" novalidate class="modern-form">
      <!-- Campo Nombre -->
      <BFormGroup class="modern-form-group">
        <label class="modern-label" for="name">
          <i class="bi bi-person me-2"></i>
          Nombre Completo
        </label>
        <div class="input-wrapper">
          <BFormInput 
            id="name" 
            v-model="name" 
            type="text" 
            :state="nameState" 
            placeholder="Ingresa el nombre completo"
            class="modern-input"
          />
          <div v-if="nameError" class="modern-error">
            <i class="bi bi-exclamation-triangle me-1"></i>
            {{ nameError }}
          </div>
        </div>
      </BFormGroup>

      <!-- Campo Username -->
      <BFormGroup class="modern-form-group">
        <label class="modern-label" for="username">
          <i class="bi bi-at me-2"></i>
          Nombre de Usuario
        </label>
        <div class="input-wrapper">
          <BFormInput 
            id="username" 
            v-model="username" 
            type="text" 
            :state="usernameState"
            placeholder="Ingresa el nombre de usuario"
            class="modern-input"
          />
          <div v-if="usernameError" class="modern-error">
            <i class="bi bi-exclamation-triangle me-1"></i>
            {{ usernameError }}
          </div>
        </div>
      </BFormGroup>

      <!-- Campo Email -->
      <BFormGroup class="modern-form-group">
        <label class="modern-label" for="email">
          <i class="bi bi-envelope me-2"></i>
          Correo Electrónico
        </label>
        <div class="input-wrapper">
          <BFormInput 
            id="email" 
            v-model="email" 
            type="email" 
            :state="emailState" 
            placeholder="Ingresa el email"
            class="modern-input"
          />
          <div v-if="emailError" class="modern-error">
            <i class="bi bi-exclamation-triangle me-1"></i>
            {{ emailError }}
          </div>
        </div>
      </BFormGroup>

      <!-- Campo Teléfono -->
      <BFormGroup class="modern-form-group">
        <label class="modern-label" for="phone">
          <i class="bi bi-telephone me-2"></i>
          Teléfono
        </label>
        <div class="input-wrapper">
          <BFormInput 
            id="phone" 
            v-model="phone" 
            type="tel" 
            :state="phoneState" 
            placeholder="Ingresa el teléfono"
            class="modern-input"
          />
          <div v-if="phoneError" class="modern-error">
            <i class="bi bi-exclamation-triangle me-1"></i>
            {{ phoneError }}
          </div>
        </div>
      </BFormGroup>

      <!-- Botones -->
      <div class="form-actions">
        <BButton variant="outline-secondary" @click="$emit('cancel')" type="button" class="action-btn cancel-btn">
          <i class="bi bi-x-lg me-2"></i>
          Cancelar
        </BButton>
        <BButton variant="primary" type="submit" :disabled="!meta.valid" class="action-btn submit-btn">
          <i class="bi bi-check-lg me-2"></i>
          {{ isEditing ? 'Actualizar Usuario' : 'Crear Usuario' }}
        </BButton>
      </div>
    </BForm>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import {
  BForm,
  BFormGroup,
  BFormInput,
  BButton
} from 'bootstrap-vue-next';
import type { User, CreateUserData } from '../../types/user';
import { useUserForm } from '../../composables/useUserForm'

const { meta,
  handleSubmit,
  setValues,
  resetForm,
  name,
  email,
  username,
  phone,
  nameState,
  usernameState,
  emailState,
  phoneState,
  nameError,
  usernameError,
  emailError,
  phoneError } = useUserForm();

// Props
interface Props {
  user?: User | null;
}

// Emits
interface Emits {
  (e: 'submit', userData: CreateUserData): void;
  (e: 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  user: null
});

const emit = defineEmits<Emits>();

// Computed
const isEditing = computed(() => props.user !== null);

// Submit handler
const onSubmit = handleSubmit((values) => {
  const userData: CreateUserData = {
    name: values.name,
    username: values.username,
    email: values.email,
    phone: values.phone
  };

  emit('submit', userData);
  resetForm();
});

// Watch para cambios en props.user
watch(() => props.user, (newUser) => {
  console.log("aa")
  if (newUser) {
    setValues({
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone
    });
  } else {
    resetForm();
  }
}, { immediate: true });
</script>

<style scoped>
.form-wrapper {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 0;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  margin: 0 auto;
}

.form-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 32px 32px 24px;
  text-align: center;
}

.form-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 15px;
  font-weight: 400;
}

.modern-form {
  padding: 32px;
}

.modern-form-group {
  margin-bottom: 24px;
}

.modern-form-group :deep(.form-group) {
  margin-bottom: 0;
}

.modern-label {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 14px;
}

.input-wrapper {
  position: relative;
}

.modern-input {
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #fafbfc;
}

.modern-input:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  outline: none;
}

.modern-input.is-valid {
  border-color: #28a745;
  background: white;
}

.modern-input.is-valid:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
}

.modern-input.is-invalid {
  border-color: #dc3545;
  background: #fff5f5;
}

.modern-input.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.modern-error {
  color: #dc3545;
  font-size: 13px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e9ecef;
}

.action-btn {
  flex: 1;
  padding: 16px 24px;
  font-weight: 600;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
}

.cancel-btn {
  background: white;
  color: #6c757d;
  border-color: #e9ecef;
}

.cancel-btn:hover {
  background: #f8f9fa;
  color: #495057;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.submit-btn:disabled {
  background: #e9ecef;
  border-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 768px) {
  .modern-form-container {
    padding: 16px;
  }

  .form-header {
    padding: 24px 20px 20px;
  }

  .form-title {
    font-size: 20px;
  }

  .modern-form {
    padding: 24px 20px;
  }

  .modern-form-group {
    margin-bottom: 20px;
  }

  .modern-input {
    padding: 14px 16px;
    font-size: 16px; /* Evita zoom en iOS */
  }

  .form-actions {
    flex-direction: column;
    gap: 12px;
  }

  .action-btn {
    width: 100%;
    padding: 14px 20px;
  }
}

@media (max-width: 480px) {
  .modern-form-container {
    padding: 12px;
  }

  .form-wrapper {
    border-radius: 16px;
  }

  .form-header {
    padding: 20px 16px 16px;
  }

  .form-title {
    font-size: 18px;
    flex-direction: column;
    gap: 8px;
  }

  .modern-form {
    padding: 20px 16px;
  }
}
</style>