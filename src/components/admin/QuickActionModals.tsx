import { useState } from "react";
import {
  X,
  Upload,
  Check,
  Plus,
  Image as ImageIcon,
  Sparkles,
  FileText,
  Tag,
  Megaphone,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

export type ModalType =
  | "add-product"
  | "create-design"
  | "create-collection"
  | "write-blog"
  | "upload-media"
  | "create-promotion"
  | "create-banner"
  | null;

interface QuickActionModalsProps {
  modalType: ModalType;
  onClose: () => void;
}

export function QuickActionModals({ modalType, onClose }: QuickActionModalsProps) {
  const [loading, setLoading] = useState(false);

  if (!modalType) return null;

  const handleSubmit = (title: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`${title} created successfully`, {
        description: "Your changes are now staged in the enterprise CMS pipeline.",
      });
      onClose();
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-soft"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-surface border border-border-strong shadow-2xl p-6 relative animate-reveal-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground border border-border"
        >
          <X className="size-4" />
        </button>

        {modalType === "add-product" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Plus className="size-5 text-gold" />
              <h3 className="text-lg font-display font-medium text-foreground">
                Add New Product Silhouette
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Define a new physical blank substrate for the Print-on-Demand matrix.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("New Product");
              }}
              className="space-y-3 pt-2"
            >
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Heavyweight Workwear Overshirt"
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 bg-surface-2 border border-border text-sm text-foreground focus:outline-none">
                    <option>Apparel</option>
                    <option>Accessories</option>
                    <option>Home & Living</option>
                    <option>Print & Paper</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    Base Price (€ EUR)
                  </label>
                  <input
                    type="number"
                    required
                    defaultValue={49}
                    className="w-full px-3 py-2 bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Fabric & Fulfilment Specification
                </label>
                <input
                  type="text"
                  placeholder="e.g. 320gsm brushed canvas cotton, nickel hardware"
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-xs uppercase tracking-wider font-semibold bg-foreground text-background hover:bg-gold hover:text-background transition-colors"
                >
                  {loading ? "Registering Product..." : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        )}

        {modalType === "create-design" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-gold" />
              <h3 className="text-lg font-display font-medium text-foreground">
                Register New Atelier Design
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Upload master vector or high-resolution artwork and map across all blanks.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("New Design");
              }}
              className="space-y-3 pt-2"
            >
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Design Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Celestial Orbit"
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    Collection / Capsule
                  </label>
                  <select className="w-full px-3 py-2 bg-surface-2 border border-border text-sm text-foreground focus:outline-none">
                    <option>Nocturne</option>
                    <option>Northern Light</option>
                    <option>Mediterraneo</option>
                    <option>Meridian</option>
                    <option>Minimal</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    Design Style
                  </label>
                  <select className="w-full px-3 py-2 bg-surface-2 border border-border text-sm text-foreground focus:outline-none">
                    <option>Minimal</option>
                    <option>Graphic</option>
                    <option>Typography</option>
                    <option>Illustration</option>
                    <option>Artistic</option>
                  </select>
                </div>
              </div>

              <div className="border border-dashed border-border-strong p-6 text-center bg-background/50">
                <Upload className="size-6 text-gold mx-auto mb-2" />
                <p className="text-xs text-foreground font-medium">
                  Drop high-res artwork (SVG / 300DPI PNG)
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Recommended size: 4500 × 5400 px
                </p>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-xs uppercase tracking-wider font-semibold bg-foreground text-background hover:bg-gold hover:text-background transition-colors"
                >
                  {loading ? "Publishing Design..." : "Publish Design"}
                </button>
              </div>
            </form>
          </div>
        )}

        {modalType === "upload-media" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="size-5 text-gold" />
              <h3 className="text-lg font-display font-medium text-foreground">
                Media Asset Uploader
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Upload lookbook photographs, campaign video banners, or editorial photography.
            </p>

            <div className="border border-dashed border-gold/40 p-8 text-center bg-gold/5">
              <Upload className="size-8 text-gold mx-auto mb-2 animate-bounce" />
              <p className="text-sm text-foreground font-medium">
                Drag & Drop assets here or browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports WEBP, PNG, JPG, MP4 up to 50MB
              </p>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleSubmit("Media Assets")}
                className="px-5 py-2 text-xs uppercase tracking-wider font-semibold bg-gold text-background hover:bg-foreground hover:text-background transition-colors"
              >
                Upload & Process
              </button>
            </div>
          </div>
        )}

        {modalType === "write-blog" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-gold" />
              <h3 className="text-lg font-display font-medium text-foreground">
                Draft Editorial Journal
              </h3>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("Blog Article");
              }}
              className="space-y-3 pt-2"
            >
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Architecture of Heavyweight Cotton"
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    Editorial Pillar
                  </label>
                  <select className="w-full px-3 py-2 bg-surface-2 border border-border text-sm text-foreground focus:outline-none">
                    <option>Design</option>
                    <option>Fashion</option>
                    <option>Culture</option>
                    <option>Product Guide</option>
                    <option>Care Guide</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    defaultValue="5 min read"
                    className="w-full px-3 py-2 bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Excerpt / Lead Paragraph
                </label>
                <textarea
                  rows={3}
                  placeholder="Write a refined summary for the archive..."
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs uppercase tracking-wider font-semibold bg-foreground text-background hover:bg-gold hover:text-background transition-colors"
                >
                  Save & Open Studio Editor
                </button>
              </div>
            </form>
          </div>
        )}

        {(modalType === "create-promotion" ||
          modalType === "create-banner" ||
          modalType === "create-collection") && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Megaphone className="size-5 text-gold" />
              <h3 className="text-lg font-display font-medium text-foreground">
                {modalType === "create-promotion"
                  ? "Create Promotional Rule"
                  : modalType === "create-banner"
                    ? "Deploy Announcement Banner"
                    : "Curate Capsule Collection"}
              </h3>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("Campaign Item");
              }}
              className="space-y-3 pt-2"
            >
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Name / Identifier
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AUTUMN-EQUINOX-20"
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs uppercase tracking-wider font-semibold bg-foreground text-background hover:bg-gold hover:text-background transition-colors"
                >
                  Publish Live
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
