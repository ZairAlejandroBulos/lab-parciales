import { Injectable } from '@angular/core';
import { URL_API } from '../settings';
import { Articulo } from 'src/types/Articulo';

@Injectable({
    providedIn: 'root'
})
export class ArticuloService {

    constructor() {}

    async findArticuloById(id: number) {
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

    async findArticuloByCodigo(codigo: string) {
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

    async findArticuloByRubro(idrubro: number) {
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

    async saveArticulo(entity: Articulo) {
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

    async updateArticulo(entity: Articulo) {
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

    async deleteArticulo(id: number) {
        try {
            await fetch(`${URL_API}/delete_articulo.php?id=${id}`, {
                method: "DELETE",
            });
        } catch (error) {
            throw new Error(`ERROR! ${error}`);
        }
    }
}
