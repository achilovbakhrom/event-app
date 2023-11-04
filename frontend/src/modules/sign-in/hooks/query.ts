import QUERY_SIGN_IN from '@/gql/queries/signIn'
import { useLazyQuery } from '@vue/apollo-composable'
import type { SignInResponse } from '../types'
import { reactive } from 'vue'

type State = {
  data: SignInResponse | null
  loading: boolean
  error: string | null
}

const useSignInQuery = () => {
  const state = reactive<State>({
    data: null,
    loading: false,
    error: null
  })

  const { load, onResult, onError, refetch } = useLazyQuery<SignInResponse>(
    QUERY_SIGN_IN,
    {},
    {
      fetchPolicy: 'no-cache'
    }
  )

  onResult((response) => {
    state.error = null
    state.loading = false
    state.data = response.data
  })

  onError((error) => {
    state.error = error.message
    state.data = null
    state.loading = false
  })

  const login = async (email: string, password: string) => {
    state.error = null
    state.loading = true
    const variables = { email, password }
    ;(await load(QUERY_SIGN_IN, variables, { fetchPolicy: 'no-cache' })) || refetch(variables)
  }

  return { login, state }
}

export default useSignInQuery
