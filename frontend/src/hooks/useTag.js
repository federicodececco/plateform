import {fetchData} from "../utilities";

export default function useTag() {

    const api = import.meta.env.VITE_API_URL

    //index dei tags
    async function getTags() {
        const response = await fetchData(`${api}/tags/`)
        return response
    }

    async function getTagDetailById(id) {
        const response = await fetchData(`${api}/tags/${id}`)
        console.log('tags', response);

        return response
    }


    async function getTagDetailByGoogleName(googleName) {
        const response = await fetchData(`${api}/tags/google/${googleName}`)
        console.log('tags', response);

        return response
    }

    async function createTag(value) {
        const response = await fetch(`${api}/tags/create/`, {
            //dichiaro il metodo della richiesta
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });
        //controllo se la risposta è ok
        if (!response.ok) {
            throw new Error("Network response was not ok", response.messageS);
        }

        return response.status
    }

    async function editTag(value) {
        const response = await fetch(`${api}/tags/edit/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok", response.messageS);
        }

        return response.status
    }

    const deleteTag = async (id) => {
        const response = await fetch(`${api}/tags/delete/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error("Error deleting data:", response.message)
        }
        return response
    }

    return [getTags, getTagDetailById, getTagDetailByGoogleName, createTag, editTag, deleteTag]
}