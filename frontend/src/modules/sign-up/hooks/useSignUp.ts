import { computed, reactive, watch } from 'vue'
import useSignUpMutation from './mutation'
import { useRouter } from 'vue-router'
import { email, helpers, minLength, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const initialState = {
  email: '',
  password: '',
  confirmPassword: ''
}

const useSignUp = () => {
  const mutation = useSignUpMutation()
  const router = useRouter()
  const state = reactive({
    ...initialState
  })

  const rules = reactive({
    email: {
      email,
      required,
      serverFailed: helpers.withMessage(' ', {
        $validator: () => !mutation.state.error
      })
    },
    password: {
      minLength: minLength(8)
    },
    confirmPassword: {
      minLength: minLength(8),
      confirm: helpers.withMessage(
        'Passwords should be match',
        () => !!state.password && state.password === state.confirmPassword
      )
    }
  })
  const form$ = useVuelidate(rules, state)

  const loading = computed(() => mutation.state.loading)
  const error = computed(() => mutation.state.error)

  watch(mutation.state, () => {
    if (mutation.state.data) {
      router.push('/auth/sign-in')
    }
  })

  watch(state, () => {
    mutation.state.error = null
  })

  const submit = async () => {
    mutation.state.error = null
    await form$.value.$validate()

    if (!form$.value.$invalid) {
      mutation.signUp(state.email, state.password)
    }
  }

  return { submit, loading, form$, state, error }
}

export default useSignUp
