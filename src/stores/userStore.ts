import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User, CreateUserData } from "../types/user";
import { UserService } from "../services/userService";

const STORAGE_KEY = "users_data";

export const useUserStore = defineStore("users", () => {
  // State
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Helper functions for localStorage
  const saveToLocalStorage = (data: User[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  };

  const loadFromLocalStorage = (): User[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("Error loading from localStorage:", err);
      return [];
    }
  };

  const clearLocalStorage = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Error clearing localStorage:", err);
    }
  };

  // Getters
  const userCount = computed(() => users.value.length);
  const hasUsers = computed(() => users.value.length > 0);

  // Actions
  const fetchUsers = async () => {
    // Primero intentar cargar desde localStorage
    const localUsers = loadFromLocalStorage();

    if (localUsers.length > 0) {
      // Si hay datos en localStorage, usarlos sin mostrar loading
      users.value = localUsers;
      return;
    }

    // Si no hay datos en localStorage, obtener desde API
    loading.value = true;
    error.value = null;

    try {
      const data = await UserService.fetchUsers();
      users.value = data;
      // Guardar en localStorage después de obtener desde API
      saveToLocalStorage(data);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Error desconocido";
      console.error("Error in fetchUsers:", err);
    } finally {
      loading.value = false;
    }
  };

  const generateNewId = (): number => {
    if (users.value.length === 0) return 1;
    return Math.max(...users.value.map((user) => user.id)) + 1;
  };

  const createUser = (userData: CreateUserData): User => {
    const newUser: User = {
      id: generateNewId(),
      ...userData,
    };

    users.value.push(newUser);
    // Actualizar localStorage después de crear
    saveToLocalStorage(users.value);
    return newUser;
  };

  const updateUser = (id: number, userData: CreateUserData): boolean => {
    const index = users.value.findIndex((user) => user.id === id);

    if (index === -1) return false;

    users.value[index] = {
      id,
      ...userData,
    };

    // Actualizar localStorage después de actualizar
    saveToLocalStorage(users.value);
    return true;
  };

  const deleteUser = (id: number): boolean => {
    const index = users.value.findIndex((user) => user.id === id);

    if (index === -1) return false;

    users.value.splice(index, 1);
    // Actualizar localStorage después de eliminar
    saveToLocalStorage(users.value);
    return true;
  };

  const getUserById = (id: number): User | undefined => {
    return users.value.find((user) => user.id === id);
  };

  const clearError = () => {
    error.value = null;
  };

  // Acción adicional para forzar recarga desde API
  const forceRefreshFromAPI = async () => {
    // Limpiar localStorage
    clearLocalStorage();
    users.value = [];

    // Cargar todo nuevamente
    await fetchUsers();
  };

  // Acción para limpiar completamente el store y localStorage
  const clearAllData = () => {
    users.value = [];
    clearLocalStorage();
    error.value = null;
  };

  return {
    // State
    users,
    loading,
    error,

    // Getters
    userCount,
    hasUsers,

    // Actions
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    clearError,
    forceRefreshFromAPI,
    clearAllData,
  };
});
