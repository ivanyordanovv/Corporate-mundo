import { useState } from 'react'
import { PaymentModal, PaymentSuccess } from '../components/PaymentModal'

const today = () => new Date().toISOString().slice(0, 10)

// Must match scripts/generate_receipts.py SUBSCRIPTION_ORDERS
const SUBSCRIPTION_ORDERS = [
  { id: 'COOKIES-001', date: today(), items: [{ name: 'Cookies', qty: 1, price: 5 }] },
  { id: 'COOKIES-002', date: today(), items: [{ name: 'Cookies', qty: 1, price: 5 }] },
  { id: 'COOKIES-003', date: today(), items: [{ name: 'Cookies', qty: 1, price: 5 }] },
  { id: 'COOKIES-004', date: today(), items: [{ name: 'Cookies', qty: 1, price: 5 }] },
  { id: 'COOKIES-005', date: today(), items: [{ name: 'Cookies', qty: 1, price: 5 }] },
]

export default function Subscription() {
  const [pendingOrder, setPendingOrder] = useState(null)
  const [successOrder, setSuccessOrder] = useState(null)

  function handleDownloadClick(e, order, total) {
    e.preventDefault()
    setPendingOrder({ order, total })
  }

  function handleConfirm() {
    const { order } = pendingOrder
    const a = document.createElement('a')
    a.href = `${import.meta.env.BASE_URL}receipts/${order.id}.pdf`
    a.download = `${order.id}-invoice.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    setSuccessOrder(order)
    setPendingOrder(null)
  }

  function handleCancel() {
    setPendingOrder(null)
  }

  function handleSuccessClose() {
    setSuccessOrder(null)
  }

  return (
    <div className="subscription">
      {pendingOrder && (
        <PaymentModal
          order={pendingOrder.order}
          total={pendingOrder.total}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {successOrder && (
        <PaymentSuccess order={successOrder} onClose={handleSuccessClose} />
      )}

      <h1 className="subscription__title">Subscription Invoices</h1>
      <p className="subscription__desc">
        Your recurring Cookies subscription invoices are listed below.
      </p>

      <ul className="orders-list">
        {SUBSCRIPTION_ORDERS.map((order) => {
          const total = order.items.reduce((sum, i) => sum + i.qty * i.price, 0)
          return (
            <li key={order.id} className="order-item">
              <div className="order-item__info">
                <span className="order-item__id">Invoice #{order.id}</span>
                <span className="order-item__date">{order.date}</span>
                <ul className="order-item__lines">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} x{item.qty} — ${(item.qty * item.price).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p className="order-item__total">Total: ${total.toFixed(2)}</p>
              </div>
              <a
                href={`${import.meta.env.BASE_URL}receipts/${order.id}.pdf`}
                download={`${order.id}-invoice.pdf`}
                className="order-item__receipt-btn"
                onClick={(e) => handleDownloadClick(e, order, total)}
              >
                Download Invoice
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
