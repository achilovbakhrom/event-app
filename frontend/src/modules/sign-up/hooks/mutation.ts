import MUTATION_SIGN_UP from '@/gql/mutations/signUp'
import { useMutation } from '@vue/apollo-composable'
import type { SignUpResponse } from '../types'
import { reactive } from 'vue'

type State = {
  data: SignUpResponse | null
  loading: boolean
  error: string | null
}

const useSignUpMutation = () => {
  const state = reactive<State>({
    data: null,
    loading: false,
    error: null
  })

  const { onDone, onError, mutate } = useMutation<SignUpResponse>(MUTATION_SIGN_UP)

  onError((e) => {
    state.error = e.message
    state.data = null
    state.loading = false
  })

  onDone((response) => {
    state.error = null
    state.data = response.data ?? null
    state.loading = false
  })

  const signUp = (email: string, password: string) => {
    state.error = null
    state.loading = true

    mutate({ email, password })
  }

  return { state, signUp }
}

export default useSignUpMutation
