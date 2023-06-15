import { Injectable } from '@angular/core';
import { URL_API } from '../settings';
import { Rubro } from 'src/types/Rubro';

@Injectable({
    providedIn: 'root'
})
export class RubroService {

    constructor() { }

    async findAllRubros() {
        try {
            const response = await fetch(`${URL_API}/get_rubros.php`, {
                method: "GET"
            });

            const data = await response.json() as Rubro[];
            return data;
        } catch (error) {
            throw new Error(`ERROR! ${error}`);
        }
    }
}
