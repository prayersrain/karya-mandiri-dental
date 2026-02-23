import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const SettingsContext = createContext({});

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);

    const loadSettings = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('site_settings')
            .select('*');

        if (!error && data) {
            // Convert array of rows [{id: 'home_hero', image_url: '...'}] to object {home_hero: '...'}
            const settingsObj = data.reduce((acc, curr) => {
                acc[curr.id] = curr.image_url;
                return acc;
            }, {});
            setSettings(settingsObj);
        } else {
            console.error("Error loading settings:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadSettings();
    }, []);

    // Also export a method to refresh config when Admin makes changes
    return (
        <SettingsContext.Provider value={{ settings, loadingSettings: loading, refreshSettings: loadSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}
