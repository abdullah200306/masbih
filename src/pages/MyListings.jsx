import React, { useEffect, useState } from "react";

export default function MyListings() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "null");
    setUser(u);
    const all = JSON.parse(localStorage.getItem("myListings") || "[]");
    setItems(all);
  }, []);

  const removeOne = (id) => {
    const next = items.filter(x => x.id !== id);
    setItems(next);
    localStorage.setItem("myListings", JSON.stringify(next));
  };

  if (!user) {
    return (
      <div className="page">
        <h2 className="page-title">إعلاناتي</h2>
        <p>سجّل دخولك من تبويب <b>حسابي</b> لعرض وإدارة إعلاناتك.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2 className="page-title">إعلاناتي</h2>
      {items.length === 0 ? (
        <p>ما عندك إعلانات بعد. أضف إعلان من تبويب <b>إضافة</b>.</p>
      ) : (
        <div className="grid">
          {items.map((it) => (
            <div className="card" key={it.id}>
              <div className="img-wrap" style={{ cursor: "pointer" }} onClick={() => window.open(`/product.html?id=${it.id}`, "_self")}>
                <img src={it.image || `https://picsum.photos/seed/misbahx${it.id}/600/400`} alt={it.title} />
              </div>
              <h3>{it.title}</h3>
              <p className="price">{it.price} د.ك</p>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button className="primary-btn" style={{ flex: 1 }} onClick={() => window.open(`/product.html?id=${it.id}`, "_self")}>تفاصيل</button>
                <button className="danger-btn" style={{ flex: 1 }} onClick={() => removeOne(it.id)}>حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

