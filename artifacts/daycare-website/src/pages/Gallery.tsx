import { useState } from "react";
import { useListGallery } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Gallery() {
  const { data: photos, isLoading } = useListGallery();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", "activities", "outdoor", "learning", "events", "meals"];

  const filteredPhotos = photos?.filter(
    photo => activeCategory === "all" || photo.category === activeCategory
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary">Photo Gallery</h1>
          <p className="text-xl text-muted-foreground">
            A glimpse into the joyful, creative, and engaging moments at Little Stars.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full capitalize ${
                activeCategory === category ? 'bg-brand-blue hover:bg-brand-blue/90' : 'text-muted-foreground border-muted-foreground/30'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">Loading gallery...</div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredPhotos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-muted cursor-pointer shadow-md hover:shadow-xl"
                >
                  <img 
                    src={photo.url || `/images/gallery-${(i % 8) + 1}.png`} 
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform text-white">
                      <p className="font-bold font-serif text-lg">{photo.caption}</p>
                      <p className="text-sm text-white/70 capitalize">{photo.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
