"use client"

import { useState, useEffect } from "react"
import { Table, Button, Modal } from "react-bootstrap"
import axios from "axios"
import OrderForm from "./OrderForm"

function OrderList() {
  const [orders, setOrders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/pedidos")
      setOrders(response.data)
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error)
    }
  }

  const handleAddOrder = () => {
    setSelectedOrder(null)
    setShowModal(true)
  }

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Tem certeza que deseja excluir este pedido?")) {
      try {
        await axios.delete(`http://localhost:3000/pedidos/${orderId}`)
        fetchOrders()
      } catch (error) {
        console.error("Erro ao excluir pedido:", error)
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedOrder(null)
  }

  const handleSaveOrder = async (orderData) => {
    try {
      if (selectedOrder) {
        await axios.put(`http://localhost:3000/pedidos/${selectedOrder.id}`, orderData)
      } else {
        await axios.post("http://localhost:3000/pedidos", orderData)
      }
      fetchOrders()
      handleCloseModal()
    } catch (error) {
      console.error("Erro ao salvar pedido:", error)
    }
  }

  return (
    <div className="container mt-5">
      <h1>Listagem de Pedidos</h1>
      <Button variant="primary" onClick={handleAddOrder} className="mb-3">
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
                <Button variant="danger" onClick={() => handleDeleteOrder(order.id)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Novo Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderForm onSave={handleSaveOrder} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default OrderList

