
export const create = async (product) => {
    const response = await fetch("http://127.0.0.1:8000/product/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    const result = await response.json();
    return result;
}

export const listAll = async () => {
    const response = await fetch("http://127.0.0.1:8000/products/");
    const result = await response.json();
    return result;
}

export const remove = async (id) => {
    await fetch(`http://127.0.0.1:8000/product/${id}`, {
        method: "DELETE"
    });
}