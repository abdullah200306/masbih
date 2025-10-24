export default function Home() {
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
        {[1,2,3,4,5,6].map((i) => (
          <div className="card" key={i}>
            <div className="img-wrap">
              <img src={`https://picsum.photos/seed/misbah${i}/400/300`} alt="misbaha" />
            </div>
            <h3>مسباح مثال #{i}</h3>
            <p className="price">10 د.ك</p>
          </div>
        ))}
      </div>
    </div>
  );
}
