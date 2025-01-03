import { CategoryEdit } from "../../../api/admin-category"
import Input from "../../../components/Input"
import Stack from "../../../components/Stack"
import Textarea from "../../../components/Textarea"

interface IProps {
    category: CategoryEdit
    onChange: (category: CategoryEdit) => void
}

export default function Form({ category, onChange }: IProps) {

    return <Stack>
        <Input label="Name" value={category.name} onChange={e => onChange({ ...category, name: e })}></Input>
        <Textarea label="Description (Markdown)" value={category.description} onChange={e => onChange({ ...category, description: e })}></Textarea>
    </Stack>

}