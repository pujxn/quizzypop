import { v4 as uuidv4 } from "uuid";

const CreateGameBox = () => {
    return (
        <span>{uuidv4()}</span>
    )
}

export default CreateGameBox;