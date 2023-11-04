import useSignInQuery from './query'
import { useVuelidate } from '@vuelidate/core'
import { computed, reactive, watch } from 'vue'
import { email, required, minLength, helpers } from '@vuelidate/validators'

import { useRouter } from 'vue-router'

const initialState = {
  email: '',
  password: ''
}

const useSignIn = () => {
  const query = useSignInQuery()
  const router = useRouter()
  const state = reactive({
    ...initialState
  })

  const rules = reactive({
    email: {
      email,
      required,
      serverFailed: helpers.withMessage(' ', {
        $validator: () => !query.state.error
      })
    },
    password: {
      minLength: minLength(8),
      serverFailed: helpers.withMessage(' ', {
        $validator: () => !query.state.error
      })
    }
  })
  const form$ = useVuelidate(rules, state)
  const loading = computed(() => query.state.loading)
  const token = computed(() => query.state.data?.login.accessToken)

  watch(state, () => {
    query.state.error = null
  })

  watch(token, () => {
    if (token.value) {
      localStorage.setItem('token', token.value)
      router.replace('/events')
    }
  })

  const submit = async () => {
    query.state.error = null
    await form$.value.$validate()

    if (!form$.value.$invalid) {
      query.login(state.email, state.password)
    }
  }

  return {
    form$,
    state,
    submit,
    loading
  }
}

export default useSignIn
