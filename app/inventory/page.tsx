"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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

type InventoryItem = {
  id: number
  product: string
  quantity: number
  location: string
  lowStockThreshold: number
}

const initialInventory: InventoryItem[] = [
  { id: 1, product: "iPhone 13", quantity: 50, location: "Warehouse A", lowStockThreshold: 10 },
  { id: 2, product: "Galaxy S21", quantity: 30, location: "Warehouse B", lowStockThreshold: 15 },
  { id: 3, product: "Pixel 6", quantity: 5, location: "Warehouse A", lowStockThreshold: 10 },
  { id: 4, product: "OnePlus 9", quantity: 40, location: "Warehouse C", lowStockThreshold: 20 },
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      setInventory(prev => prev.map(item => ({
        ...item,
        quantity: Math.max(0, item.quantity + Math.floor(Math.random() * 3) - 1)
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleUpdateStock = (updatedItem: InventoryItem) => {
    setInventory(inventory.map(item => item.id === updatedItem.id ? updatedItem : item))
    setEditingItem(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Location</TableHead> 
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>
                {item.quantity <= item.lowStockThreshold ? (
                  <Badge variant="destructive">Low Stock</Badge>
                ) : (
                  <Badge variant="secondary">In Stock</Badge>
                )}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setEditingItem(item)}>
                      Update Stock
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <InventoryForm onSubmit={handleUpdateStock} initialData={editingItem} />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

type InventoryFormProps = {
  onSubmit: (item: InventoryItem) => void
  initialData: InventoryItem | null
}

function InventoryForm({ onSubmit, initialData }: InventoryFormProps) {
  const [formData, setFormData] = useState(initialData || {
    id: 0,
    product: '',
    quantity: 0,
    location: '',
    lowStockThreshold: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === 'quantity' || name === 'lowStockThreshold' ? Number(value) : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Update Inventory</DialogTitle>
        <DialogDescription>
          Update the stock quantity for this product.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quantity" className="text-right">
            Quantity
          </Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="lowStockThreshold" className="text-right">
            Low Stock Threshold
          </Label>
          <Input
            id="lowStockThreshold"
            name="lowStockThreshold"
            type="number"
            value={formData.lowStockThreshold}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Update Stock</Button>
      </DialogFooter>
    </form>
  )
}

