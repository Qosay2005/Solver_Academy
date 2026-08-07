import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function App() {
  const queryClient = new QueryClient()
  const { i18n } = useTranslation()

  useEffect(() => {
    const isArabic = i18n.language?.startsWith('ar')
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    document.documentElement.lang = isArabic ? 'ar' : 'en'
  }, [i18n.language])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
