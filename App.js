// src/App.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

/** =========== إعداد بسيط ===========
 * 1) افتح supabase.com → New project (مجاني)
 * 2) من Settings → API:
 *    - حط Project URL هنا ↓
 *    - وحط anon public key هنا ↓
 * 3) من Storage → New bucket → الاسم: misbahi → خله Public
 * 4) من SQL Editor → الصق سكربت الجدول وشغّله:
 *    create table if not exists public.listings (
 *      id uuid primary key default gen_random_uuid(),
 *      title text not null,
 *      kind text,
 *      price numeric(12,3),
 *      description text,
 *      images text[] default '{}',
 *      contact text,
 *      created_at timestamp with time zone default now()
 *    );
 *    create index if not exists listings_created_at_idx on public.listings(created_at desc);
 * ================================== */

const SUPABASE_URL = "https://wttomeioveumzqfkrkbr.supabase.co";         // ← الصق Project URL
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0dG9tZWlvdmV1bXpxZmtya2JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMDM5MTgsImV4cCI6MjA3Njg3OTkxOH0.W2pCmxsTwudtTDSA3BKNwYF_Qb_TJnbTR8f0qpdub_A";   // ← الصق anon public key
const STORAGE_BUCKET = "misbahi";                        // ← نفس اسم البكت اللي صنعته

const supabase =
  SUPABASE_URL.startsWith("http") && SUPABASE_ANON.length > 20
    ? createClient(SUPABASE_URL, SUPABASE_ANON)
    : null;

function currencyKWD(v) {
  if (v == null || v === "" || Number.isNaN(Number(v))) return "—";
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "KWD" }).format(Number(v));
  } catch {
    return `${v} KWD`;
  }
}

export default function App() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // form state
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const filesRef = useRef(null);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);

  // filters
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("new"); // new | priceAsc | priceDesc

  async function fetchListings() {
    if (!supabase) return;
    setLoading(true);
    setErr(null);
    const { data, error } = await supabase
      .from("listings")
      .select("id, title, kind, price, description, images, contact, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) setErr(error.message);
    setListings(data || []);
    setLoading(false);
  }

  useEffect(() => {
    if (supabase) fetchListings();
  }, []);

  const filtered = useMemo(() => {
    let arr = [...listings];
    const t = q.trim().toLowerCase();
    if (t) {
      arr = arr.filter((x) =>
        [x.title, x.kind, x.description].some((f) => (f || "").toLowerCase().includes(t))
      );
    }
    if (sort === "priceAsc") arr.sort((a, b) => (a.price ?? 1e18) - (b.price ?? 1e18));
    if (sort === "priceDesc") arr.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    return arr;
  }, [listings, q, sort]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!supabase) {
      alert("⚠️ لسه ما حطّيت مفاتيح Supabase فوق (SUPABASE_URL / SUPABASE_ANON).");
      return;
    }
    const files = Array.from(filesRef.current?.files || []);
    if (!title || files.length === 0) {
      alert("العنوان + صورة واحدة على الأقل مطلوبة ✋");
      return;
    }
    setPosting(true);
    try {
      // 1) ارفع الصور
      const urls = [];
      for (const f of files) {
        const safe = `${crypto.randomUUID()}-${(f.name || "photo").replace(/[^a-zA-Z0-9_.-]/g, "_")}`;
        const path = `public/${safe}`;
        const { error: upErr } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(path, f, { cacheControl: "3600", upsert: false, contentType: f.type || "image/jpeg" });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
        if (pub?.publicUrl) urls.push(pub.publicUrl);
      }

      // 2) أدخل الإعلان
      const priceNum = price ? Number(price) : null;
      const { error: insErr } = await supabase.from("listings").insert({
        title,
        kind,
        price: priceNum,
        description,
        images: urls,
        contact,
      });
      if (insErr) throw insErr;

      // reset
      setTitle("");
      setKind("");
      setPrice("");
      setDescription("");
      setContact("");
      if (filesRef.current) filesRef.current.value = "";
      setPosted(true);
      setTimeout(() => setPosted(false), 2500);
      await fetchListings();
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء النشر: " + (e?.message || e));
    } finally {
      setPosting(false);
    }
  }

  const box = { border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, background: "#fff" };

  return (
    <div dir="rtl" style={{ fontFamily: "system-ui, Arial", background: "#f8fafc", minHeight: "100vh" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          backdropFilter: "blur(6px)",
          background: "rgba(255,255,255,0.9)",
          borderBottom: "1px solid #e5e7eb",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 16px", display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>مِسباحي — سوق المسابيح</h1>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              placeholder="ابحث: كهرمان، مورانو، عتيق…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", width: 220 }}
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb" }}
              title="ترتيب"
            >
              <option value="new">الأحدث</option>
              <option value="priceAsc">السعر ⬆️</option>
              <option value="priceDesc">السعر ⬇️</option>
            </select>
          </div>
        </div>
      </header>

      {!supabase && (
        <div style={{ maxWidth: 900, margin: "16px auto", padding: "12px 16px", background: "#fff7ed", border: "1px solid #fcd34d", borderRadius: 12 }}>
          <b>⚠️ تنبيه:</b> لم يتم ضبط مفاتيح Supabase. حرّر القيم في أعلى الملف (SUPABASE_URL, SUPABASE_ANON)، ثم أعد التجربة.
        </div>
      )}

      <main style={{ maxWidth: 1100, margin: "16px auto", padding: "0 16px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
        {/* Form */}
        <section style={box}>
          <h2 style={{ marginTop: 0 }}>أضف مسباح للبيع</h2>
          <p style={{ marginTop: 0, color: "#64748b", fontSize: 13 }}>أدخل البيانات وارفع الصور ثم اضغط نشر.</p>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
            <div>
              <label style={{ fontSize: 13 }}>العنوان *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مسباح كهرمان عتيق 33 حبة"
                required
                style={{ width: "100%", padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb" }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label style={{ fontSize: 13 }}>النوع</label>
                <input
                  value={kind}
                  onChange={(e) => setKind(e.target.value)}
                  placeholder="كهرمان/مورانو/عود/مستكة…"
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb" }}
                />
              </div>
              <div>
                <label style={{ fontSize: 13 }}>السعر (دينار)</label>
                <input
                  type="number"
                  step="0.001"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="45"
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb" }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13 }}>وصف</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="حبات سليمة، تمرير سلس، رائحة طبيعية…"
                style={{ width: "100%", padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", resize: "vertical" }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13 }}>وسيلة التواصل</label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="واتساب: 5xxxxxxx أو إنستغرام @misbahi"
                style={{ width: "100%", padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb" }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13 }}>صور المسباح (1–6) *</label>
              <input ref={filesRef} type="file" accept="image/*" multiple style={{ width: "100%" }} />
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>أول صورة ستكون الغلاف.</div>
            </div>
            <button
              disabled={posting}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 12,
                border: "none",
                background: posting ? "#cbd5e1" : "#f59e0b",
                color: "#fff",
                fontWeight: 700,
                cursor: posting ? "not-allowed" : "pointer",
              }}
            >
              {posting ? "جاري الرفع…" : "نشر الإعلان"}
            </button>
            {posted && <div style={{ color: "#16a34a", fontSize: 13 }}>✅ تم النشر! سيتم عرض الإعلان الآن.</div>}
          </form>
        </section>

        {/* Listings */}
        <section style={{ ...box, minHeight: 300 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <h2 style={{ margin: 0 }}>العروض</h2>
            <span style={{ color: "#64748b", fontSize: 13 }}>
              {loading ? "جارِ التحميل…" : `${filtered.length} عنصر`}
            </span>
          </div>
          {err && (
            <div style={{ padding: 8, background: "#fee2e2", color: "#991b1b", borderRadius: 8, marginBottom: 8 }}>
              {err}
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div style={{ padding: 24, textAlign: "center", color: "#64748b", background: "#fff", borderRadius: 12 }}>
              لا توجد إعلانات مطابقة حالياً.
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {filtered.map((x) => (
              <article key={x.id} style={{ border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
                <div style={{ aspectRatio: "16/9", background: "#f1f5f9" }}>
                  {x.images?.[0] ? (
                    <img src={x.images[0]} alt={x.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", color: "#94a3b8" }}>
                      لا صورة
                    </div>
                  )}
                </div>
                <div style={{ padding: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h3 title={x.title} style={{ margin: 0, fontSize: 16, fontWeight: 700, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {x.title}
                    </h3>
                    <strong>{currencyKWD(x.price)}</strong>
                  </div>
                  <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6, color: "#64748b", fontSize: 13 }}>
                    {x.kind && <span style={{ border: "1px solid #e5e7eb", borderRadius: 999, padding: "2px 8px", background: "#f8fafc" }}>{x.kind}</span>}
                    <span style={{ marginInlineStart: "auto" }}>{new Date(x.created_at).toLocaleDateString()}</span>
                  </div>
                  {x.description && (
                    <p title={x.description} style={{ marginTop: 8, color: "#334155", fontSize: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {x.description}
                    </p>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                    {x.contact && (
                      <a
                        href={
                          x.contact.startsWith("http")
                            ? x.contact
                            : x.contact.includes("واتساب") || /^\d{7,}$/.test(x.contact)
                            ? `https://wa.me/${x.contact.replace(/\D/g, "")}`
                            : `https://instagram.com/${x.contact.replace(/^@/, "")}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontWeight: 700, color: "#92400e", textDecoration: "none" }}
                      >
                        تواصل
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 16px 40px", color: "#64748b", fontSize: 12 }}>
        © {new Date().getFullYear()} مِسباحي — بالنشر، أنت تقرّ أن الصور أصلية والمعلومات صحيحة.
      </footer>
    </div>
  );
}
