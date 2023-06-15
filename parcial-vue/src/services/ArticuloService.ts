import { URL_API } from "../settings";
import { Articulo } from "../types/Articulo";

export async function findArticuloById(id: number) {
    try {
        const response = await fetch(`${URL_API}/get_articulo.php?id=${id}`, {
            method: "GET"
        });
        
        const data = await response.json() as Articulo;
        return data;
    } catch (error) {
        throw new Error(`ERROR! ${error}`);
    }
}

export async function findArticuloByCodigo(codigo: string) {
    try {
        const response = await fetch(`${URL_API}/get_articulos_por_codigo.php?codigo=${codigo}`, {
            method: "GET"
        });
        
        const data = await response.json() as Articulo[];
        return data;
    } catch (error) {
        throw new Error(`ERROR! ${error}`);
    }
}

export async function findArticuloByRubro(idrubro: number) {
    try {
        const response = await fetch(`${URL_API}/get_articulos_por_rubro.php?idrubro=${idrubro}`, {
            method: "GET"
        });
        
        const data = await response.json() as Articulo[];
        return data;
    } catch (error) {
        throw new Error(`ERROR! ${error}`);
    }
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
        throw new Error(`ERROR! ${error}`);
    }
}

export async function updateArticulo(entity: Articulo) {
    try {
        const response = await fetch(`${URL_API}/put_articulo.php`, {
            method: "PUT",
            body: JSON.stringify(entity)
        });
        
        const data = await response.json() as Articulo;
        return data;
    } catch (error) {
        throw new Error(`ERROR! ${error}`);
    }
}

export async function deleteArticulo(id: number) {
    try {
        await fetch(`${URL_API}/delete_articulo.php?id=${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        throw new Error(`ERROR! ${error}`);
    }
}