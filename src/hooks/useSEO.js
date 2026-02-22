import { useEffect } from 'react'

export function useSEO({ title, description }) {
    useEffect(() => {
        if (title) {
            document.title = `${title} - Karya Mandiri Dental`
        }
        if (description) {
            let meta = document.querySelector('meta[name="description"]')
            if (meta) {
                meta.setAttribute('content', description)
            }
        }
    }, [title, description])
}
