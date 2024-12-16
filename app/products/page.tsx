"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Product = {
  id: number
  name: string
  brand: string
  price: number
  stock: number
}

const initialProducts: Product[] = [
  { id: 1, name: "iPhone 13", brand: "Apple", price: 799, stock: 50 },
  { id: 2, name: "Galaxy S21", brand: "Samsung", price: 699, stock: 30 },
  { id: 3, name: "Pixel 6", brand: "Google", price: 599, stock: 25 },
  { id: 4, name: "OnePlus 9", brand: "OnePlus", price: 729, stock: 40 },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }])
  }

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <ProductForm onSubmit={handleAddProduct} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => setEditingProduct(product)}>
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <ProductForm onSubmit={handleEditProduct} initialData={editingProduct} />
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

type ProductFormProps = {
  onSubmit: (product: Omit<Product, "id">) => void
  initialData?: Product | null
}

function ProductForm({ onSubmit, initialData }: ProductFormProps) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    brand: '',
    price: 0,
    stock: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? Number(value) : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{initialData ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogDescription>
          {initialData ? 'Edit the details of the product.' : 'Add a new product to your inventory.'}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="brand" className="text-right">
            Brand
          </Label>
          <Input
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="stock" className="text-right">
            Stock
          </Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{initialData ? 'Update Product' : 'Add Product'}</Button>
      </DialogFooter>
    </form>
  )
}

