import { useContext } from "react"
import { SettingsContext } from "../components/SettingsContext";
import Markdown from "react-markdown";

export default function Index() {
    const { settings } = useContext(SettingsContext);
    
    return <>
        <div className="prose dark:prose-invert
            prose-h1:font-bold prose-h1:text-3xl
            prose-h2:font-semibold prose-h2:text-2xl
            prose-h3:font-medium prose-h3:text-xl
            prose-a:text-blue-600">
            <Markdown>{settings?.index_markdown}</Markdown>
        </div>
    </>
}