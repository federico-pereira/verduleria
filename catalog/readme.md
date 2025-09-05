Data-driven (recommended if you’ll later use JS/DB)

/catalog
   ├── index.html          # Catalog homepage
   ├── categories.html     # Shows all categories
   ├── products.html       # Shows all products
   └── data/
         ├── products.json # Stores product info (name, price, stock, img)
         └── categories.json


NOW

/catalog
   ├── index.html          # General catalog page
   ├── categories/
   │     ├── index.html    # All categories overview
   │     ├── fruits.html
   │     ├── vegetables.html
   │     └── others.html
   └── products/
         ├── index.html    # All products overview
         ├── manzana.html
         ├── kiwi.html
         ├── mango.html
         └── ...