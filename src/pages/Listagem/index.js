import { useEffect, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { BsFillTrash3Fill } from "react-icons/bs";
import ReactLoading from 'react-loading';

import { listAll, remove } from "../../repository/product";

import '../../App.css';

export default function Listagem() {
    const navigate = useNavigate();
    const location = useLocation();

    const [alert, setAlert] = useState({
        show: false,
        variant: "",
        msg: ""
    });
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    async function GetProducts() {
        try {
            let result = await listAll();
            console.log(result);
            setProducts(result);
        } catch (error) {
            setAlert({
                show: true,
                variant: "danger",
                msg: error
            });
        }
    }

    async function removeProduct(id) {
        setLoading(true);
        try {
            await remove(id);

            setProducts( products.filter(product => product.id != id) );

            setAlert({
                show: true,
                variant: "success",
                msg: "Produto excluído com sucesso!"
            });
        } catch (error) {
            setAlert({
                show: true,
                variant: "danger",
                msg: error
            });
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        GetProducts();
    }, [location]);

    return (
        <>
            { loading &&
                <ReactLoading type="spin" color="red" height={'10%'} width={'10%'} className="custom-loading" />
            }

            { alert.show &&
                <Alert key={alert.variant} variant={alert.variant} onClose={() => setAlert({...alert, show: false})} dismissible>
                    {alert.msg}
                </Alert>
            }

            <h2>Listagem dos produtos</h2>

            <Button 
                variant="primary"
                onClick={() => navigate("/cadastro")} 
            >
                Adicionar produto
            </Button>

            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">Nome</th>
                        <th className="text-center">Descrição</th>
                        <th className="text-center">Preço</th>
                        <th className="text-center">Disponível venda</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products 
                        ? products
                        .sort((numOne, numTwo) => numOne.price - numTwo.price)
                        .map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>R$ {product.price}</td>
                                <td>{product.availableSale ? "Sim" : "Não"}</td>
                                <td>
                                    <Button 
                                        title="Excluir item"
                                        disabled={loading}
                                        onClick={() => removeProduct(product.id)}
                                    > 
                                        {
                                            loading ? "..." : <BsFillTrash3Fill />
                                        }
                                    </Button>
                                </td>
                            </tr>
                        ))
                        : <td colSpan={5}>Sem produtos</td>
                    }
                </tbody>
            </Table>
        </>
    );
}