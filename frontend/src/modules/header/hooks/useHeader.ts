import { useRouter } from 'vue-router'
import useSignOutMutation from './mutation'
import { computed, watch } from 'vue'

const useHeader = () => {
  const router = useRouter()

  const signOutLocally = () => {
    localStorage.removeItem('token')
    router.push({
      path: '/auth/sign-in',
      replace: true
    })
  }

  const { signOut, state } = useSignOutMutation(signOutLocally)

  watch(state, () => {
    if (state.data) {
      signOutLocally()
    }
  })

  const signOutFn = () => {
    signOut()
  }

  const loading = computed(() => state.loading)

  return { signOutFn, loading }
}

export default useHeader
