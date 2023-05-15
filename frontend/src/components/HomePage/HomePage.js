import React from "react";
import "./HomePage.css";

const products = [
  {
    id: 1,
    name: "Banganapalli Mango",
    price: "Price: 69",
    image: "https://www.bigbasket.com/media/uploads/p/s/30001006_8-fresho-alphonso-mango-ratnagiri.jpg",
  },
  {
    id: 2,
    name: "Rice",
    price: "Price: 550",
    image: "https://www.bigbasket.com/media/uploads/p/s/10000404_18-bb-royal-rice-raw-sona-masoori-12-17-months-old.jpg",
  },
  {
    id: 3,
    name: "Nut Chocolate Bar",
    price: "Price: 295",
    image: "https://www.bigbasket.com/media/uploads/p/s/1207404_2-cadbury-dairy-milk-fruit-nut-chocolate-bar-36-g.jpg",
  },
  {
    id: 3,
    name: "Fresh Chicken",
    price: "Price: 90",
    image: "https://www.bigbasket.com/media/uploads/p/s/10000909_8-fresho-chicken-curry-cut-without-skin-antibiotic-residue-free.jpg",
  },
];

const HomePage = () => {
  return (
    <>
      <div className="HomePage">
        <h5 className="line">
         * Groceries are not a luxury, But they are necessary.
        </h5>

        <div className="product-list">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h6>{product.name}</h6>
              <p>{product.price}</p>
              <button className="press"
                onClick={() => {
                  // Navigate to product page for this product
                  console.log(`Navigating to product ${product.id}`);
                  window.location.href = "/products";
                }}
              >
                  Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
