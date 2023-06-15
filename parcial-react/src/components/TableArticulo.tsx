import { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

import { Rubro } from "../types/Rubro";
import { Articulo } from "../types/Articulo";
import ItemArticulo from "./ItemArticulo";
import ModalArticulo from "./ModalArticulo";
import { useModal } from "../hooks/useModal";
import { findArticuloByRubro } from "../services/ArticuloService";
import { findAllRubro } from "../services/RubroService";

function TableArticulo(): JSX.Element {
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const [rubroId, setRubroId] = useState<number>(-1);
    const { showModal, handleClose } = useModal();

    useEffect(() => {
        getAllRubro();
    }, []);

    useEffect(() => {
        getArticuloByRubro();
    }, [rubroId]);

    const getAllRubro = async () => {
        const newRubros = await findAllRubro();
        setRubros(newRubros);
    };

    const getArticuloByRubro = async () => {
        if (rubroId !== -1) {
            const newArticulos = await findArticuloByRubro(rubroId);
            setArticulos(newArticulos);
        }
    };

    const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRubroId = Number(event.currentTarget.value);
        if (newRubroId !== -1) {
            setRubroId(newRubroId);
        }
    };

    return(
        <>
            <Container className="mt-3 mb-3 d-flex">
                <Form.Label>Rubro</Form.Label>
                <Form.Select value={rubroId} onChange={handleChange}>
                    <option value="-1">
                        --Seleccione--
                    </option>
                    {
                        rubros.map((item: Rubro, index: number) =>
                            <option key={index} value={item.id}>
                                { item.denominacion }
                            </option>
                        )
                    }
                </Form.Select>
            </Container>

            <Container className="mt-3 mb-3">
                <Button onClick={handleClose} variant="success">
                    Nuevo
                </Button>
            </Container>

            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>CÓDIGO</th>
                            <th>DENOMINACIÓN</th>
                            <th>PRECIO</th>
                            <th colSpan={2}>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articulos.map((item: Articulo, index: number) => 
                                <ItemArticulo key={index} {...item} />
                            )
                        }
                    </tbody>
                </Table>
            </Container>

            <ModalArticulo 
                showModal={showModal}
                handleClose={handleClose}
            />
        </>
    );
}

export default TableArticulo;