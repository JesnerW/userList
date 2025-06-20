import { computed } from 'vue';
import { useField, useForm } from 'vee-validate';
import { userValidationSchema } from '../schemas/userSchema';

export function useUserForm() {

  // Configurar VeeValidate con Yup
  const { handleSubmit, resetForm, setValues, meta } = useForm({
    validationSchema: userValidationSchema,
    initialValues: {
      name: '',
      username: '',
      email: '',
      phone: ''
    }
  });

  // Fields con VeeValidate
  const { value: name, errorMessage: nameError } = useField<string>('name');
  const { value: username, errorMessage: usernameError } = useField<string>('username');
  const { value: email, errorMessage: emailError } = useField<string>('email');
  const { value: phone, errorMessage: phoneError } = useField<string>('phone');

  // Estados para Bootstrap validation
  const nameState = computed(() => {
    if (nameError.value) return false;
    if (name.value && !nameError.value) return true;
    return null;
  });

  const usernameState = computed(() => {
    if (usernameError.value) return false;
    if (username.value && !usernameError.value) return true;
    return null;
  });

  const emailState = computed(() => {
    if (emailError.value) return false;
    if (email.value && !emailError.value) return true;
    return null;
  });

  const phoneState = computed(() => {
    if (phoneError.value) return false;
    if (phone.value && !phoneError.value) return true;
    return null;
  });

  return {
    // State
    meta,
    name,
    username,
    email,
    phone,

    //Errors
    nameError,
    usernameError,
    emailError,
    phoneError,

    // State Boostrap
    nameState,
    usernameState,
    emailState,
    phoneState,

    // Methods
    handleSubmit,
    resetForm,
    setValues,
  };
}