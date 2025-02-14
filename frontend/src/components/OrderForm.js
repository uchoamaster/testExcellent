"use client"

import { useState, useEffect } from "react"
import { Form, Button, Table } from "react-bootstrap"
import axios from "axios"

function OrderForm({ onSave }) {
  const [clients, setClients] = useState([])
  const [products, setProducts] = useState([])
  const [selectedClient, setSelectedClient] = useState("")
  const [selectedProducts, setSelectedProducts] = useState([])

  useEffect(() => {
    fetchClients()
    fetchProducts()
  }, [])

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clientes")
      setClients(response.data)
    } catch (error) {
      console.error("Erro ao buscar clientes:", error)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/produtos")
      setProducts(response.data)
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
    }
  }

  const handleAddProduct = (productId) => {
    const product = products.find((p) => p.id === Number.parseInt(productId))
    if (product) {
      setSelectedProducts([...selectedProducts, { ...product, quantidade: 1 }])
    }
  }

  const handleQuantityChange = (index, quantity) => {
    const updatedProducts = [...selectedProducts]
    updatedProducts[index].quantidade = Number.parseInt(quantity)
    setSelectedProducts(updatedProducts)
  }

  const handleRemoveProduct = (index) => {
    const updatedProducts = selectedProducts.filter((_, i) => i !== index)
    setSelectedProducts(updatedProducts)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const orderData = {
      clienteId: Number.parseInt(selectedClient),
      produtos: selectedProducts.map((p) => ({ id: p.id, quantidade: p.quantidade })),
    }
    onSave(orderData)
  }

  const calculateTotal = () => {
    return selectedProducts.reduce((total, p) => total + p.valorVenda * p.quantidade, 0)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Cliente</Form.Label>
        <Form.Select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} required>
          <option value="">Selecione um cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.razaoSocial}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Adicionar Produto</Form.Label>
        <Form.Select onChange={(e) => handleAddProduct(e.target.value)}>
          <option value="">Selecione um produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.descricao}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Subtotal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.descricao}</td>
              <td>
                <Form.Control
                  type="number"
                  min="1"
                  value={product.quantidade}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </td>
              <td>R$ {product.valorVenda.toFixed(2)}</td>
              <td>R$ {(product.valorVenda * product.quantidade).toFixed(2)}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemoveProduct(index)}>
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end">
              <strong>Total:</strong>
            </td>
            <td colSpan="2">
              <strong>R$ {calculateTotal().toFixed(2)}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>

      <Button variant="primary" type="submit">
        Salvar Pedido
      </Button>
    </Form>
  )
}

export default OrderForm

