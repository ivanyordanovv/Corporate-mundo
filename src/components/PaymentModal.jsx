export function PaymentModal({ order, total, onConfirm, onCancel }) {
  return (
    <div className="pay-overlay" role="dialog" aria-modal="true" aria-labelledby="pay-modal-title">
      <div className="pay-modal">
        <div className="pay-modal__header">
          <span className="pay-modal__lock">🔒</span>
          <h2 id="pay-modal-title" className="pay-modal__title">Secure Payment Required</h2>
          <span className="pay-modal__badge">PCI-DSS Verified</span>
        </div>

        <p className="pay-modal__notice">
          In order to download invoice <strong>{order.id}</strong>, the full outstanding balance
          must be settled. Your download will begin immediately after payment is processed.
        </p>

        <div className="pay-modal__amount-box">
          <span className="pay-modal__amount-label">Amount due</span>
          <span className="pay-modal__amount-value">${total.toFixed(2)}</span>
        </div>

        <div className="pay-modal__card-row">
          <div className="pay-modal__card-field">
            <label className="pay-modal__card-label">Card number</label>
            <input
              className="pay-modal__card-input"
              type="text"
              placeholder="•••• •••• •••• ••••"
              maxLength={19}
              readOnly
            />
          </div>
          <div className="pay-modal__card-field pay-modal__card-field--half">
            <label className="pay-modal__card-label">Expiry</label>
            <input className="pay-modal__card-input" type="text" placeholder="MM / YY" readOnly />
          </div>
          <div className="pay-modal__card-field pay-modal__card-field--half">
            <label className="pay-modal__card-label">CVV</label>
            <input className="pay-modal__card-input" type="text" placeholder="•••" readOnly />
          </div>
        </div>

        <p className="pay-modal__card-note">
          Card on file: Visa ending in 4242 &nbsp;·&nbsp; Expires 12/26
        </p>

        <button type="button" className="pay-modal__pay-btn" onClick={onConfirm}>
          Pay ${total.toFixed(2)} &amp; Download Invoice
        </button>

        <button type="button" className="pay-modal__cancel-btn" onClick={onCancel}>
          cancel
        </button>
      </div>
    </div>
  )
}

export function PaymentSuccess({ order, onClose }) {
  return (
    <div className="pay-overlay" role="dialog" aria-modal="true" aria-labelledby="pay-success-title">
      <div className="pay-modal pay-modal--success">
        <div className="pay-success__icon">✓</div>
        <h2 id="pay-success-title" className="pay-success__title">Payment Successful!</h2>
        <p className="pay-success__sub">Invoice {order.id} has been downloaded.</p>
        <p className="pay-success__detail">
          A payment confirmation has been sent to your registered email address.
        </p>
        <button type="button" className="pay-modal__pay-btn" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  )
}
