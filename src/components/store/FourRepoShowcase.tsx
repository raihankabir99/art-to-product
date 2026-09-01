import { motion } from "framer-motion";
import { ArrowRight, Package, PenTool, Truck } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import midnightLion from "@/assets/art-midnight-lion.png";
import dune from "@/assets/art-dune.png";
import olive from "@/assets/art-olive.png";
import solstice from "@/assets/art-solstice.png";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const products = [
  ["Midnight Lion Tee", midnightLion, "€29.99"],
  ["Dune Hoodie", dune, "€49.99"],
  ["Olive Line Tote", olive, "€24.99"],
  ["Solstice Sweatshirt", solstice, "€44.99"],
] as const;

const steps = [
  [PenTool, "Choose a design", "Browse original artwork and find the visual statement that fits you."],
  [Package, "Made on demand", "Your selected piece is produced only after you order — no overproduction."],
  [Truck, "Shipped worldwide", "Tracked delivery from a vetted production partner to your door."],
] as const;

export function FourRepoShowcase() {
  return (
    <>
      <section className="section border-t border-border">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-label text-gold">Unified design system</p>
            <h2 className="text-h1 mt-5 max-w-xl">One design. Many ways to wear it.</h2>
            <p className="text-body-lg mt-6 max-w-lg text-muted-foreground">
              Premium editorial composition from art-to-product, modern e-commerce patterns from tshirtwebsite1v0, motion direction from design-threads, and product-flow ideas from art.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/shop">Explore the collection <ArrowRight className="size-4" /></Link>
            </Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .6 }} className="relative overflow-hidden border border-border bg-surface">
            <img src={heroImg} alt="Premium apparel campaign" className="aspect-[4/3] size-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="section-tight border-y border-border">
        <div className="container-page grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {products.map(([name, image, price]) => (
            <Link key={name} to="/shop" className="group bg-background p-4 transition-colors hover:bg-surface">
              <div className="overflow-hidden bg-surface">
                <img src={image} alt={name} className="aspect-square size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <span className="text-h4">{name}</span>
                <span className="text-meta">{price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-page">
          <div className="mb-12 text-center">
            <p className="text-label text-gold">How it works</p>
            <h2 className="text-h1 mt-4">Design to doorstep</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {steps.map(([Icon, title, body], i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}>
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full border border-border text-gold"><Icon className="size-5" /></span>
                  <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="text-h3 mt-5">{title}</h3>
                <p className="text-body mt-2 max-w-sm text-muted-foreground">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
