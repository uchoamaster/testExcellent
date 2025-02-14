"use client"

import { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"

function ProductForm({ product, onSave }) {
  const [formData, setFormData] = useState({
    descricao: "",
    valorVenda: "",
    estoque: "",
    imagens: [],
  })

  useEffect(() => {
    if (product) {
      setFormData({
        descricao: product.descricao,
        valorVenda: product.valorVenda,
        estoque: product.estoque,
        imagens: product.imagens || [],
      })
    }
  }, [product])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData({ ...formData, imagens: [...formData.imagens, ...files] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const productData = new FormData()
    for (const key in formData) {
      if (key === "imagens") {
        formData[key].forEach((image) => {
          productData.append("imagens", image)
        })
      } else {
        productData.append(key, formData[key])
      }
    }
    onSave(productData)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Descrição</Form.Label>
        <Form.Control type="text" name="descricao" value={formData.descricao} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Valor de Venda</Form.Label>
        <Form.Control
          type="number"
          name="valorVenda"
          value={formData.valorVenda}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Estoque</Form.Label>
        <Form.Control type="number" name="estoque" value={formData.estoque} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Imagens</Form.Label>
        <Form.Control type="file" multiple onChange={handleImageUpload} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Salvar
      </Button>
    </Form>
  )
}

export default ProductForm

