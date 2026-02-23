import { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) return null;

    // Placed slightly higher on the right so it doesn't overlap the WhatsApp button
    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 p-3 bg-slate-600 dark:bg-slate-700 text-white rounded-full shadow-xl hover:bg-primary dark:hover:bg-primary hover:-translate-y-1 transition-all duration-300 print:hidden flex items-center justify-center"
            aria-label="Kembali ke Atas"
        >
            <span className="material-symbols-outlined text-[24px]">keyboard_arrow_up</span>
        </button>
    );
}
