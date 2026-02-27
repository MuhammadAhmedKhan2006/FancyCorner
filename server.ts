import express from "express";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ShamimHouse";

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schemas
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  imageUrl: String,
  tag: String
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // slug of the category
  price: { type: Number, required: true },
  salePrice: Number,
  imageUrl: { type: String, required: true },
  isNewItem: { type: Boolean, default: false },
  discountTag: String
});

const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);

// Admin Credentials from .env
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin_shamim";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "shamim2026";

async function seedData() {
  const categoryCount = await Category.countDocuments();
  if (categoryCount === 0) {
    const categories = [
      { name: "Bedsheets", slug: "bedsheets", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDE_4Vc_OIC1wJwR8WXkblH6iC837PpST-RSDYgCaI89Md97-xKN8TrofJ44eE70GNyEPasGnmHVyJwSPVivcTgUwxNMaZN5evmqJ-Bqb2LU7BM17LP1BLN0oIOcQnwnomxfFFe8JGQrnyv_n4kUlhYcsDVc7yPptwKktenCR4puYhheZQ8IdeXSUs0oWkqOXxaejO1MPZApWbcuq6sX8uChVUAh_CKClsdD0av71FVQRlmZ_tsMdVI5lxSnebt-gte_hJvtX2ErU_E", tag: "Premium Fabric" },
      { name: "Jaenamaz", slug: "jaenamaz", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUU1YahfKqdbugyagGDltakN6fv_1K3dzO-QCiaTbqNhJ_9Pyx5jw6ajAb7vPUdNe8aNxJ7caZKi-neGFrchTSO-yHrUMr12v1n2pyOATao_xR1CivoiPhzYypft19G5vq-Wau6uZAct9mvBZLELpM5nkPN7tgANYI7UzfANXidNu5_N8toaxrswkzNoRayMyjfI2SBd_x22tJD4pOftS60bsqMofvgf-Frkn-r9Z9AZD-0su_-f94y1EQej9ACTYduMkPSXZO-oOK", tag: "Devotional" },
      { name: "Cushions", slug: "cushions", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3JBhpDL4DeqA5_yGdCdkd4eVxcUPXDUb5vjwGkz0PRMHDTV0KRH1437qvPeYx_dUKItUUk_ySLkXRh_Sucu59w5kBJ2jAHmwy6jCwGoziqybT3Avqwjlfwh-f01EskzWkz6HqBZxXa_ZLmo3eD8vQuTn2fG9K_jzccpADffsQr7IeuMgTBBGPQ4EzV6c_JP-94Ts3dUdwVS5cDLZSMal_jwMUZMiVnzdzEQGF8zy-JaYNsjGz2HiOx8NvP4ft5lgW_NsBKie8Vcmp", tag: "Comfort" },
      { name: "Table Covers", slug: "table-covers", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCI5Jd9s2NRtl-oGJGqKUIk-N0dTIii3l2VPNuM7JSGTIy3mgZc6FWDAOEvdK2Wj_tVM1mH9TgE7aXtus6EACJwtKyKoQgOPNMgVjws7P0gkVx3JRDmNdK8KjeIt_HJjjeCIosMyOd9HAcljo6KJ1uaonRSrgEhdSV4kBr_1A_h8RbLbXDfN3JlUgcINRGM0jUQgFLIsEWSmzTx0dPPyVx9Q-9SlHszYGV6gb-0VZ96y63rweAPAW-p2zSIXuY_vun9n5Bgq_QsGjog", tag: "Dining Decor" },
      { name: "Bridal Sets and Blankets/Comforters", slug: "bridal-sets", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCigJ_vbMbYSLk21GRzU_z7-MO9srsbWQSYDa1o-pTZdUo4eOOxPPlT9-Cjs2eu7jV-Xc9jAS8SM1jYV7mYSXqgaBbqtjqOD0ZK79adBd7ou5eJ2sE6IGhvNIOCaEdOHQ56KJ0K6sBqXiUA7JG_sJ6opygi7jo-iGNyzzRO8HiGSMPlIj_Ly6mnA3VtBxiXxGQtcXORs5Da8JXsLhUzy4BOCyTtU0kOQjk58WXOAlRRvRrNhH6qzYLMNeNP3f1fUsVCPt1VCMU5Bn3u", tag: "Wedding Essentials" },
      { name: "Footmats", slug: "footmats", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuALKGc2yGNKhkz2vJPoGaJnmqIkAqPqwPbBDjoYJC2K-Qy3gxUjpf-C1w7MMhhj1Yl0ipJymHv5It5TgJgwDxC5RRGrPprgN-5DAxZwB9pbs1AmOGM6CHrOiz7bpJqEguiCzoEI2QTZARrCROZqBbjF44BZhfw2ucqLVTifnefu2gw9rX9xLfyWzgDcI55EQBTkqNmDshoj9HZVSK3gmDTwLOQmlWPBvwmzv4NW68-JjXA8HtofRft9vXme6GmYBV5T5XxijKOLSFc_", tag: "Utility" }
    ];
    await Category.insertMany(categories);
  }

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    const products = [
      {
        name: "Luxury King Set Floral",
        category: "bedsheets",
        price: 2500,
        salePrice: 3500,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1UVV8O5YtHmFyNHY6om6KJm2wm9KJq1PginZm5nGX87UKfM3ZCEQCviUb-jcGSDQq6lB6rBpb7z7hb_l95yM752m9n0PY1qlezTls8QcNdAoHSr81PKczmm_Lg1YVAtJNL8gCb3MdbvMRsGP9gxbI691tFw17bZTinjKQ8XU8EqoT7FHPVWYYcIU6nQlaiiDruO8ZrkrRiOz7UQPpzLnltZWsWYkHPE3PMNUe9fwYoQFl57o31AKLjL6dULQz7R-XHeF8716Z2DSn",
        discountTag: "25% OFF"
      }
    ];
    await Product.insertMany(products);
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());

  await seedData();

  // API Routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/products", async (req, res) => {
    try {
      const { category_slug } = req.query;
      let query = {};
      if (category_slug) {
        query = { category: category_slug };
      }
      const products = await Product.find(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to add product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const result = await Product.findByIdAndDelete(req.params.id);
      if (result) {
        res.json({ success: true, message: "Product deleted" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  app.get("/api/config", (req, res) => {
    res.json({
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    });
  });

  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      res.json({ success: true, user: { username } });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

  return app;
}

const appPromise = startServer();
export default appPromise;
