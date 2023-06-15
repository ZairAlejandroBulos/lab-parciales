import { URL_API } from "../settings";
import { Rubro } from "../types/Rubro";

export async function findAllRubros() {
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