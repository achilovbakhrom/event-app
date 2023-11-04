import MUTATION_SIGN_OUT from '@/gql/mutations/signOut'
import MUTATION_SIGN_UP from '@/gql/mutations/signUp'
import { useMutation } from '@vue/apollo-composable'
import { reactive } from 'vue'

type State = {
  data: any
  loading: boolean
  error: string | null
}

const useSignOutMutation = (onErrorCb: Function) => {
  const state = reactive<State>({
    data: null,
    loading: false,
    error: null
  })

  const { onDone, onError, mutate } = useMutation<any>(MUTATION_SIGN_OUT)

  onError((e) => {
    state.error = e.message
    state.data = null
    state.loading = false
    onErrorCb()
  })

  onDone((response) => {
    state.error = null
    state.data = response.data ?? null
    state.loading = false
  })

  const signOut = () => {
    state.error = null
    state.loading = true

    mutate()
  }

  return { state, signOut }
}

export default useSignOutMutation
