import { URL_API } from "../settings";
import { Rubro } from "../types/Rubro";

export async function findAllRubro() {
    const response = await fetch(`${URL_API}/get_rubros.php`, {
        method: "GET"
    });
    const data = await response.json() as Rubro[];
        
    return data;
}