import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteLoader() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        // Turn off loader after 400ms to allow CSS animation to finish
        const timer = setTimeout(() => {
            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    if (!loading) return null;

    // Slim top progress bar inspired by YouTube/GitHub
    return (
        <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none">
            <div className="h-full bg-primary"
                style={{ animation: 'route-loading-bar 0.4s ease-out forwards' }}>
            </div>
            <style>{`
                @keyframes route-loading-bar {
                    0% { width: 0%; opacity: 1; }
                    60% { width: 70%; opacity: 1; }
                    90% { width: 100%; opacity: 0.5; }
                    100% { width: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
}
