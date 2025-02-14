"use client"

import { useState, useEffect } from "react"
import { Table, Button, Modal, Form, Image } from "react-bootstrap"
import axios from "axios"

function ProductManagement() {
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState("add")
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    descricao: "",
    valorVenda: "",
    estoque: "",
    imagens: [],
  })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/produtos")
      setProducts(response.data)
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentProduct({ ...currentProduct, [name]: value })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setCurrentProduct({ ...currentProduct, imagens: [...currentProduct.imagens, ...files] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    for (const key in currentProduct) {
      if (key === "imagens") {
        currentProduct[key].forEach((image, index) => {
          formData.append(`imagens`, image)
        })
      } else {
        formData.append(key, currentProduct[key])
      }
    }

    try {
      if (modalMode === "add") {
        await axios.post("http://localhost:3001/produtos", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      } else {
        await axios.put(`http://localhost:3001/produtos/${currentProduct.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      }
      fetchProducts()
      setShowModal(false)
    } catch (error) {
      console.error("Erro ao salvar produto:", error)
    }
  }

  const handleDelete = (product) => {
    setProductToDelete(product)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/produtos/${productToDelete.id}`)
      fetchProducts()
      setShowDeleteModal(false)
    } catch (error) {
      console.error("Erro ao excluir produto:", error)
    }
  }

  const openModal = (mode, product = null) => {
    setModalMode(mode)
    setCurrentProduct(product || { id: "", descricao: "", valorVenda: "", estoque: "", imagens: [] })
    setShowModal(true)
  }

  return (
    <div className="container mt-5">
      <h1>Gerenciamento de Produtos</h1>
      <Button variant="primary" onClick={() => openModal("add")} className="mb-3">
        Adicionar Novo Produto
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Valor de Venda</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.descricao}</td>
              <td>R$ {product.valorVenda.toFixed(2)}</td>
              <td>{product.estoque}</td>
              <td>
                <Button variant="info" onClick={() => openModal("edit", product)} className="me-2">
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(product)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === "add" ? "Adicionar Novo Produto" : "Editar Produto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                name="descricao"
                value={currentProduct.descricao}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor de Venda</Form.Label>
              <Form.Control
                type="number"
                name="valorVenda"
                value={currentProduct.valorVenda}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estoque</Form.Label>
              <Form.Control
                type="number"
                name="estoque"
                value={currentProduct.estoque}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagens</Form.Label>
              <Form.Control type="file" multiple onChange={handleImageUpload} />
            </Form.Group>
            {currentProduct.imagens.length > 0 && (
              <div className="mb-3">
                <h5>Imagens atuais:</h5>
                <div className="d-flex flex-wrap">
                  {currentProduct.imagens.map((image, index) => (
                    <Image
                      key={index}
                      src={image instanceof File ? URL.createObjectURL(image) : image}
                      alt={`Produto ${index + 1}`}
                      thumbnail
                      className="me-2 mb-2"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  ))}
                </div>
              </div>
            )}
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir o produto "{productToDelete?.descricao}"?</Modal.Body>
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

export default ProductManagement

