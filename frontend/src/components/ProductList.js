"use client"

import { useState, useEffect } from "react"
import { Table, Button, Modal } from "react-bootstrap"
import axios from "axios"
import ProductForm from "./ProductForm"

function ProductList() {
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/produtos")
      setProducts(response.data)
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowModal(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowModal(true)
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await axios.delete(`http://localhost:3000/produtos/${productId}`)
        fetchProducts()
      } catch (error) {
        console.error("Erro ao excluir produto:", error)
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
  }

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:3000/produtos/${editingProduct.id}`, productData)
      } else {
        await axios.post("http://localhost:3000/produtos", productData)
      }
      fetchProducts()
      handleCloseModal()
    } catch (error) {
      console.error("Erro ao salvar produto:", error)
    }
  }

  return (
    <div className="container mt-5">
      <h1>Listagem de Produtos</h1>
      <Button variant="primary" onClick={handleAddProduct} className="mb-3">
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
                <Button variant="info" onClick={() => handleEditProduct(product)} className="me-2">
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm product={editingProduct} onSave={handleSaveProduct} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ProductList

