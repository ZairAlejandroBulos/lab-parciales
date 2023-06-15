import { Button } from "react-bootstrap";
import { Articulo } from "../types/Articulo";

import ModalArticulo from "./ModalArticulo";
import { useModal } from "../hooks/useModal";
import { deleteArticulo } from "../services/ArticuloService";

function ItemArticulo(props: Articulo): JSX.Element {
    const { showModal, handleClose } = useModal();

    const onDelete = async (id: number) => {
        await deleteArticulo(id);
        window.location.reload();
    };

    return(
        <>
            <tr>
                <td>
                    { props.id }
                </td>
                <td>
                    { props.codigo }
                </td>
                <td>
                    { props.denominacion }
                </td>
                <td>
                    { props.precio }
                </td>
                <td>
                    <Button onClick={handleClose} variant="warning">
                        Editar
                    </Button>
                </td>
                <td>
                    <Button onClick={() => onDelete(props.id)} variant="danger">
                        Eliminar
                    </Button>
                </td>
            </tr>

            <ModalArticulo
                showModal={showModal}
                handleClose={handleClose}
                articulo={props}
            />
        </>
    );
}

export default ItemArticulo;