import { useState } from "react";
import type { ReviewsSectionData, ReviewItem } from "../homepage-types";
import { Star, Plus, Trash2, Check, User } from "lucide-react";
import { toast } from "sonner";

interface ReviewsSectionEditorProps {
  section: ReviewsSectionData;
  onChange: (updated: Partial<ReviewsSectionData>) => void;
}

export function ReviewsSectionEditor({ section, onChange }: ReviewsSectionEditorProps) {
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewQuote, setNewReviewQuote] = useState("");
  const [newReviewProduct, setNewReviewProduct] = useState("T-Shirt (240gsm)");

  const handleAddReview = () => {
    if (!newReviewAuthor.trim() || !newReviewQuote.trim()) {
      toast.error("Please fill in author and review quote.");
      return;
    }
    const newRev: ReviewItem = {
      id: `rev_${Date.now()}`,
      author: newReviewAuthor,
      location: "Verified Patron",
      rating: 5,
      productName: newReviewProduct,
      designName: "Midnight Lion",
      quote: newReviewQuote,
      verified: true,
      featured: true,
    };
    onChange({ reviews: [newRev, ...section.reviews] });
    setNewReviewAuthor("");
    setNewReviewQuote("");
    toast.success("Added new featured review");
  };

  const handleDeleteReview = (id: string) => {
    onChange({ reviews: section.reviews.filter((r) => r.id !== id) });
    toast.info("Removed review from homepage display");
  };

  return (
    <div className="space-y-6">
      {/* Narrative */}
      <div className="space-y-4">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Reviews Header
        </h4>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Eyebrow Tag
          </label>
          <input
            type="text"
            value={section.eyebrow}
            onChange={(e) => onChange({ eyebrow: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Title
          </label>
          <input
            type="text"
            value={section.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          />
        </div>
      </div>

      {/* Presentation Format */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Layout Presentation
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "grid", label: "4-Column Grid", desc: "Balanced masonry overview" },
            { id: "carousel", label: "Touch Carousel", desc: "Interactive swipe track" },
            {
              id: "large-testimonial",
              label: "Hero Testimonial",
              desc: "Featured spotlight quote",
            },
            { id: "editorial-quote", label: "Editorial Quote", desc: "Minimal typography callout" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange({ layout: item.id as ReviewsSectionData["layout"] })}
              className={`p-2.5 border text-left transition-colors ${
                section.layout === item.id
                  ? "bg-gold/10 border-gold text-foreground"
                  : "bg-surface-2 border-border text-muted-foreground hover:border-zinc-700"
              }`}
            >
              <p className="text-xs font-medium">{item.label}</p>
              <p className="text-[9px] font-mono text-muted-foreground mt-0.5">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List & Add Form */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Featured Customer Reviews ({section.reviews.length})
        </h4>

        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
          {section.reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-3 bg-surface-2 border border-border space-y-1.5 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-foreground">{rev.author}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    ({rev.location})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gold text-xs">
                  {"★".repeat(rev.rating)}
                </div>
              </div>
              <p className="text-xs text-zinc-300 italic">“{rev.quote}”</p>
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-1">
                <span>
                  {rev.productName} · {rev.designName}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteReview(rev.id)}
                  className="text-red-400 opacity-0 group-hover:opacity-100 hover:underline transition-opacity"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Add Review */}
        <div className="p-3 bg-black/60 border border-border space-y-2 mt-2">
          <label className="text-[10px] uppercase font-mono text-gold block">
            Add Verified Patron Review
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Patron Name (e.g. Marc K.)"
              value={newReviewAuthor}
              onChange={(e) => setNewReviewAuthor(e.target.value)}
              className="bg-surface-2 border border-border text-xs px-2.5 py-1.5 text-foreground focus:outline-none"
            />
            <input
              type="text"
              placeholder="Product (e.g. Hoodie 400gsm)"
              value={newReviewProduct}
              onChange={(e) => setNewReviewProduct(e.target.value)}
              className="bg-surface-2 border border-border text-xs px-2.5 py-1.5 text-foreground focus:outline-none"
            />
          </div>
          <textarea
            rows={2}
            placeholder="Review quote text..."
            value={newReviewQuote}
            onChange={(e) => setNewReviewQuote(e.target.value)}
            className="w-full bg-surface-2 border border-border text-xs p-2 text-foreground focus:outline-none resize-none"
          />
          <button
            type="button"
            onClick={handleAddReview}
            className="w-full py-1.5 bg-surface border border-gold/40 text-xs font-mono uppercase tracking-wider text-gold hover:bg-gold hover:text-background transition-colors flex items-center justify-center gap-1"
          >
            <Plus className="size-3.5" /> Append Review
          </button>
        </div>
      </div>
    </div>
  );
}
