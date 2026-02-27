import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("database.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    image_url TEXT,
    tag TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    old_price INTEGER,
    image_url TEXT,
    discount_tag TEXT,
    is_new BOOLEAN DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`);

// Seed initial data if empty
const categoryCount = db.prepare("SELECT count(*) as count FROM categories").get() as { count: number };
if (categoryCount.count === 0) {
  const insertCategory = db.prepare("INSERT INTO categories (name, slug, image_url, tag) VALUES (?, ?, ?, ?)");
  insertCategory.run("Bedsheets", "bedsheets", "https://lh3.googleusercontent.com/aida-public/AB6AXuDE_4Vc_OIC1wJwR8WXkblH6iC837PpST-RSDYgCaI89Md97-xKN8TrofJ44eE70GNyEPasGnmHVyJwSPVivcTgUwxNMaZN5evmqJ-Bqb2LU7BM17LP1BLN0oIOcQnwnomxfFFe8JGQrnyv_n4kUlhYcsDVc7yPptwKktenCR4puYhheZQ8IdeXSUs0oWkqOXxaejO1MPZApWbcuq6sX8uChVUAh_CKClsdD0av71FVQRlmZ_tsMdVI5lxSnebt-gte_hJvtX2ErU_E", "Premium Fabric");
  insertCategory.run("Jaenamaz", "jaenamaz", "https://lh3.googleusercontent.com/aida-public/AB6AXuBUU1YahfKqdbugyagGDltakN6fv_1K3dzO-QCiaTbqNhJ_9Pyx5jw6ajAb7vPUdNe8aNxJ7caZKi-neGFrchTSO-yHrUMr12v1n2pyOATao_xR1CivoiPhzYypft19G5vq-Wau6uZAct9mvBZLELpM5nkPN7tgANYI7UzfANXidNu5_N8toaxrswkzNoRayMyjfI2SBd_x22tJD4pOftS60bsqMofvgf-Frkn-r9Z9AZD-0su_-f94y1EQej9ACTYduMkPSXZO-oOK", "Devotional");
  insertCategory.run("Cushions", "cushions", "https://lh3.googleusercontent.com/aida-public/AB6AXuC3JBhpDL4DeqA5_yGdCdkd4eVxcUPXDUb5vjwGkz0PRMHDTV0KRH1437qvPeYx_dUKItUUk_ySLkXRh_Sucu59w5kBJ2jAHmwy6jCwGoziqybT3Avqwjlfwh-f01EskzWkz6HqBZxXa_ZLmo3eD8vQuTn2fG9K_jzccpADffsQr7IeuMgTBBGPQ4EzV6c_JP-94Ts3dUdwVS5cDLZSMal_jwMUZMiVnzdzEQGF8zy-JaYNsjGz2HiOx8NvP4ft5lgW_NsBKie8Vcmp", "Comfort");
  insertCategory.run("Table Covers", "table-covers", "https://lh3.googleusercontent.com/aida-public/AB6AXuCI5Jd9s2NRtl-oGJGqKUIk-N0dTIii3l2VPNuM7JSGTIy3mgZc6FWDAOEvdK2Wj_tVM1mH9TgE7aXtus6EACJwtKyKoQgOPNMgVjws7P0gkVx3JRDmNdK8KjeIt_HJjjeCIosMyOd9HAcljo6KJ1uaonRSrgEhdSV4kBr_1A_h8RbLbXDfN3JlUgcINRGM0jUQgFLIsEWSmzTx0dPPyVx9Q-9SlHszYGV6gb-0VZ96y63rweAPAW-p2zSIXuY_vun9n5Bgq_QsGjog", "Dining Decor");
  insertCategory.run("Bridal Sets", "bridal-sets", "https://lh3.googleusercontent.com/aida-public/AB6AXuCigJ_vbMbYSLk21GRzU_z7-MO9srsbWQSYDa1o-pTZdUo4eOOxPPlT9-Cjs2eu7jV-Xc9jAS8SM1jYV7mYSXqgaBbqtjqOD0ZK79adBd7ou5eJ2sE6IGhvNIOCaEdOHQ56KJ0K6sBqXiUA7JG_sJ6opygi7jo-iGNyzzRO8HiGSMPlIj_Ly6mnA3VtBxiXxGQtcXORs5Da8JXsLhUzy4BOCyTtU0kOQjk58WXOAlRRvRrNhH6qzYLMNeNP3f1fUsVCPt1VCMU5Bn3u", "Wedding Essentials");
  insertCategory.run("Footmats", "footmats", "https://lh3.googleusercontent.com/aida-public/AB6AXuALKGc2yGNKhkz2vJPoGaJnmqIkAqPqwPbBDjoYJC2K-Qy3gxUjpf-C1w7MMhhj1Yl0ipJymHv5It5TgJgwDxC5RRGrPprgN-5DAxZwB9pbs1AmOGM6CHrOiz7bpJqEguiCzoEI2QTZARrCROZqBbjF44BZhfw2ucqLVTifnefu2gw9rX9xLfyWzgDcI55EQBTkqNmDshoj9HZVSK3gmDTwLOQmlWPBvwmzv4NW68-JjXA8HtofRft9vXme6GmYBV5T5XxijKOLSFc_", "Utility");

  const bedsheetsId = db.prepare("SELECT id FROM categories WHERE slug = ?").get("bedsheets") as { id: number };
  const insertProduct = db.prepare("INSERT INTO products (category_id, name, price, old_price, image_url, discount_tag, is_new) VALUES (?, ?, ?, ?, ?, ?, ?)");
  insertProduct.run(bedsheetsId.id, "Luxury King Set Floral", 2500, 3500, "https://lh3.googleusercontent.com/aida-public/AB6AXuA1UVV8O5YtHmFyNHY6om6KJm2wm9KJq1PginZm5nGX87UKfM3ZCEQCviUb-jcGSDQq6lB6rBpb7z7hb_l95yM752m9n0PY1qlezTls8QcNdAoHSr81PKczmm_Lg1YVAtJNL8gCb3MdbvMRsGP9gxbI691tFw17bZTinjKQ8XU8EqoT7FHPVWYYcIU6nQlaiiDruO8ZrkrRiOz7UQPpzLnltZWsWYkHPE3PMNUe9fwYoQFl57o31AKLjL6dULQz7R-XHeF8716Z2DSn", "25% OFF", 0);
  insertProduct.run(bedsheetsId.id, "Minimalist Silk Grey", 1800, 2200, "https://lh3.googleusercontent.com/aida-public/AB6AXuCJBZKMrN0tv4-FJr_-XRxtANIsgij6OU4gBsLbLEeWWQoRDjRlkIO14rLegSl1bg6SzNpwI9j3fvzplObSoPVeMP8h5JbcuMBVXQwzvt3JxQ2cLRvnF44pfIvFQdjbz8kAjaxwiP2dmpspX0zjdad7k70iDkbSCAhG8BAHZnucqYOEvqKX8vnhg5Drfdug6jO_1_9Aa8RqmhDEWVu_pLQECL8E5DzhIogpiW2BERM33d02H8CCPs8bYyF_HuOIqbcjJDfDuEu2oAg3", "15% OFF", 0);
  insertProduct.run(bedsheetsId.id, "Single Cotton Pastel", 1200, 1500, "https://lh3.googleusercontent.com/aida-public/AB6AXuAYvGGH04ljfe6kcC5hve3ivu3eRbue0obsNauzAsfE5iys9pwxqDSQJJFcowMzU94GYGbEKHBKR4vQmp2r9EEGmATzj-9RfBbhV4x3xXc2zohaTt_oo6nHZherT2V2r_HsPPdj16ZSTf9Pw2lCFoizQAtZdGZVZzrcl0XcZcSwVhBvoqleC8O6TZaXjB0GXyWdQDW9e32CdhcNnfas5v1HrpaHCW_-8NYJ5HI1TYuxiv865zG2wABarU5nCgQ9WEAm60ElNQ5iFBbF", null, 0);
  insertProduct.run(bedsheetsId.id, "Hotel Premium White", 3000, 4000, "https://lh3.googleusercontent.com/aida-public/AB6AXuBq-VHSy537Mmeq3_A728XykxgQ5yEybevAfd-QZJf54AVj2fL0oP34Ua_nkFl0jJi8kZTtYbgDimeyGHmLL8g1X44fiYOrIFIz-hhmYl9J_sSk5U_8o4xJuPF9WcCunDzfIlWXXzLbbIAuayDiHm57PJlAG_pRwCuoYL2ti2-oKM9E3RwY5tCO-_v1MPFYU6i_GxNQloM-uLYTjMD6khn1KcsKP1T_dhMDT7BRYJyWhjbF1PrF450u3GCgy1J1p4CNCgIhjSasLLmq", "NEW", 1);

  db.prepare("INSERT INTO admin (username, password) VALUES (?, ?)").run("admin", "admin123");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/categories", (req, res) => {
    const categories = db.prepare("SELECT * FROM categories").all();
    res.json(categories);
  });

  app.get("/api/products", (req, res) => {
    const { category_slug } = req.query;
    let products;
    if (category_slug) {
      products = db.prepare(`
        SELECT p.* FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE c.slug = ?
      `).all(category_slug);
    } else {
      products = db.prepare("SELECT * FROM products").all();
    }
    res.json(products);
  });

  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare("SELECT * FROM admin WHERE username = ? AND password = ?").get(username, password);
    if (user) {
      res.json({ success: true, user: { username: user.username } });
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
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
