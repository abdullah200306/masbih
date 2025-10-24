import React from "react";

export default function ProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    return (
      <div style={styles.page}>
        <h1 style={styles.error}>❌ لم يتم العثور على المنتج</h1>
      </div>
    );
  }

  const product = {
    id,
    title: `مسباح رقم ${id}`,
    price: `${10 + Number(id)} د.ك`,
    image: `https://picsum.photos/seed/misbaha${id}/500/400`,
    desc: "مسباح فاخر مصنوع بعناية لتجربة روحانية فريدة 🌿",
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <a href="/" style={styles.backButton}>↩ رجوع</a>
        <h2 style={styles.title}>تفاصيل المسباح</h2>
      </header>

      <img src={product.image} alt={product.title} style={styles.image} />
      <h3 style={styles.name}>{product.title}</h3>
      <p style={styles.desc}>{product.desc}</p>
      <p style={styles.price}>{product.price}</p>

      <button style={styles.buy}>🛒 أضف إلى السلة</button>
    </div>
  );
}

const styles = {
  page: {
    direction: "rtl",
    fontFamily: "Tajawal, sans-serif",
    background: "linear-gradient(180deg, #fff8f0 0%, #ffe0b2 100%)",
    minHeight: "100vh",
    textAlign: "center",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    color: "#ff7a00",
    textDecoration: "none",
    fontSize: "18px",
  },
  title: {
    color: "#222",
  },
  image: {
    width: "90%",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    marginTop: "15px",
  },
  name: {
    fontSize: "22px",
    color: "#333",
    marginTop: "15px",
  },
  desc: {
    color: "#555",
    fontSize: "16px",
    margin: "10px 0",
  },
  price: {
    color: "#ff7a00",
    fontWeight: "bold",
    fontSize: "20px",
  },
  buy: {
    backgroundColor: "#ff7a00",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "16px",
    marginTop: "15px",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
};
