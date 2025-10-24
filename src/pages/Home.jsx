import React, { useMemo, useState } from "react";

export default function Home() {
  const [q, setQ] = useState("");

  const items = useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      title: `مسباح مثال #${i + 1}`,
      price: (10 + i) + " د.ك",
      img: `https://picsum.photos/seed/misbah${i}/600/400`,
      kind: i % 2 ? "كهرمان" : "مورانو",
    })), []
  );

  const filtered = useMemo(() => {
    const s = q.trim();
    if (!s) return items;
    return items.filter(it => (it.title + " " + it.kind).includes(s));
  }, [q, items]);

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <span className="logo-dot">🧿</span>
          <span className="brand-text">مِسباحي</span>
        </div>
        <input
          className="search-input"
          placeholder="🔍 ابحث عن مسباح (مثال: كهرمان)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </header>

      <div className="grid">
        {filtered.map((it) => (
          <div
            className="card"
            key={it.id}
            onClick={() => (window.location.href = `/product.html?id=${it.id}`)}
            style={{ cursor: "pointer" }}
            title="اضغط لعرض التفاصيل"
          >
            <div className="img-wrap">
              <img src={it.img} alt={it.title} />
            </div>
            <h3>{it.title}</h3>
            <p className="price">{it.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
