import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { Rubro } from "../types/Rubro";
import { Articulo } from "../types/Articulo";
import { findAllRubro } from "../services/RubroService";
import { findArticuloByCodigo, saveArticulo, updateArticulo } from "../services/ArticuloService";

type Props = {
    showModal: boolean,
    handleClose: () => void,
    articulo?: Articulo
}

function ModalArticulo({ showModal, handleClose, articulo }: Props): JSX.Element {
    const [values, setValues] = useState<Articulo>({
        "codigo": "",
        "denominacion": "",
        "precio": 0,
        "idrubro": -1
    });
    const [rubros, setRubros] = useState<Rubro[]>([]);

    useEffect(() => {
        getAllRubro();
    }, []);

    useEffect(() => {
        if (articulo) {
            setValues(articulo);
        }
    }, [articulo]);

    const getAllRubro = async () => {
        const newRubros = await findAllRubro();
        setRubros(newRubros);
    };

    const getArticuloByCodigo = async (codigo: string) => {
        const newArticulo = await findArticuloByCodigo(codigo);
        return newArticulo.length !== 0;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeRubro = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRubroId = Number(event.currentTarget.value);
        if (newRubroId !== -1) {
            setValues((prevState) => ({
                ...prevState,
                idrubro: newRubroId
            }));
        }
    };

    const handleSubmit = async () => {
        const codigoExists = await getArticuloByCodigo(values.codigo);

        if (!codigoExists || articulo?.codigo === values.codigo) { 
            if (values.id) {                 
                await updateArticulo(values);
            } else {
                await saveArticulo(values);
            }

            handleClose();
            window.location.href = "/";
        } else {
            alert(`El código ${values.codigo} ya existe en otro Artículo`);
        }
    };

    return(
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                { 
                    articulo
                    ? 
                    <Modal.Title className="text-center">Editar Artículo</Modal.Title>
                    :
                    <Modal.Title className="text-center">Nuevo Artículo</Modal.Title>
                }
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {
                        articulo 
                        ?
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="atributo">ID</Form.Label>
                            <Form.Control
                                type="number"
                                id="id"
                                name="id"
                                defaultValue={values?.id}
                                readOnly
                                disabled
                            />
                        </Form.Group>
                        :
                        <></>
                    }
                    
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="codigo">Código</Form.Label>
                        <Form.Control
                            type="text"
                            id="codigo"
                            name="codigo"
                            defaultValue={values?.codigo}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="denominacion">Denominación</Form.Label>
                        <Form.Control
                            type="text"
                            id="denominacion"
                            name="denominacion"
                            defaultValue={values?.denominacion}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="precio">Precio</Form.Label>
                        <Form.Control
                            type="number"
                            id="precio"
                            name="precio"
                            defaultValue={values?.precio}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="rubro">Rubro</Form.Label>
                        <Form.Select defaultValue={values.idrubro} onChange={handleChangeRubro}>
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
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="danger buttons-modal-form">
                    Cerrar
                </Button>

                <Button onClick={handleSubmit} variant="success">
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalArticulo;