import { useState } from "react";

const PASSWORD = "a2262262";

const INITIAL_STOCK = [
  { id: 1, name: "GHK-CU", spec: "50mg", unit: "vial", qty: 5, price: 390 },
  { id: 2, name: "RETA", spec: "10mg", unit: "vial", qty: 6, price: 660 },
  { id: 3, name: "BAC Water", spec: "3ml", unit: "vial", qty: 6, price: 60 },
  { id: 4, name: "Big Vial Holder", spec: "", unit: "piece", qty: 3, price: 220 },
  { id: 5, name: "Small Vial Holder", spec: "", unit: "piece", qty: 6, price: 70 },
];

function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (pw === PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setPw("");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Courier New', monospace",
    }}>
      <div style={{
        background: "#111",
        border: "1px solid #2a2a2a",
        borderRadius: "4px",
        padding: "48px",
        width: "340px",
        textAlign: "center",
      }}>
        <div style={{ color: "#c8a97e", fontSize: "11px", letterSpacing: "4px", marginBottom: "8px" }}>
          TYDES RESEARCH
        </div>
        <div style={{ color: "#fff", fontSize: "18px", fontWeight: "700", marginBottom: "32px", letterSpacing: "1px" }}>
          ADMIN ACCESS
        </div>
        <input
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setError(false); }}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          placeholder="Enter password"
          style={{
            width: "100%",
            background: "#1a1a1a",
            border: error ? "1px solid #e05555" : "1px solid #333",
            borderRadius: "3px",
            color: "#fff",
            padding: "12px 14px",
            fontSize: "14px",
            fontFamily: "'Courier New', monospace",
            outline: "none",
            boxSizing: "border-box",
            marginBottom: "12px",
          }}
        />
        {error && (
          <div style={{ color: "#e05555", fontSize: "12px", marginBottom: "12px" }}>
            Incorrect password
          </div>
        )}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            background: "#c8a97e",
            border: "none",
            borderRadius: "3px",
            color: "#0a0a0a",
            padding: "12px",
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "2px",
            cursor: "pointer",
          }}
        >
          ENTER
        </button>
      </div>
    </div>
  );
}

function StockTab({ stock, setStock }) {
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState("");

  const startEdit = (item) => {
    setEditing(item.id);
    setEditVal(item.qty);
  };

  const saveEdit = (id) => {
    setStock(stock.map(s => s.id === id ? { ...s, qty: parseInt(editVal) || 0 } : s));
    setEditing(null);
  };

  return (
    <div>
      <h2 style={{ color: "#c8a97e", fontSize: "13px", letterSpacing: "3px", marginBottom: "24px" }}>
        STOCK INVENTORY
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #2a2a2a" }}>
            {["Product", "Spec", "Unit", "In Stock", "Price (AED)", "Actions"].map(h => (
              <th key={h} style={{ color: "#555", fontSize: "11px", letterSpacing: "2px", padding: "10px 14px", textAlign: "left", fontWeight: "400" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stock.map(item => (
            <tr key={item.id} style={{ borderBottom: "1px solid #1a1a1a" }}>
              <td style={{ padding: "14px", color: "#fff", fontSize: "14px" }}>{item.name}</td>
              <td style={{ padding: "14px", color: "#888", fontSize: "13px" }}>{item.spec}</td>
              <td style={{ padding: "14px", color: "#888", fontSize: "13px" }}>{item.unit}</td>
              <td style={{ padding: "14px" }}>
                {editing === item.id ? (
                  <input
                    type="number"
                    value={editVal}
                    onChange={e => setEditVal(e.target.value)}
                    style={{
                      width: "60px",
                      background: "#1a1a1a",
                      border: "1px solid #c8a97e",
                      borderRadius: "3px",
                      color: "#fff",
                      padding: "4px 8px",
                      fontSize: "13px",
                      fontFamily: "'Courier New', monospace",
                      outline: "none",
                    }}
                  />
                ) : (
                  <span style={{
                    color: item.qty === 0 ? "#e05555" : item.qty <= 2 ? "#e09a30" : "#5cb85c",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}>
                    {item.qty}
                  </span>
                )}
              </td>
              <td style={{ padding: "14px", color: "#c8a97e", fontSize: "14px" }}>{item.price} AED</td>
              <td style={{ padding: "14px" }}>
                {editing === item.id ? (
                  <button onClick={() => saveEdit(item.id)} style={btnStyle("#5cb85c")}>Save</button>
                ) : (
                  <button onClick={() => startEdit(item)} style={btnStyle("#c8a97e")}>Edit Qty</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuotationTab({ stock }) {
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "", emirate: "", notes: "" });
  const [items, setItems] = useState([{ productId: "", qty: 1 }]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [preview, setPreview] = useState(false);

  const addItem = () => setItems([...items, { productId: "", qty: 1 }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i, field, val) => setItems(items.map((it, idx) => idx === i ? { ...it, [field]: val } : it));

  const getProduct = (id) => stock.find(s => s.id === parseInt(id));

  const lineItems = items.filter(it => it.productId).map(it => {
    const p = getProduct(it.productId);
    return p ? { ...p, qty: it.qty, total: p.price * it.qty } : null;
  }).filter(Boolean);

  const grandTotal = lineItems.reduce((sum, l) => sum + l.total, 0);

  const quotationNumber = `TYD-Q-${Date.now().toString().slice(-6)}`;
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const validUntil = new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

  const handleSend = async () => {
    if (!customer.name || !customer.email || lineItems.length === 0) return;
    setSending(true);

    const quotationHTML = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
body { font-family: Arial, sans-serif; color: #222; margin: 0; padding: 40px; }
.header { border-bottom: 2px solid #c8a97e; padding-bottom: 20px; margin-bottom: 30px; }
.brand { font-size: 22px; font-weight: 700; color: #c8a97e; letter-spacing: 2px; }
.sub { font-size: 11px; color: #888; letter-spacing: 1px; margin-top: 4px; }
.meta { display: flex; justify-content: space-between; margin-bottom: 30px; }
.label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 1px; }
.value { font-size: 14px; color: #222; margin-top: 4px; }
table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
th { background: #f5f0e8; padding: 10px 14px; text-align: left; font-size: 11px; letter-spacing: 1px; color: #888; }
td { padding: 12px 14px; border-bottom: 1px solid #eee; font-size: 14px; }
.total-row { font-weight: 700; font-size: 15px; color: #c8a97e; }
.footer { margin-top: 30px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
</style></head>
<body>
<div class="header">
  <div class="brand">TYDES RESEARCH</div>
  <div class="sub">FOR RESEARCH USE ONLY</div>
</div>
<div style="font-size:20px;font-weight:700;margin-bottom:20px;">QUOTATION</div>
<div class="meta">
  <div>
    <div class="label">Quotation No.</div><div class="value">${quotationNumber}</div>
    <div class="label" style="margin-top:12px;">Date</div><div class="value">${today}</div>
    <div class="label" style="margin-top:12px;">Valid Until</div><div class="value">${validUntil}</div>
  </div>
  <div>
    <div class="label">Customer</div>
    <div class="value">${customer.name}</div>
    <div class="value">${customer.email}</div>
    <div class="value">${customer.phone}</div>
    <div class="value">${customer.address}${customer.emirate ? ", " + customer.emirate : ""}</div>
  </div>
</div>
<table>
  <thead><tr><th>Product</th><th>Unit</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
  <tbody>
    ${lineItems.map(l => `<tr>
      <td>${l.name}${l.spec ? " " + l.spec : ""}</td>
      <td>${l.unit}</td>
      <td>${l.qty}</td>
      <td>${l.price} AED</td>
      <td>${l.total} AED</td>
    </tr>`).join("")}
    <tr class="total-row"><td colspan="4" style="text-align:right;padding-right:14px;">TOTAL</td><td>${grandTotal} AED</td></tr>
  </tbody>
</table>
${customer.notes ? `<div style="margin-bottom:20px;"><div class="label">Notes</div><div class="value" style="margin-top:6px;">${customer.notes}</div></div>` : ""}
<div class="footer">
  This quotation is valid for 7 days from the date above.<br>
  All products are for laboratory/research use only.<br>
  TYDES Research | tyderesearch0@gmail.com | WhatsApp: +971 50 137 0051
</div>
</body></html>`;

    try {
      await fetch("/api/send-quotation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: customer.email,
          customerName: customer.name,
          quotationNumber,
          quotationHTML,
          lineItems,
          grandTotal,
        }),
      });
      setSent(true);
    } catch (e) {
      console.error(e);
    }
    setSending(false);
  };

  if (sent) return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <div style={{ color: "#5cb85c", fontSize: "32px", marginBottom: "16px" }}>✓</div>
      <div style={{ color: "#fff", fontSize: "18px", marginBottom: "8px" }}>Quotation Sent!</div>
      <div style={{ color: "#888", fontSize: "13px", marginBottom: "32px" }}>{quotationNumber} emailed to {customer.email} and TYDES</div>
      <button onClick={() => { setSent(false); setCustomer({ name: "", email: "", phone: "", address: "", emirate: "", notes: "" }); setItems([{ productId: "", qty: 1 }]); }} style={btnStyle("#c8a97e")}>
        New Quotation
      </button>
    </div>
  );

  return (
    <div>
      <h2 style={{ color: "#c8a97e", fontSize: "13px", letterSpacing: "3px", marginBottom: "24px" }}>
        CREATE QUOTATION
      </h2>

      {/* Customer Details */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ color: "#555", fontSize: "11px", letterSpacing: "2px", marginBottom: "14px" }}>CUSTOMER DETAILS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { label: "Full Name *", key: "name" },
            { label: "Email *", key: "email" },
            { label: "Phone", key: "phone" },
            { label: "Emirate", key: "emirate" },
            { label: "Address", key: "address" },
          ].map(f => (
            <div key={f.key} style={f.key === "address" ? { gridColumn: "1 / -1" } : {}}>
              <div style={{ color: "#666", fontSize: "11px", letterSpacing: "1px", marginBottom: "6px" }}>{f.label}</div>
              <input
                value={customer[f.key]}
                onChange={e => setCustomer({ ...customer, [f.key]: e.target.value })}
                style={inputStyle}
              />
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={{ color: "#666", fontSize: "11px", letterSpacing: "1px", marginBottom: "6px" }}>Notes</div>
            <textarea
              value={customer.notes}
              onChange={e => setCustomer({ ...customer, notes: e.target.value })}
              rows={2}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
        </div>
      </div>

      {/* Products */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ color: "#555", fontSize: "11px", letterSpacing: "2px", marginBottom: "14px" }}>PRODUCTS</div>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "10px" }}>
            <select
              value={item.productId}
              onChange={e => updateItem(i, "productId", e.target.value)}
              style={{ ...inputStyle, flex: 2 }}
            >
              <option value="">— Select product —</option>
              {stock.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}{s.spec ? " " + s.spec : ""} — {s.price} AED ({s.qty} in stock)
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={e => updateItem(i, "qty", parseInt(e.target.value) || 1)}
              style={{ ...inputStyle, flex: "0 0 70px", textAlign: "center" }}
            />
            {item.productId && (
              <span style={{ color: "#c8a97e", fontSize: "13px", minWidth: "90px" }}>
                = {(getProduct(item.productId)?.price || 0) * item.qty} AED
              </span>
            )}
            {items.length > 1 && (
              <button onClick={() => removeItem(i)} style={{ background: "none", border: "none", color: "#e05555", cursor: "pointer", fontSize: "18px" }}>×</button>
            )}
          </div>
        ))}
        <button onClick={addItem} style={{ ...btnStyle("#333"), marginTop: "8px", border: "1px solid #333" }}>
          + Add Product
        </button>
      </div>

      {/* Total */}
      {lineItems.length > 0 && (
        <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: "3px", padding: "16px 20px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#888", fontSize: "12px", letterSpacing: "2px" }}>TOTAL</span>
          <span style={{ color: "#c8a97e", fontSize: "20px", fontWeight: "700" }}>{grandTotal} AED</span>
        </div>
      )}

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={handleSend}
          disabled={sending || !customer.name || !customer.email || lineItems.length === 0}
          style={btnStyle("#c8a97e", sending || !customer.name || !customer.email || lineItems.length === 0)}
        >
          {sending ? "Sending..." : "Send Quotation"}
        </button>
      </div>
      <div style={{ color: "#444", fontSize: "11px", marginTop: "12px" }}>
        Will be emailed to customer + tyderesearch0@gmail.com
      </div>
    </div>
  );
}

function InvoiceTab() {
  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <div style={{ fontSize: "32px", marginBottom: "16px" }}>🔒</div>
      <div style={{ color: "#fff", fontSize: "16px", marginBottom: "8px" }}>Invoice System</div>
      <div style={{ color: "#555", fontSize: "13px", maxWidth: "300px", margin: "0 auto" }}>
        This will be activated once your Ziina payment integration is complete. Invoices will be auto-generated after confirmed payments.
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  background: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "3px",
  color: "#fff",
  padding: "10px 12px",
  fontSize: "13px",
  fontFamily: "'Courier New', monospace",
  outline: "none",
  boxSizing: "border-box",
};

const btnStyle = (color, disabled = false) => ({
  background: disabled ? "#1a1a1a" : color,
  border: "none",
  borderRadius: "3px",
  color: disabled ? "#444" : color === "#c8a97e" ? "#0a0a0a" : "#fff",
  padding: "10px 20px",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "1px",
  cursor: disabled ? "not-allowed" : "pointer",
});

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState("stock");
  const [stock, setStock] = useState(INITIAL_STOCK);

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      fontFamily: "'Courier New', monospace",
      color: "#fff",
    }}>
      {/* Top Bar */}
      <div style={{ borderBottom: "1px solid #1a1a1a", padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <span style={{ color: "#c8a97e", fontSize: "13px", letterSpacing: "3px" }}>TYDES RESEARCH</span>
          <span style={{ color: "#333", marginLeft: "12px", fontSize: "11px" }}>ADMIN PANEL</span>
        </div>
        <button onClick={() => setLoggedIn(false)} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "12px", letterSpacing: "1px" }}>
          LOGOUT
        </button>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 57px)" }}>
        {/* Sidebar */}
        <div style={{ width: "180px", borderRight: "1px solid #1a1a1a", padding: "24px 0" }}>
          {[
            { id: "stock", label: "Stock" },
            { id: "quotation", label: "Quotations" },
            { id: "invoice", label: "Invoices" },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: "block",
                width: "100%",
                background: tab === t.id ? "#1a1a1a" : "none",
                border: "none",
                borderLeft: tab === t.id ? "2px solid #c8a97e" : "2px solid transparent",
                color: tab === t.id ? "#c8a97e" : "#555",
                padding: "12px 24px",
                textAlign: "left",
                fontSize: "12px",
                letterSpacing: "2px",
                cursor: "pointer",
              }}
            >
              {t.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "36px 48px" }}>
          {tab === "stock" && <StockTab stock={stock} setStock={setStock} />}
          {tab === "quotation" && <QuotationTab stock={stock} />}
          {tab === "invoice" && <InvoiceTab />}
        </div>
      </div>
    </div>
  );
}
