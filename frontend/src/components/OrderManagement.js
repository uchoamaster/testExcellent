"use client"

import { useState, useEffect } from "react"
import { Table, Button, Modal, Form } from "react-bootstrap"
import axios from "axios"

function OrderManagement() {
  const [orders, setOrders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentOrder, setCurrentOrder] = useState({ clienteId: "", produtos: [] })
  const [clients, setClients] = useState([])
  const [products, setProducts] = useState([])
  const [orderToDelete, setOrderToDelete] = useState(null)

  useEffect(() => {
    fetchOrders()
    fetchClients()
    fetchProducts()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pedidos")
      setOrders(response.data)
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error)
    }
  }

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3001/clientes")
      setClients(response.data)
    } catch (error) {
      console.error("Erro ao buscar clientes:", error)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/produtos")
      setProducts(response.data)
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
    }
  }

  const handleInputChange = (e) => {
    setCurrentOrder({ ...currentOrder, [e.target.name]: e.target.value })
  }

  const handleProductChange = (e, index) => {
    const updatedProducts = [...currentOrder.produtos]
    updatedProducts[index] = {
      ...updatedProducts[index],
      [e.target.name]: e.target.value,
    }
    setCurrentOrder({ ...currentOrder, produtos: updatedProducts })
  }

  const addProduct = () => {
    setCurrentOrder({
      ...currentOrder,
      produtos: [...currentOrder.produtos, { produtoId: "", quantidade: 1 }],
    })
  }

  const removeProduct = (index) => {
    const updatedProducts = currentOrder.produtos.filter((_, i) => i !== index)
    setCurrentOrder({ ...currentOrder, produtos: updatedProducts })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3001/pedidos", currentOrder)
      fetchOrders()
      setShowModal(false)
      setCurrentOrder({ clienteId: "", produtos: [] })
    } catch (error) {
      console.error("Erro ao criar pedido:", error)
    }
  }

  const handleDelete = (order) => {
    setOrderToDelete(order)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/pedidos/${orderToDelete.id}`)
      fetchOrders()
      setShowDeleteModal(false)
    } catch (error) {
      console.error("Erro ao excluir pedido:", error)
    }
  }

  return (
    <div className="container mt-5">
      <h1>Gerenciamento de Pedidos</h1>
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Criar Novo Pedido
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.cliente.razaoSocial}</td>
              <td>R$ {order.total.toFixed(2)}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(order)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Criar Novo Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Select name="clienteId" value={currentOrder.clienteId} onChange={handleInputChange} required>
                <option value="">Selecione um cliente</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.razaoSocial}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <h5>Produtos</h5>
            {currentOrder.produtos.map((produto, index) => (
              <div key={index} className="mb-3 border p-3">
                <Form.Group className="mb-3">
                  <Form.Label>Produto</Form.Label>
                  <Form.Select
                    name="produtoId"
                    value={produto.produtoId}
                    onChange={(e) => handleProductChange(e, index)}
                    required
                  >
                    <option value="">Selecione um produto</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.descricao}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantidade"
                    value={produto.quantidade}
                    onChange={(e) => handleProductChange(e, index)}
                    required
                    min="1"
                  />
                </Form.Group>
                <Button variant="danger" onClick={() => removeProduct(index)}>
                  Remover Produto
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={addProduct} className="mb-3">
              Adicionar Produto
            </Button>
            <div>
              <Button variant="primary" type="submit">
                Salvar Pedido
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir o pedido #{orderToDelete?.id}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default OrderManagement

