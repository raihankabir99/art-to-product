import { useState } from "react";
import {
  Users,
  Plus,
  UserCheck,
  Edit,
  Trash2,
  Globe,
  Instagram,
  Twitter,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { BlogAuthor } from "./blog-types";
import { INITIAL_AUTHORS } from "./blog-initial-data";

export function AuthorsManager() {
  const [authors, setAuthors] = useState<BlogAuthor[]>(INITIAL_AUTHORS);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newAvatar, setNewAvatar] = useState("");

  const handleAddAuthor = () => {
    if (!newName.trim()) {
      toast.error("Please provide author name");
      return;
    }
    const created: BlogAuthor = {
      id: `auth_${Date.now()}`,
      name: newName.trim(),
      role: newRole.trim() || "Editorial Contributor",
      avatar:
        newAvatar.trim() ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      bio: newBio.trim() || "Journal essayist and creative contributor.",
      articlesCount: 0,
      socialLinks: {
        instagram: "@studionoir",
        website: "https://studionoir.fashion",
      },
    };
    setAuthors([...authors, created]);
    setNewName("");
    setNewRole("");
    setNewBio("");
    setNewAvatar("");
    setShowAddForm(false);
    toast.success(`Author "${created.name}" added to roster`);
  };

  const handleDelete = (id: string) => {
    setAuthors(authors.filter((a) => a.id !== id));
    toast.info("Author removed");
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Header */}
      <div className="p-4 bg-surface border border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
            Editorial Roster & Author Byline Management
          </h3>
          <p className="text-xs text-muted-foreground">
            Manage creative directors, staff writers, and guest curators.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3.5 py-1.5 bg-gold text-background text-xs font-mono uppercase font-bold hover:bg-foreground hover:text-background flex items-center gap-1.5 transition-colors"
        >
          <Plus className="size-3.5" /> Add Author
        </button>
      </div>

      {/* Add Form Drawer */}
      {showAddForm && (
        <div className="p-5 bg-surface border border-gold/40 animate-fade-in-soft space-y-4">
          <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider flex items-center gap-2">
            <UserCheck className="size-4 text-gold" /> New Author Profile
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Helena Vance"
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                Title / Editorial Role
              </label>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="e.g. Senior Textile Critic"
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                Avatar Image URL
              </label>
              <input
                type="text"
                value={newAvatar}
                onChange={(e) => setNewAvatar(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                Bio / Background
              </label>
              <input
                type="text"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                placeholder="Brief 1-2 sentence monograph bio"
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 border border-border text-xs font-mono uppercase text-muted-foreground"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddAuthor}
              className="px-4 py-1.5 bg-gold text-background text-xs font-mono uppercase font-bold hover:bg-foreground hover:text-background"
            >
              Save Author
            </button>
          </div>
        </div>
      )}

      {/* Authors Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {authors.map((author) => (
          <div
            key={author.id}
            className="p-5 bg-surface border border-border hover:border-gold/60 transition-colors space-y-3 relative group text-center flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="size-20 mx-auto rounded-full overflow-hidden border-2 border-gold/30 bg-surface-2">
                <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground">{author.name}</h4>
                <p className="text-[10px] font-mono uppercase text-gold">{author.role}</p>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {author.bio}
              </p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
              <span className="text-[10px] text-muted-foreground">
                {author.articlesCount} Articles
              </span>
              <button
                type="button"
                onClick={() => handleDelete(author.id)}
                className="text-muted-foreground hover:text-red-400 opacity-60 group-hover:opacity-100"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
