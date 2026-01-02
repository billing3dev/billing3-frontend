import { createContext } from "react"
import { PublicSettings } from "../api/settings";

export const SettingsContext = createContext<{
    settings: PublicSettings | null
    setSettings: (u: PublicSettings | null) => void
}>({
    settings: null,
    setSettings: (_u) => { }
})
