import Alert from "./Alert"
import Stack from "./Stack"

interface IProps {
    loading?: boolean
    error?: string
}

export default function LoadingError(props: IProps) {
    return <Stack className="w-full">
        {
            props.loading === true && <div>
                <span className="material-symbols-outlined animate-spin text-5xl text-primary">progress_activity</span>
            </div>
        }
        {
            (props.error !== undefined && props.error !== "") && <Alert severity="success">
                {props.error}
            </Alert>
        }


    </Stack>
}