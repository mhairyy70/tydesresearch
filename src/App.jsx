import { useEffect, useMemo, useState } from "react";
import AdminPanel from "./pages/AdminPanel";
import summerPackImg from "./assets/summer-pack.png";
import ghkPackagingImg from "./assets/ghk-packaging.png";
import {
  ShoppingBag,
  Menu,
  X,
  ShieldCheck,
  Trash2,
  Plus,
  Minus,
  FlaskConical,
  PackageCheck,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Lock,
} from "lucide-react";

const DISCLAIMER =
  "For laboratory research use only. Not for human consumption. Not intended to diagnose, treat, cure, or prevent any disease.";

const WHATSAPP_NUMBER = "971501370051";
const CONTACT_EMAIL = "tyderesearch0@gmail.com";

const products = [
  {
    id: "reta",
    name: "RETA 10MG",
    category: "Research Compound",
    price: 658,
    oldPrice: 699,
    image: "/images/reta.png",
    text: "Research-use-only lyophilized compound. No human-use claims.",
    inStock: true,
  },
  {
    id: "ghk",
    name: "GHK-CU 50MG",
    category: "Research Compound",
    price: 392,
    oldPrice: 419,
    image: "/images/ghk-cu.png",
    text: "Research-use-only compound. No cosmetic or human-use claims.",
    inStock: true,
  },
  {
    id: "bac",
    name: "BAC WATER 3ML",
    category: "Research Support Item",
    price: 56,
    oldPrice: 63,
    image: "/images/bac-water.png",
    text: "Sterile laboratory solvent support item for research workflows only.",
    inStock: true,
  },
  {
    id: "holder",
    name: "TYDES 3-Vial Holder Box",
    category: "Accessory",
    price: 125,
    oldPrice: null,
    image: "",
    text: "Compact TYDES-branded holder for organizing 3ml and 5ml research vials.",
    inStock: true,
  },
  {
    id: "bundle",
    name: "Summer Pack Bundle",
    category: "Bundle",
    price: 1119,
    oldPrice: 1189,
    image: summerPackImg,
    text: "Includes RETA 10MG, GHK-CU 50MG, BAC Water 3ML, and Big Vial Holder.",
    inStock: true,
  },
];

function WaveLogo({ className = "h-6 w-16" }) {
  return (
    <svg
      viewBox="0 0 320 110"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TYDES wave logo"
    >
      <path
        d="M18 63C74 28 127 35 181 62C228 85 270 69 302 18C263 98 203 110 143 78C94 52 55 45 18 63Z"
        fill="currentColor"
      />
      <path
        d="M37 75C88 55 126 66 173 90C218 113 253 99 277 84C228 114 185 118 136 94C95 74 66 66 37 75Z"
        fill="currentColor"
      />
    </svg>
  );
}

function createWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function AgeResearchPopup({ accepted, setAccepted }) {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [researchConfirmed, setResearchConfirmed] = useState(false);

  if (accepted) return null;

  const canEnter = ageConfirmed && researchConfirmed;

  return (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-[#020d20]/95 px-5 backdrop-blur-xl">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#03142d] p-7 shadow-2xl shadow-black/40">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-20 place-items-center rounded-2xl bg-white/10">
            <WaveLogo className="h-6 w-16 text-white" />
          </div>

          <div>
            <p className="tracking-[0.45em] text-white">TYDES</p>
            <p className="text-xs uppercase tracking-[0.25em] text-blue-100/60">
              Research
            </p>
          </div>
        </div>

        <h1 className="mt-8 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
          Research-Use Access Confirmation
        </h1>

        <p className="mt-4 leading-7 text-blue-100/70">
          Before entering TYDES Research, please confirm that you meet the access
          requirements and understand the research-only nature of the products.
        </p>

        <div className="mt-6 grid gap-4">
          <label className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-blue-50/90">
            <input
              type="checkbox"
              checked={ageConfirmed}
              onChange={(event) => setAgeConfirmed(event.target.checked)}
              className="mt-1 h-4 w-4 accent-blue-200"
            />
            <span>I confirm that I am 21 years of age or older.</span>
          </label>

          <label className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-blue-50/90">
            <input
              type="checkbox"
              checked={researchConfirmed}
              onChange={(event) => setResearchConfirmed(event.target.checked)}
              className="mt-1 h-4 w-4 accent-blue-200"
            />
            <span>
              I understand that TYDES products are for laboratory research use
              only, not for human consumption, and are not intended to diagnose,
              treat, cure, or prevent any disease.
            </span>
          </label>
        </div>

        <p className="mt-5 rounded-2xl bg-blue-300/10 p-4 text-xs leading-5 text-blue-100/60">
          {DISCLAIMER}
        </p>

        <button
          disabled={!canEnter}
          onClick={() => setAccepted(true)}
          className="mt-6 w-full rounded-full bg-white px-7 py-4 font-semibold text-[#03142d] transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          Enter TYDES Research
        </button>
      </div>
    </div>
  );
}

function App() {
  if (window.location.pathname === "/admin-tydes") return <AdminPanel />;

  const [acceptedPopup, setAcceptedPopup] = useState(false);
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [liveProducts, setLiveProducts] = useState(products);

  useEffect(() => {
    const STOCK_MAP = { "GHK-CU": "ghk", "RETA": "reta", "BAC Water": "bac", "Big Vial Holder": "holder" };
    const BUNDLE_COMPONENTS = ["RETA", "GHK-CU", "BAC Water", "Big Vial Holder"];
    fetch("/api/get-stock")
      .then((r) => r.json())
      .then((data) => {
        const bundleInStock = BUNDLE_COMPONENTS.every((name) => {
          const item = data.find((s) => s.name === name);
          return item ? item.qty > 0 : true;
        });
        setLiveProducts(
          products.map((p) => {
            if (p.id === "bundle") return { ...p, inStock: bundleInStock };
            const stockName = Object.keys(STOCK_MAP).find((k) => STOCK_MAP[k] === p.id);
            if (!stockName) return p;
            const item = data.find((s) => s.name === stockName);
            return item ? { ...p, inStock: item.qty > 0 } : p;
          })
        );
      })
      .catch(console.error);
  }, []);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }, [cart]);

  useEffect(() => {
    async function confirmReturnedPayment() {
      const params = new URLSearchParams(window.location.search);
      const payment = params.get("payment");
      const paymentIntentId = params.get("payment_intent_id");

      if (payment === "cancelled") {
        setPaymentStatus("Payment was cancelled. You can try checkout again.");
        window.history.replaceState({}, "", "/");
        return;
      }

      if (payment === "failed") {
        setPaymentStatus("Payment failed. Please try again or contact TYDES Research.");
        window.history.replaceState({}, "", "/");
        return;
      }

      if (payment !== "success" || !paymentIntentId) return;

      const savedOrder = sessionStorage.getItem(`tydes_order_${paymentIntentId}`);

      if (!savedOrder) {
        setPaymentStatus(
          "Payment returned successfully, but order details were not found on this device. Please contact TYDES Research with your payment reference."
        );
        window.history.replaceState({}, "", "/");
        return;
      }

      try {
        setPaymentStatus("Verifying payment and preparing invoice...");

        const response = await fetch("/api/confirm-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId,
            order: JSON.parse(savedOrder),
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Payment confirmation failed.");
        }

        sessionStorage.removeItem(`tydes_order_${paymentIntentId}`);
        setCart([]);
        setPaymentStatus(
          `Payment confirmed. Invoice sent. Invoice number: ${result.invoiceNumber}`
        );

        window.history.replaceState({}, "", "/");
      } catch (error) {
        setPaymentStatus(error.message);
      }
    }

    confirmReturnedPayment();
  }, []);

  function go(nextPage) {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openProduct(product) {
    setSelectedProduct(product);
    go("product");
  }

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...current, { ...product, qty: 1 }];
    });
  }

  function updateQty(id, qty) {
    if (qty < 1) return;

    setCart((current) =>
      current.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }

  function removeItem(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#03142d] text-white">
      <AgeResearchPopup
        accepted={acceptedPopup}
        setAccepted={setAcceptedPopup}
      />

      <Header
        page={page}
        go={go}
        cartCount={cartCount}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {paymentStatus && (
        <div className="mx-auto mt-6 max-w-5xl rounded-3xl border border-blue-200/20 bg-blue-300/10 px-5 py-4 text-center text-sm leading-6 text-blue-50">
          {paymentStatus}
        </div>
      )}

      {page === "home" && (
        <Home go={go} addToCart={addToCart} openProduct={openProduct} products={liveProducts} />
      )}

      {page === "shop" && (
        <Shop addToCart={addToCart} openProduct={openProduct} products={liveProducts} />
      )}

      {page === "product" && (
        <ProductPage product={selectedProduct} addToCart={addToCart} />
      )}

      {page === "cart" && (
        <Cart
          cart={cart}
          subtotal={subtotal}
          updateQty={updateQty}
          removeItem={removeItem}
          go={go}
        />
      )}

      {page === "checkout" && <Checkout cart={cart} subtotal={subtotal} />}

      {page === "about" && <About />}

      {page === "faq" && <FAQ />}

      {page === "contact" && <Contact />}

      <Footer go={go} />

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        <button
          onClick={() => go("cart")}
          className="flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-[#03142d] shadow-2xl transition hover:-translate-y-1"
        >
          <ShoppingBag size={18} />
          Cart ({cartCount})
        </button>

        <a
          href={createWhatsAppUrl(
            "Hello TYDES Research, I would like to ask about your laboratory research products."
          )}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white shadow-2xl transition hover:-translate-y-1"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>

        <button
          onClick={() => { window.location.href = "/admin-tydes"; }}
          className="flex h-7 w-7 items-center justify-center self-end rounded-full bg-white/5 text-white/20 transition hover:bg-white/10 hover:text-white/40"
          aria-hidden="true"
        >
          <Lock size={11} />
        </button>
      </div>
    </div>
  );
}

function Header({ page, go, cartCount, menuOpen, setMenuOpen }) {
  const links = ["home", "shop", "about", "faq", "contact"];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#03142d]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <button onClick={() => go("home")} className="flex items-center gap-3">
          <div className="grid h-11 w-16 place-items-center rounded-2xl bg-white/10">
            <WaveLogo className="h-5 w-12 text-white" />
          </div>

          <div className="text-left">
            <p className="tracking-[0.45em]">TYDES</p>
            <p className="text-xs uppercase tracking-[0.25em] text-blue-100/60">
              Research
            </p>
          </div>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => go(link)}
              className={`capitalize transition hover:text-blue-200 ${
                page === link ? "text-white" : "text-blue-100/60"
              }`}
            >
              {link}
            </button>
          ))}
        </nav>

        <button
          onClick={() => go("cart")}
          className="hidden rounded-full border border-white/15 px-5 py-3 md:block"
        >
          Cart ({cartCount})
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl border border-white/15 p-3 md:hidden"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen && (
        <div className="grid gap-2 border-t border-white/10 p-5 md:hidden">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => go(link)}
              className="rounded-xl bg-white/10 px-4 py-3 text-left capitalize"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => go("cart")}
            className="rounded-xl bg-white px-4 py-3 text-left font-semibold text-[#03142d]"
          >
            Cart ({cartCount})
          </button>
        </div>
      )}
    </header>
  );
}

function Home({ go, addToCart, openProduct, products }) {
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2">
        <div>
          <p className="mb-5 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-blue-100">
            Premium laboratory presentation
          </p>

          <h1 className="text-5xl font-semibold leading-tight tracking-[-0.04em] md:text-7xl">
            Premium Research Compounds.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100/70">
            TYDES Research supplies laboratory-use products, refined packaging,
            and a research grade-only standard.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => go("shop")}
              className="rounded-full bg-white px-7 py-4 font-semibold text-[#03142d]"
            >
              Shop Research Products
            </button>
            <button
              onClick={() => openProduct(products[4])}
              className="rounded-full border border-white/20 px-7 py-4 font-semibold"
            >
              View Bundle
            </button>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl">
          <div className="overflow-hidden rounded-3xl">
            <img
              src={summerPackImg}
              alt="Summer Pack Bundle"
              className="w-full object-cover"
            />
          </div>

          <div className="mt-5 rounded-3xl bg-[#061b3c] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-100/50">
              Bundle
            </p>
            <p className="mt-2 text-2xl font-semibold">
              Summer Pack Bundle
            </p>
            <p className="mt-1 text-blue-100/60">1119 AED launch offer</p>
          </div>
        </div>
      </section>

      <Disclaimer />

      <Section
        title="Featured Products"
        subtitle="Clean, premium, research-only products."
      >
        <ProductGrid
          items={products.slice(0, 3)}
          addToCart={addToCart}
          openProduct={openProduct}
        />
      </Section>

      <WhyTydes />

      <Bundle addToCart={addToCart} openProduct={openProduct} products={products} />

      <Section
        title="FAQ Preview"
        subtitle="Clear answers with no human-use guidance."
      >
        <div className="grid gap-4">
          <FAQItem
            q="Are these products for human use?"
            a="No. Laboratory research use only."
          />
          <FAQItem
            q="Do you provide dosing or usage instructions?"
            a="No. We do not provide human-use guidance."
          />
        </div>
      </Section>
    </>
  );
}

function Shop({ addToCart, openProduct, products }) {
  return (
    <Section
      title="Shop Research Products"
      subtitle="Browse TYDES products and accessories."
    >
      <ProductGrid
        items={products}
        addToCart={addToCart}
        openProduct={openProduct}
      />
    </Section>
  );
}

function ProductGrid({ items, addToCart, openProduct }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          openProduct={openProduct}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, addToCart, openProduct }) {
  const { inStock } = product;

  return (
    <article className={`overflow-hidden rounded-[2rem] border border-white/10 transition hover:-translate-y-2 ${inStock ? "bg-white/[0.06] hover:bg-white/[0.09]" : "bg-white/[0.03] opacity-60"}`}>
      <button
        onClick={() => openProduct(product)}
        className="relative grid h-80 w-full place-items-center bg-gradient-to-br from-white/10 to-blue-400/10 p-6"
      >
        {!inStock && (
          <span className="absolute left-4 top-4 rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
            Out of Stock
          </span>
        )}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-72 w-full object-contain"
          />
        ) : (
          <div className="grid h-52 w-40 place-items-center rounded-3xl border border-white/20 bg-[#082653] text-center">
            <div>
              <WaveLogo className="mx-auto mb-3 h-5 w-16 text-white" />
              <p className="px-4 text-sm font-semibold">{product.name}</p>
            </div>
          </div>
        )}
      </button>

      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-blue-100/50">
          {product.category}
        </p>

        <button
          onClick={() => openProduct(product)}
          className="mt-3 text-left text-2xl font-semibold"
        >
          {product.name}
        </button>

        <p className="mt-3 min-h-12 text-sm leading-6 text-blue-100/65">
          {product.text}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            {product.oldPrice && (
              <p className="text-sm text-blue-100/40 line-through">
                {product.oldPrice} AED
              </p>
            )}
            <p className="text-2xl font-bold">{product.price} AED</p>
          </div>

          {inStock ? (
            <button
              onClick={() => addToCart(product)}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#03142d]"
            >
              Add
            </button>
          ) : (
            <button
              disabled
              className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white/30 cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function ProductPage({ product, addToCart }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="grid min-h-[500px] place-items-center rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[460px] object-contain"
            />
          ) : (
            <div className="grid h-64 w-52 place-items-center rounded-3xl border border-white/20 bg-[#082653] text-center">
              <div>
                <WaveLogo className="mx-auto mb-4 h-6 w-20 text-white" />
                <p className="px-5 text-xl font-semibold">{product.name}</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-blue-100/60">
            {product.category}
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em]">
            {product.name}
          </h1>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            {product.oldPrice && (
              <p className="text-blue-100/40 line-through">
                {product.oldPrice} AED
              </p>
            )}
            <p className="text-4xl font-bold">{product.price} AED</p>
            <p className="mt-4 leading-7 text-blue-100/70">{product.text}</p>
          </div>

          {product.inStock ? (
            <button
              onClick={() => addToCart(product)}
              className="mt-7 rounded-full bg-white px-8 py-4 font-semibold text-[#03142d]"
            >
              Add to Cart
            </button>
          ) : (
            <button
              disabled
              className="mt-7 rounded-full bg-white/10 px-8 py-4 font-semibold text-white/30 cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}

          <div className="mt-6 rounded-3xl border border-blue-200/20 bg-blue-300/10 p-5 text-sm leading-6 text-blue-50/80">
            <strong>Research-only disclaimer:</strong> {DISCLAIMER}
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Info
          title="Product Overview"
          text="Supplied with clean TYDES presentation, clear product identity, and research-only labeling."
        />
        <Info
          title="Storage / Handling"
          text="Handle according to suitable laboratory standards. Keep sealed, labeled, organized, and documented."
        />
        <Info
          title="What’s Included"
          text={`1 × ${product.name}, TYDES research-only label, and protective packaging.`}
        />
      </div>
    </section>
  );
}

function Cart({ cart, subtotal, updateQty, removeItem, go }) {
  return (
    <Section title="Cart" subtitle="Review your selected TYDES products.">
      {cart.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-10 text-center">
          <ShoppingBag className="mx-auto text-blue-100/60" size={48} />
          <h2 className="mt-5 text-2xl font-semibold">Your cart is empty.</h2>
          <button
            onClick={() => go("shop")}
            className="mt-6 rounded-full bg-white px-7 py-4 font-semibold text-[#03142d]"
          >
            Shop Products
          </button>
        </div>
      ) : (
        <div className="grid gap-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 md:grid-cols-[1fr_auto]"
            >
              <div>
                <h3 className="text-2xl font-semibold">{item.name}</h3>
                <p className="mt-2 text-blue-100/60">{item.price} AED each</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10"
                >
                  <Minus size={16} />
                </button>

                <span className="w-8 text-center">{item.qty}</span>

                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10"
                >
                  <Plus size={16} />
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-7">
            <div className="flex justify-between text-2xl">
              <span>Subtotal</span>
              <strong>{subtotal} AED</strong>
            </div>

            <p className="mt-5 rounded-2xl bg-blue-300/10 p-4 text-sm leading-6 text-blue-50/80">
              {DISCLAIMER}
            </p>

            <p className="mt-4 rounded-2xl border border-white/10 bg-[#061b3c] p-4 text-sm leading-6 text-blue-100/70">
              Estimated shipping: 1–3 days after order confirmation.
            </p>

            <button
              onClick={() => go("checkout")}
              className="mt-6 w-full rounded-full bg-white px-7 py-4 font-semibold text-[#03142d]"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}

function Checkout({ cart, subtotal }) {
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    emirate: "",
    notes: "",
  });

  function updateCustomer(field, value) {
    setCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function buildOrderPDF() {
    const orderRef = `TYD-${Date.now().toString().slice(-6)}`;
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    const rows = cart.map((item) => `<tr>
      <td style="padding:12px 14px;border-bottom:1px solid #eee">${item.name}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #eee">${item.qty}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #eee">${item.price} AED</td>
      <td style="padding:12px 14px;border-bottom:1px solid #eee">${item.price * item.qty} AED</td>
    </tr>`).join("");
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
@page { size: A4; margin: 15mm 20mm; }
body { font-family: Arial, sans-serif; color: #222; margin: 0; padding: 0; }
.header { border-bottom: 2px solid #1a3a5c; padding-bottom: 20px; margin-bottom: 30px; }
.brand { font-size: 22px; font-weight: 700; color: #1a3a5c; letter-spacing: 2px; }
.sub { font-size: 11px; color: #888; letter-spacing: 1px; margin-top: 4px; }
.meta { display: flex; justify-content: space-between; margin-bottom: 30px; }
.label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 1px; }
.value { font-size: 14px; color: #222; margin-top: 4px; }
table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
th { background: #e8eff7; padding: 10px 14px; text-align: left; font-size: 11px; letter-spacing: 1px; color: #888; }
td { padding: 12px 14px; border-bottom: 1px solid #eee; font-size: 14px; }
.total-row td { font-weight: 700; font-size: 15px; color: #1a3a5c; border-bottom: none; }
.footer { margin-top: 30px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
* { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
</style></head>
<body>
<div class="header">
  <div style="display:flex;align-items:center;gap:14px;">
    <svg viewBox="0 0 320 110" width="56" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 63C74 28 127 35 181 62C228 85 270 69 302 18C263 98 203 110 143 78C94 52 55 45 18 63Z" fill="#1a3a5c"/>
      <path d="M37 75C88 55 126 66 173 90C218 113 253 99 277 84C228 114 185 118 136 94C95 74 66 66 37 75Z" fill="#1a3a5c"/>
    </svg>
    <div>
      <div class="brand">TYDES RESEARCH</div>
      <div class="sub">FOR RESEARCH USE ONLY</div>
    </div>
  </div>
</div>
<div style="font-size:20px;font-weight:700;margin-bottom:20px;">ORDER SUMMARY</div>
<div class="meta">
  <div>
    <div class="label">Reference</div><div class="value">${orderRef}</div>
    <div class="label" style="margin-top:12px;">Date</div><div class="value">${today}</div>
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
  <thead><tr><th>Product</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
  <tbody>
    ${rows}
    <tr>
      <td style="color:#888;">Delivery Fee</td>
      <td></td><td></td>
      <td style="color:#888;">60 AED</td>
    </tr>
    <tr class="total-row"><td colspan="3" style="text-align:right;padding-right:14px;">TOTAL</td><td>${subtotal + 60} AED</td></tr>
  </tbody>
</table>
${customer.notes ? `<div style="margin-bottom:20px;"><div class="label">Notes</div><div class="value" style="margin-top:6px;">${customer.notes}</div></div>` : ""}
<div class="footer">
  All products are for laboratory/research use only.<br>
  TYDES Research | tyderesearch0@gmail.com | WhatsApp: +971 50 137 0051
</div>
<script>window.onload = function() { window.print(); }</script>
</body></html>`;
  }

  function handleDownloadPDF() {
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !customer.address ||
      !customer.emirate
    ) {
      setError("Please complete all required delivery details.");
      return;
    }
    if (!confirmed) {
      setError("Please confirm research-use-only intent before placing your order.");
      return;
    }
    setError("");
    fetch("/api/send-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        customerAddress: customer.address,
        customerEmirate: customer.emirate,
        cartItems: cart,
        total: subtotal,
      }),
    }).catch(console.error);
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(buildOrderPDF());
      win.document.close();
    }
  }

  function handleWhatsApp() {
    window.open(
      createWhatsAppUrl("Hello TYDES Research, I would like to place an order."),
      "_blank"
    );
  }

  return (
    <Section
      title="Checkout"
      subtitle="Complete your delivery details and download your order as a PDF."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
          <ControlledInput
            label="Name"
            value={customer.name}
            onChange={(value) => updateCustomer("name", value)}
            required
          />

          <ControlledInput
            label="Email"
            type="email"
            value={customer.email}
            onChange={(value) => updateCustomer("email", value)}
            required
          />

          <ControlledInput
            label="Phone"
            value={customer.phone}
            onChange={(value) => updateCustomer("phone", value)}
            required
          />

          <ControlledInput
            label="Address"
            value={customer.address}
            onChange={(value) => updateCustomer("address", value)}
            required
          />

          <ControlledInput
            label="Emirate"
            value={customer.emirate}
            onChange={(value) => updateCustomer("emirate", value)}
            required
          />

          <ControlledTextarea
            label="Delivery Notes"
            value={customer.notes}
            onChange={(value) => updateCustomer("notes", value)}
          />

          <div className="rounded-2xl border border-blue-200/20 bg-blue-300/10 p-5">
            <div className="flex items-center gap-3">
              <Clock className="text-blue-100" size={22} />
              <h3 className="text-lg font-semibold text-white">
                Estimated Shipping
              </h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-blue-100/70">
              Estimated delivery time is 1–3 days after order confirmation.
            </p>
          </div>
        </div>

        <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
          <h3 className="text-2xl font-semibold">Order Summary</h3>

          <div className="mt-5 grid gap-3 text-sm text-blue-100/70">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between gap-4">
                <span>
                  {item.name} × {item.qty}
                </span>
                <strong className="text-white">
                  {item.price * item.qty} AED
                </strong>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between border-t border-white/10 pt-5 text-xl">
            <span>Total</span>
            <strong>{subtotal} AED</strong>
          </div>

          <p className="mt-4 rounded-2xl bg-blue-300/10 p-4 text-sm leading-6 text-blue-50/80">
            Estimated shipping: 1–3 days.
          </p>

          <div className="mt-4 rounded-2xl border border-white/10 bg-[#061b3c] p-4 text-center">
            <p className="text-xs uppercase tracking-widest text-blue-100/40">
              Online Payment
            </p>
            <p className="mt-1 font-semibold text-white">Coming Soon</p>
            <p className="mt-2 text-sm leading-5 text-blue-100/50">
              Card payments are on the way. For now, place your order via
              WhatsApp and we'll confirm manually.
            </p>
          </div>

          <label className="mt-6 flex gap-3 rounded-2xl bg-blue-300/10 p-4 text-sm leading-6">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1"
            />
            <span>
              I confirm these products are for laboratory research use only and
              not for human consumption.
            </span>
          </label>

          <p className="mt-4 text-xs leading-5 text-blue-100/50">
            {DISCLAIMER}
          </p>

          {error && (
            <p className="mt-4 rounded-2xl bg-red-500/20 p-4 text-sm text-red-100">
              {error}
            </p>
          )}

          <button
            onClick={handleDownloadPDF}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-[#03142d] transition hover:-translate-y-1"
          >
            Download Order PDF
          </button>

          <button
            onClick={handleWhatsApp}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-semibold text-white transition hover:-translate-y-1"
          >
            <MessageCircle size={18} />
            Contact on WhatsApp
          </button>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 block text-center text-sm text-blue-100/60 transition hover:text-white"
          >
            Need help? Email us: {CONTACT_EMAIL}
          </a>
        </aside>
      </div>
    </Section>
  );
}

function About() {
  return (
    <Section
      title="About TYDES Research"
      subtitle="A research-focused platform built around purity, presentation, and professional standards."
    >
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-lg leading-8 text-blue-100/70">
        <p>
          TYDES Research is a laboratory-use research platform focused on
          high-purity peptide products, clear product identification, and
          professional presentation for controlled research environments.
        </p>

        <p className="mt-5">
          Our mission is to support research workflows with refined packaging,
          clean labeling, and a research grade-only standard. Every product is
          presented with clear research-use-only positioning and without
          human-use claims, guidance, or promotional exaggeration.
        </p>

        <p className="mt-5">
          The TYDES identity is inspired by precision, structure, and flow. The
          wave mark, deep navy color palette, and minimal laboratory aesthetic
          reflect a calm, organized, and trustworthy approach to research
          product presentation.
        </p>

        <p className="mt-5 rounded-2xl bg-blue-300/10 p-5 text-sm leading-6 text-blue-50/80">
          {DISCLAIMER}
        </p>
      </div>
    </Section>
  );
}

function FAQ() {
  return (
    <Section title="FAQ" subtitle="Common questions about TYDES Research.">
      <div className="grid gap-4">
        <FAQItem
          q="Are these products for human use?"
          a="No. Laboratory research use only."
        />
        <FAQItem
          q="Do you provide dosing or usage instructions?"
          a="No. We do not provide human-use guidance."
        />
        <FAQItem q="Where do you deliver?" a="UAE delivery placeholder." />
        <FAQItem
          q="Are products sealed and labeled?"
          a="Yes. Packaging includes TYDES labeling and research-use-only warnings."
        />
        <FAQItem q="Can I buy the vial holder separately?" a="Yes." />
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section title="Contact" subtitle="Send a TYDES product inquiry.">
      <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
        <form className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
          <Input label="Name" required />
          <Input label="Email" type="email" required />
          <Input label="Phone" />
          <select className="rounded-2xl border border-white/10 bg-[#061b3c] p-4">
            <option>General Inquiry</option>
            {products.map((product) => (
              <option key={product.id}>{product.name}</option>
            ))}
          </select>
          <Textarea label="Message" required />

          <a
            href={createWhatsAppUrl(
              "Hello TYDES Research, I would like to contact you about your laboratory research products."
            )}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-semibold text-white transition hover:-translate-y-1"
          >
            <MessageCircle size={18} />
            Contact on WhatsApp
          </a>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-full border border-white/15 px-7 py-4 text-center font-semibold text-white transition hover:bg-white/10"
          >
            Email TYDES Research
          </a>
        </form>

        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
          <h3 className="text-2xl font-semibold">TYDES Research</h3>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-5 flex gap-3 text-blue-100/70 transition hover:text-white"
          >
            <Mail /> {CONTACT_EMAIL}
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex gap-3 text-blue-100/70 transition hover:text-white"
          >
            <Phone /> +971 50 137 0051
          </a>

          <p className="mt-5 flex gap-3 text-blue-100/70">
            <MapPin /> UAE delivery placeholder
          </p>

          <p className="mt-6 rounded-2xl bg-blue-300/10 p-4 text-sm leading-6 text-blue-50/80">
            {DISCLAIMER}
          </p>
        </aside>
      </div>
    </Section>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.35em] text-blue-100/50">
        TYDES Research
      </p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100/70">
          {subtitle}
        </p>
      )}
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Disclaimer() {
  return (
    <div className="border-y border-white/10 bg-white/[0.04]">
      <div className="mx-auto flex max-w-7xl gap-4 px-5 py-6 text-sm leading-6 text-blue-50/80">
        <ShieldCheck className="shrink-0 text-blue-100" />
        <p>
          <strong>Research-Only Notice:</strong> {DISCLAIMER}
        </p>
      </div>
    </div>
  );
}

function WhyTydes() {
  return (
    <Section
      title="Why TYDES"
      subtitle="Scientific, minimal, and built around trust."
    >
      <div className="grid gap-4">

        {/* Hero editorial card — Refined packaging */}
        <div className="relative flex min-h-[480px] items-end overflow-hidden rounded-[2rem]">
          <img
            src={ghkPackagingImg}
            alt="Refined packaging"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="relative z-10 p-10 md:p-16">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
              Premium Presentation
            </p>
            <h3 className="text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl">
              Refined<br />packaging.
            </h3>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/65">
              Clean labeling, premium presentation, and deep-blue brand styling
              built for the research environment.
            </p>
          </div>
        </div>

        {/* Two smaller cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-9">
            <div className="mb-6 text-blue-100">
              <FlaskConical size={26} />
            </div>
            <h3 className="text-2xl font-semibold">Research-only standard</h3>
            <p className="mt-3 leading-7 text-blue-100/70">
              Every page clearly reinforces laboratory research use only — no
              human-use claims, no ambiguity.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-9">
            <div className="mb-6 text-blue-100">
              <WaveLogo className="h-6 w-20 text-white" />
            </div>
            <h3 className="text-2xl font-semibold">Wave identity</h3>
            <p className="mt-3 leading-7 text-blue-100/70">
              The TYDES mark represents precision, flow, organization, and trust
              — a calm identity for serious research.
            </p>
          </div>
        </div>

      </div>
    </Section>
  );
}

function Bundle({ addToCart, openProduct, products }) {
  const bundle = products.find((p) => p.id === "bundle");

  return (
    <Section
      title="Summer Pack Bundle"
      subtitle="A complete research bundle with clean TYDES organization."
    >
      <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8">
        <p className="text-4xl font-bold">1119 AED</p>
        <p className="mt-3 text-blue-100/70">
          Includes RETA 10MG, GHK-CU 50MG, BAC Water 3ML, and Big Vial Holder.
        </p>
        <div className="mt-7 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => addToCart(bundle)}
            className="rounded-full bg-white px-7 py-4 font-semibold text-[#03142d]"
          >
            Add Bundle to Cart
          </button>
          <button
            onClick={() => openProduct(bundle)}
            className="rounded-full border border-white/20 px-7 py-4 font-semibold"
          >
            View Bundle
          </button>
        </div>
      </div>
    </Section>
  );
}

function Info({ icon, title, text, image }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] ${!image ? "p-7" : ""}`}>
      {image && (
        <div className="h-56 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>
      )}
      <div className={image ? "p-7" : ""}>
        {icon && <div className="mb-5 text-blue-100">{icon}</div>}
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="mt-3 leading-7 text-blue-100/70">{text}</p>
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  return (
    <details className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
      <summary className="cursor-pointer text-lg font-semibold">{q}</summary>
      <p className="mt-3 leading-7 text-blue-100/70">{a}</p>
    </details>
  );
}

function Input({ label, type = "text", required = false }) {
  return (
    <label>
      <span className="mb-2 block text-sm text-blue-100/70">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        required={required}
        className="w-full rounded-2xl border border-white/10 bg-[#061b3c] p-4 outline-none focus:ring-4 focus:ring-blue-200/20"
      />
    </label>
  );
}

function Textarea({ label, required = false }) {
  return (
    <label>
      <span className="mb-2 block text-sm text-blue-100/70">
        {label}
        {required ? " *" : ""}
      </span>
      <textarea
        rows="5"
        required={required}
        className="w-full resize-none rounded-2xl border border-white/10 bg-[#061b3c] p-4 outline-none focus:ring-4 focus:ring-blue-200/20"
      />
    </label>
  );
}

function ControlledInput({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}) {
  return (
    <label>
      <span className="mb-2 block text-sm text-blue-100/70">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-[#061b3c] p-4 outline-none focus:ring-4 focus:ring-blue-200/20"
      />
    </label>
  );
}

function ControlledTextarea({ label, value, onChange, required = false }) {
  return (
    <label>
      <span className="mb-2 block text-sm text-blue-100/70">
        {label}
        {required ? " *" : ""}
      </span>
      <textarea
        rows="5"
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-none rounded-2xl border border-white/10 bg-[#061b3c] p-4 outline-none focus:ring-4 focus:ring-blue-200/20"
      />
    </label>
  );
}

function Footer({ go }) {
  return (
    <footer className="border-t border-white/10 bg-[#020d20]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <WaveLogo className="h-5 w-16 text-white" />
            <p className="tracking-[0.45em]">TYDES</p>
          </div>

          <p className="mt-5 text-sm leading-6 text-blue-100/60">
            Premium research products with clear labeling and refined packaging.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 block text-sm text-blue-100/60 transition hover:text-white"
          >
            {CONTACT_EMAIL}
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block text-sm text-blue-100/60 transition hover:text-white"
          >
            +971 50 137 0051
          </a>
        </div>

        <div>
          <h4 className="font-semibold">Pages</h4>
          <div className="mt-4 grid gap-2">
            {["home", "shop", "about", "faq", "contact"].map((page) => (
              <button
                key={page}
                onClick={() => go(page)}
                className="w-fit capitalize text-blue-100/60"
              >
                {page}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold">Legal Notice</h4>
          <p className="mt-4 text-sm leading-6 text-blue-100/60">
            {DISCLAIMER}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default App;