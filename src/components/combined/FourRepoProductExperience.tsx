import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, Truck, ShieldCheck, RotateCcw, Star } from "lucide-react";

const products = [
  { name: "T-Shirt", price: 29.99, image: "/src/assets/art-midnight-lion.png" },
  { name: "Hoodie", price: 49.99, image: "/src/assets/art-dune.png" },
  { name: "Sweatshirt", price: 44.99, image: "/src/assets/art-olive.png" },
  { name: "Tote Bag", price: 24.99, image: "/src/assets/art-solstice.png" },
];

export function FourRepoProductExperience() {
  const [selected, setSelected] = useState(0);
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const product = products[selected];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-white/[.03]">
            <motion.img key={product.image} src={product.image} alt={product.name} className="h-full w-full object-cover" initial={{ scale: 1.04 }} animate={{ scale: 1 }} transition={{ duration: .7 }} />
            <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">NEW</span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {products.map((item, i) => (
              <button key={item.name} onClick={() => setSelected(i)} className={'overflow-hidden rounded-xl border ' + (selected === i ? "border-white" : "border-white/10")}>
                <img src={item.image} alt={item.name} className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6, delay: .1 }} className="flex flex-col justify-center">
          <p className="mb-3 text-xs uppercase tracking-[.3em] text-white/50">Art to Product / Design Threads</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">{product.name}</h1>
          <div className="mt-5 flex items-center gap-3">
            <span className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</span>
            <span className="text-sm text-white/50">4.8 · 128 reviews</span>
          </div>
          <p className="mt-6 text-3xl font-medium">€{product.price.toFixed(2)}</p>
          <p className="mt-5 max-w-xl leading-7 text-white/55">One expressive design, curated across premium everyday products. A unified product experience combining the strongest visual ideas from the four source projects.</p>

          <div className="mt-8">
            <p className="mb-3 text-sm font-medium">Size</p>
            <div className="flex flex-wrap gap-2">{["XS","S","M","L","XL","XXL"].map(s => <button key={s} onClick={() => setSize(s)} className={'rounded-full border px-4 py-2 text-sm transition ' + (size === s ? "border-white bg-white text-black" : "border-white/15 bg-white/[.04] hover:bg-white/10")}>{s}</button>)}</div>
          </div>

          <div className="mt-8 flex gap-3">
            <div className="flex items-center rounded-xl border border-white/10 bg-white/[.04]">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4"><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-4"><Plus className="h-4 w-4" /></button>
            </div>
            <button className="flex-1 rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-white/90">Add to Cart</button>
            <button onClick={() => setLiked(!liked)} className={'rounded-xl border px-4 ' + (liked ? "border-white bg-white text-black" : "border-white/10 bg-white/[.04]")}><Heart className={'h-5 w-5 ' + (liked ? "fill-current" : "")} /></button>
          </div>

          <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-sm text-white/55 sm:grid-cols-3">
            <span className="flex gap-2"><Truck className="h-4 w-4" /> Fast shipping</span>
            <span className="flex gap-2"><ShieldCheck className="h-4 w-4" /> Secure checkout</span>
            <span className="flex gap-2"><RotateCcw className="h-4 w-4" /> Easy returns</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
