import { URL_API } from "../settings";
import { Articulo } from "../types/Articulo";

export async function findArticuloById(id: number) {
    const response = await fetch(`${URL_API}/get_articulo.php?id=${id}`, {
        method: "GET"
    });
    const data = await response.json() as Articulo;
        
    return data;
}

export async function findArticuloByRubro(id: number) {
    const response = await fetch(`${URL_API}/get_articulos_por_rubro.php?idrubro=${id}`, {
        method: "GET"
    });
    const data = await response.json() as Articulo[];
        
    return data;
}

export async function findArticuloByCodigo(codigo: string) {
    const response = await fetch(`${URL_API}/get_articulos_por_codigo.php?codigo=${codigo}`, {
        method: "GET"
    });
    const data = await response.json() as Articulo[];
    return data;
}

export async function saveArticulo(entity: Articulo) {
    try {
        const response = await fetch(`${URL_API}/post_articulo.php`, {
            method: "POST",
            body: JSON.stringify(entity)
        });
        const data = await response.json() as Articulo;
        
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateArticulo(entity: Articulo) {
    try {
        const response = await fetch(`${URL_API}/put_articulo.php`, {
            method: "PUT",
            body: JSON.stringify(entity)
        });
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteArticulo(id: number) {
    await fetch(`${URL_API}/delete_articulo.php?id=${id}`, {
        method: "DELETE",
    });
}