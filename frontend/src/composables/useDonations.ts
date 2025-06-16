import { ref, onMounted, onUnmounted } from 'vue'

export function useDonations() {
  const totalDonations = ref(0)
  const isLoading = ref(true)
  const error = ref('')

  const fetchTotalDonations = async () => {
    try {
      isLoading.value = true
      const response = await fetch('/api/donations/total')
      const data = await response.json()
      
      if (data.success) {
        totalDonations.value = data.total
      } else {
        error.value = 'Failed to fetch donation data'
      }
    } catch (err) {
      console.error('Error fetching donations:', err)
      error.value = 'Network error while fetching donations'
    } finally {
      isLoading.value = false
    }
  }

  // Poll for updates every 30 seconds
  let pollInterval: ReturnType<typeof setInterval>;

  const startPolling = () => {
    pollInterval = setInterval(fetchTotalDonations, 30000)
  }

  const stopPolling = () => {
    if (pollInterval) {
      clearInterval(pollInterval)
    }
  }

  onMounted(() => {
    fetchTotalDonations()
    startPolling()
  })

  onUnmounted(() => {
    stopPolling()
  })

  return {
    totalDonations,
    isLoading,
    error,
    fetchTotalDonations
  }
}