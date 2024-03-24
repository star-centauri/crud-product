import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { create } from "../../repository/product";

export default function Cadastro() {
    let navigate = useNavigate();
    const [alert, setAlert] = useState({
        show: false,
        variant: "",
        msg: ""
    });
    const [form, setForm] = useState({
        name: "",
        price: 0,
        availableSale: "true",
        description: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        createProduct(form);
    }

    const handleChange = (event, key) => {
        const value = event.target.value;

        setForm({
            ...form,
            [key]: value
        });
    }

    async function createProduct (form) {
        try {
            let result = create(form);
            console.log(result);
            return navigate("/listagem");
        } catch (error) {
            setAlert({
                show: true,
                variant: "danger",
                msg: error
            });
        }
    }

    return (
        <>
            { alert.show &&
                <Alert key={alert.variant} variant={alert.variant} onClose={() => setAlert({...alert, show: false})} dismissible>
                    {alert.msg}
                </Alert>
            }

            <h2>Cadastro de Produto</h2>
            <p> <span className="custom-required">(*)</span> campo obrigatório </p>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nome: <span className="custom-required">*</span></Form.Label>
                    <Form.Control 
                        autoFocus={true}
                        type="text" 
                        placeholder="Nome..." 
                        required 
                        value={form.name} 
                        onChange={ (event) => handleChange(event, 'name') } 
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="formPrice">
                        <Form.Label>Preço: <span className="custom-required">*</span></Form.Label>
                        <Form.Control 
                            required 
                            type="number" 
                            min="0" 
                            value={form.price}
                            onChange={ (event) => handleChange(event, 'price') } 
                            step=".01" 
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Disponível para venda? <span className="custom-required">*</span></Form.Label>
                        <div key="inline-radio" className="mb-3">
                            <Form.Check
                                inline
                                type="radio"
                                label="Sim"
                                name="sim"
                                value="true"
                                onChange={(event) => handleChange(event, 'availableSale')}
                                checked={form.availableSale === "true"}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Não"
                                name="nao"
                                value="false"
                                onChange={(event) => handleChange(event, 'availableSale')}
                                checked={form.availableSale === "false"}
                            />
                        </div>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Descrição:</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        value={form.description}
                        onChange={ (event) => handleChange(event, 'description') } 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Cadastrar</Button>
            </Form>
        </>
    );
}