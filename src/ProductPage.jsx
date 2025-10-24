import React from "react";
import { createRoot } from "react-dom/client";

function ProductPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

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
    image: `https://picsum.photos/seed/misbaha${id}/600/420`,
    desc: "مسباح فاخر مصنوع بعناية لتجربة روحانية مميزة 🌿",
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <a href="/" style={styles.back}>↩ رجوع</a>
        <h2 style={styles.h2}>تفاصيل المسباح</h2>
      </header>

      <img src={product.image} alt={product.title} style={styles.img} />
      <h3 style={styles.title}>{product.title}</h3>
      <p style={styles.desc}>{product.desc}</p>
      <p style={styles.price}>{product.price}</p>

      <a
        href={`https://wa.me/96560000000?text=السلام عليكم، مهتم بـ ${encodeURIComponent(product.title)}`}
        target="_blank"
        rel="noreferrer"
        style={styles.whatsapp}
      >
        تواصل واتساب 📩
      </a>
    </div>
  );
}

const styles = {
  page: { direction:"rtl", fontFamily:"Tajawal, sans-serif", background:"#0b0b0e", color:"#e5e7eb", minHeight:"100vh", padding:"16px" },
  header:{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 },
  back:{ color:"#ff7a00", textDecoration:"none", fontWeight:800 },
  h2:{ margin:0, fontWeight:800 },
  img:{ width:"100%", borderRadius:12, boxShadow:"0 8px 24px rgba(0,0,0,.35)", margin:"12px 0" },
  title:{ margin:"8px 0 4px", fontWeight:800 },
  desc:{ margin:"6px 0 10px", color:"#cbd5e1" },
  price:{ color:"#f7c65b", fontWeight:800, fontSize:18, marginBottom:14 },
  whatsapp:{ display:"block", textAlign:"center", background:"#25d366", color:"#fff", padding:"12px 16px", borderRadius:12, textDecoration:"none", fontWeight:800 }
};

export default ProductPage;

// ⬇️ مهم: رندر فعلي للصفحة
const root = createRoot(document.getElementById("root"));
root.render(<React.StrictMode><ProductPage/></React.StrictMode>);
