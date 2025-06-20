# User List - Gestión de Usuarios

Aplicación web moderna para la gestión de usuarios, desarrollada con Vue 3, TypeScript y Vite.

## Características principales

- Listado de usuarios en una tabla moderna y responsiva.
- Crear, editar y eliminar usuarios con formularios validados.
- Validación de formularios con VeeValidate y Yup.
- Almacenamiento local de usuarios (localStorage) y carga inicial desde API pública.
- Interfaz atractiva con Bootstrap 5, Bootstrap Icons y Bootstrap-Vue-Next.
- Notificaciones y confirmaciones con SweetAlert2.

## Tecnologías utilizadas

- [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) (gestión de estado)
- [Bootstrap 5](https://getbootstrap.com/) + [Bootstrap-Vue-Next](https://bootstrap-vue-next.github.io/)
- [VeeValidate](https://vee-validate.logaretm.com/) + [Yup](https://github.com/jquense/yup) (validación)
- [SweetAlert2](https://sweetalert2.github.io/) (alertas y confirmaciones)

## Instalación y ejecución

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repo>
   cd user-list
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Estructura del proyecto

- `src/components/user/` - Componentes principales: tabla, formulario y modal de usuario.
- `src/composables/` - Composables reutilizables (formulario, alertas).
- `src/stores/` - Store Pinia para usuarios.
- `src/services/` - Servicio para cargar usuarios desde API pública.
- `src/schemas/` - Esquema de validación Yup.
- `src/types/` - Tipos TypeScript para usuarios.

## Notas
- Los usuarios se almacenan en localStorage para persistencia local.
- Al iniciar, si no hay usuarios en localStorage, se cargan desde la API pública [jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users).
- El diseño es completamente responsivo y moderno.

---

Desarrollado usando Vue 3 + TypeScript + Vite.
