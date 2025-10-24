export default function MyListings() {
  const my = JSON.parse(localStorage.getItem("myListings") || "[]");

  return (
    <div className="page">
      <h2 className="page-title">إعلاناتي</h2>
      {my.length === 0 ? (
        <p>ما عندك إعلانات بعد. أضف إعلان من تبويب <b>إضافة</b>.</p>
      ) : (
        <div className="grid">
          {my.map((it, i) => (
            <div className="card" key={i}>
              <div className="img-wrap">
                <img src={it.image || "https://picsum.photos/seed/misbahx/600/400"} alt={it.title} />
              </div>
              <h3>{it.title}</h3>
              <p className="price">{it.price} د.ك</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
