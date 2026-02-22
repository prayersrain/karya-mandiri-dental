import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(options = {}) {
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
        )

        const el = ref.current
        if (el) observer.observe(el)
        return () => { if (el) observer.unobserve(el) }
    }, [])

    return { ref, isVisible }
}

export function AnimateOnScroll({ children, className = '', animation = 'fade-up', delay = 0 }) {
    const { ref, isVisible } = useScrollAnimation()

    const animationClasses = {
        'fade-up': 'translate-y-8 opacity-0',
        'fade-down': '-translate-y-8 opacity-0',
        'fade-left': 'translate-x-8 opacity-0',
        'fade-right': '-translate-x-8 opacity-0',
        'zoom-in': 'scale-95 opacity-0',
        'fade': 'opacity-0',
    }

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${className} ${isVisible ? 'translate-y-0 translate-x-0 scale-100 opacity-100' : animationClasses[animation] || animationClasses['fade-up']
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}
