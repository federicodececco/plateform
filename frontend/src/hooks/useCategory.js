import {fetchData} from "../utilities";

export default function useCategory() {
    const api = import.meta.env.VITE_API_URL

    //index dei Categorys
    async function getCategory() {
        const response = await fetchData(`${api}/categories/`)
        return response
    }

    async function getCategoryDetailById(id) {
        const response = await fetchData(`${api}/categories/${id}`)
        console.log('categories', response);

        return response
    }


    async function getCategoryDetailByGoogleName(googleName) {
        const response = await fetchData(`${api}/categories/google/${googleName}`)
        console.log('categories', response);

        return response
    }

    async function createCategory(value) {
        const response = await fetch(`${api}/categories/create/`, {
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

    async function editCategory(value) {
        const response = await fetch(`${api}/categories/edit/`, {
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

    const deleteCategory = async (id) => {
        const response = await fetch(`${api}/categories/delete/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error("Error deleting data:", response.message)
        }
        return response
    }

    return [getCategory, getCategoryDetailById, getCategoryDetailByGoogleName, createCategory, editCategory, deleteCategory]
}