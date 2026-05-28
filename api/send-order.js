import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { customerName, customerEmail, customerPhone, customerAddress, customerEmirate, cartItems, total } = req.body;

  const itemRows = cartItems.map(item => `
    <tr>
      <td style="padding:10px;border-bottom:1px solid #eee">${item.name}${item.spec ? ' ' + item.spec : ''}</td>
      <td style="padding:10px;border-bottom:1px solid #eee">${item.quantity}</td>
      <td style="padding:10px;border-bottom:1px solid #eee">${item.price} AED</td>
      <td style="padding:10px;border-bottom:1px solid #eee">${item.quantity * item.price} AED</td>
    </tr>`).join('');

  const html = `
    <h2 style="color:#c8a97e">TYDES RESEARCH — New Order</h2>
    <h3>Customer Details</h3>
    <p><b>Name:</b> ${customerName}<br/>
    <b>Email:</b> ${customerEmail}<br/>
    <b>Phone:</b> ${customerPhone}<br/>
    <b>Address:</b> ${customerAddress}, ${customerEmirate}</p>
    <h3>Order Items</h3>
    <table style="width:100%;border-collapse:collapse">
      <thead><tr style="background:#f5f0e8">
        <th style="padding:10px;text-align:left">Product</th>
        <th style="padding:10px;text-align:left">Qty</th>
        <th style="padding:10px;text-align:left">Unit Price</th>
        <th style="padding:10px;text-align:left">Total</th>
      </tr></thead>
      <tbody>${itemRows}</tbody>
    </table>
    <h3 style="color:#c8a97e">TOTAL: ${total} AED</h3>
    <p style="color:#888;font-size:12px">TYDES Research | tyderesearch0@gmail.com | +971 50 137 0051</p>`;

  await resend.emails.send({
    from: 'TYDES Research <onboarding@resend.dev>',
    to: 'tyderesearch0@gmail.com',
    subject: `New Order from ${customerName}`,
    html,
  });

  res.status(200).json({ ok: true });
}
