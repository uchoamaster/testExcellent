"use client"

import { useState, useEffect } from "react"
import { Form, Button, Table, Modal } from "react-bootstrap"
import axios from "axios"

function ClientRegistration() {
  const [clients, setClients] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newClient, setNewClient] = useState({ razaoSocial: "", cnpj: "", email: "" })

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3002/clientes")
      setClients(response.data)
    } catch (error) {
      console.error("Erro ao buscar clientes:", error)
    }
  }

  const handleInputChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value })
  }

  const handleCNPJBlur = async () => {
    if (newClient.cnpj.length === 14) {
      try {
        const response = await axios.get(`http://localhost:3002/clientes/cnpj/${newClient.cnpj}`)
        setNewClient({
          razaoSocial: response.data.razaoSocial,
          cnpj: response.data.cnpj,
          email: response.data.email,
        })
      } catch (error) {
        console.error("Erro ao buscar dados do CNPJ:", error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3002/clientes", newClient)
      setShowModal(false)
      setNewClient({ razaoSocial: "", cnpj: "", email: "" })
      fetchClients()
    } catch (error) {
      console.error("Erro ao criar cliente:", error)
    }
  }

  return (
    <div className="container mt-5">
      <h1>Cadastro de Clientes</h1>
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Adicionar Novo Cliente
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Razão Social</th>
            <th>CNPJ</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.razaoSocial}</td>
              <td>{client.cnpj}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control
                type="text"
                name="cnpj"
                value={newClient.cnpj}
                onChange={handleInputChange}
                onBlur={handleCNPJBlur}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Razão Social</Form.Label>
              <Form.Control
                type="text"
                name="razaoSocial"
                value={newClient.razaoSocial}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email" name="email" value={newClient.email} onChange={handleInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ClientRegistration

