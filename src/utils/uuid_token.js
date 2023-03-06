import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
export const getUUID = () => {
    let uuid = localStorage.getItem('uuid')
    if (!localStorage.getItem('uuid')) {
        localStorage.setItem('uuid', uuidv4())
    }
    return uuid;
}