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

const orders = [
  { id: 1, customer: "John Doe", total: 799, status: "Processing", date: "2023-04-01" },
  { id: 2, customer: "Jane Smith", total: 1299, status: "Shipped", date: "2023-03-29" },
  { id: 3, customer: "Bob Johnson", total: 599, status: "Delivered", date: "2023-03-27" },
  { id: 4, customer: "Alice Brown", total: 899, status: "Processing", date: "2023-04-02" },
]

export default function OrdersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Button>Create Order</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>#{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>
                <Badge variant={order.status === "Delivered" ? "success" : "default"}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

