export default function Home() {
  const items = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    title: `مسباح مثال #${i + 1}`,
    price: (10 + i) + " د.ك",
    img: `https://picsum.photos/seed/misbah${i}/400/300`,
  }));

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <span className="logo-dot">🧿</span>
          <span className="brand-text">مِسباحي</span>
        </div>
        <input className="search-input" placeholder="🔍 ابحث عن مسباح..." />
      </header>

      <div className="grid">
        {items.map((it) => (
          <div className="card" key={it.id}>
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
