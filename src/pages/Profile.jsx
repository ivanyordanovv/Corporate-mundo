import { useState } from 'react'

// Fixed date for documents/invoices/subscriptions per request
const today = () => '2026-03-03'

// Must match scripts/generate_receipts.py ORDERS
const ORDERS = [
  {
    id: 'MUNDO-001',
    date: today(),
    items: [
      { name: 'Light Snack', qty: 1, price: 299 },
      { name: 'Big Snack', qty: 1, price: 599 },
    ],
  },
  {
    id: 'MUNDO-002',
    date: today(),
    items: [
      { name: 'Executive Suitcase', qty: 1, price: 449 },
      { name: 'Corporate Telephone', qty: 1, price: 199 },
    ],
  },
]

function Dashboard() {
  return (
    <div className="profile-section">
      <h2 className="profile-section__title">Dashboard</h2>
      <p className="profile-section__pending">
        You have <strong>0</strong> pending orders.
      </p>
    </div>
  )
}

function MyOrders() {
  return (
    <div className="profile-section">
      <h2 className="profile-section__title">My Orders</h2>
      <ul className="orders-list">
        {ORDERS.map((order) => {
          const total = order.items.reduce((sum, i) => sum + i.qty * i.price, 0)
          return (
            <li key={order.id} className="order-item">
              <div className="order-item__info">
                <span className="order-item__id">Order #{order.id}</span>
                <span className="order-item__date">{order.date}</span>
                <ul className="order-item__lines">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} ×{item.qty} — ${(item.qty * item.price).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p className="order-item__total">Total: ${total.toFixed(2)}</p>
              </div>
              <a
                href={`${import.meta.env.BASE_URL}receipts/${order.id}.pdf`}
                download={`${order.id}-invoice.pdf`}
                className="order-item__receipt-btn"
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

export default function Profile() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="profile">
      <div className="profile__tabs">
        <button
          type="button"
          className={`profile__tab ${activeTab === 'dashboard' ? 'profile__tab--active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          type="button"
          className={`profile__tab ${activeTab === 'orders' ? 'profile__tab--active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          My Orders
        </button>
      </div>
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'orders' && <MyOrders />}
    </div>
  )
}
