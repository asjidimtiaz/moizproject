import { Router, type IRouter, type Request, type Response } from "express";
import { eq } from "drizzle-orm";
import { db, galleryTable } from "@workspace/db";
import { ListGalleryResponse } from "@workspace/api-zod";
import multer from "multer";
import { put, del } from "@vercel/blob";

const router: IRouter = Router();

// Store files in memory so we can push them to Vercel Blob
const upload = multer({ storage: multer.memoryStorage() });

router.get("/gallery", async (_req: Request, res: Response): Promise<void> => {
  const photos = await db.select().from(galleryTable).orderBy(galleryTable.id);
  res.json(ListGalleryResponse.parse(photos));
});

router.post("/gallery", upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "Image file is required" });
    return;
  }
  
  const { caption, category } = req.body;
  if (!caption || !category) {
    res.status(400).json({ error: "Caption and category are required" });
    return;
  }

  try {
    // Upload the file buffer to Vercel Blob
    const blob = await put(req.file.originalname, req.file.buffer, {
      access: 'public',
      // Provide a clean random suffix
      addRandomSuffix: true
    });

    const [photo] = await db.insert(galleryTable).values({
      url: blob.url,
      caption,
      category
    }).returning();
    
    res.status(201).json(photo);
  } catch (err) {
    console.error("Vercel Blob Upload Error:", err);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

router.delete("/gallery/:id", async (req: Request, res: Response): Promise<void> => {
  const idValue = parseInt(String(req.params.id), 10);
  if (isNaN(idValue)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  // Find the photo first to get its URL for deletion from disk
  const [photo] = await db.select().from(galleryTable).where(eq(galleryTable.id, idValue));
  
  if (!photo) {
    res.status(404).json({ error: "Photo not found" });
    return;
  }

  // Delete from database
  const [deletedPhoto] = await db.delete(galleryTable).where(eq(galleryTable.id, idValue)).returning();
  
  // If deletion from DB was successful, delete the blob from Vercel storage
  if (deletedPhoto && deletedPhoto.url) {
    try {
      await del(deletedPhoto.url);
    } catch (err) {
      console.error("Failed to delete Vercel Blob:", deletedPhoto.url, err);
      // We still return 204 because the DB entry is gone
    }
  }

  res.status(204).send();
});

export default router;
