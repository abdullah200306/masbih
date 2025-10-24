import React, { useEffect, useState } from "react";

export default function AddListing() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    title: "",
    kind: "",
    price: "",
    desc: "",
    image: "",
    contact: ""
  });

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "null");
    setUser(u);
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = (e) => {
    e.preventDefault();
    if (!user) {
      alert("سجّل الدخول أولاً من تبويب (حسابي).");
      return;
    }
    if (!form.title || !form.price) {
      alert("العنوان والسعر مطلوبان.");
      return;
    }
    const all = JSON.parse(localStorage.getItem("myListings") || "[]");
    const id = Date.now(); // معرف محلي بسيط
    const item = {
      id,
      ...form,
      ownerName: user.name,
      ownerPhone: user.phone,
      createdAt: new Date().toISOString()
    };
    all.unshift(item);
    localStorage.setItem("myListings", JSON.stringify(all));
    alert("تم نشر الإعلان ✅");
    // تفريغ الحقول
    setForm({ title: "", kind: "", price: "", desc: "", image: "", contact: "" });
    // انتقال اختياري لصفحة إعلاناتي
    window.location.hash = ""; // لا شيء
    window.location.assign("/"); // ارجع الرئيسية
  };

  return (
    <div className="page">
      <h2 className="page-title">إضافة إعلان</h2>
      {!user && <p className="muted">أنت ضيف الآن. سجّل دخولك من (حسابي) ليمكنك النشر.</p>}

      <form onSubmit={save} className="form">
        <input name="title" className="input" placeholder="عنوان الإعلان *" value={form.title} onChange={onChange} required />
        <input name="kind" className="input" placeholder="النوع (كهرمان، مورانو..)" value={form.kind} onChange={onChange} />
        <input name="price" type="number" className="input" placeholder="السعر (د.ك) *" value={form.price} onChange={onChange} required />
        <input name="image" className="input" placeholder="رابط صورة (اختياري)" value={form.image} onChange={onChange} />
        <input name="contact" className="input" placeholder="وسيلة تواصل إضافية (اختياري)" value={form.contact} onChange={onChange} />
        <textarea name="desc" className="textarea" placeholder="وصف مختصر" rows="4" value={form.desc} onChange={onChange} />
        <button className="primary-btn" type="submit" disabled={!user}>نشر</button>
      </form>
    </div>
  );
}
