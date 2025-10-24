import { useState } from "react";

export default function AddListing() {
  const [form, setForm] = useState({
    title: "", kind: "", price: "", desc: "", contact: "", image: ""
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = (e) => {
    e.preventDefault();
    const my = JSON.parse(localStorage.getItem("myListings") || "[]");
    my.unshift(form);
    localStorage.setItem("myListings", JSON.stringify(my));
    alert("تم حفظ الإعلان محليًا ✅");
    setForm({ title: "", kind: "", price: "", desc: "", contact: "", image: "" });
  };

  return (
    <div className="page">
      <h2 className="page-title">إضافة إعلان</h2>
      <form onSubmit={save} className="form">
        <input name="title" className="input" placeholder="العنوان" value={form.title} onChange={onChange} required />
        <input name="kind" className="input" placeholder="النوع (كهرمان، مورانو..)" value={form.kind} onChange={onChange} />
        <input name="price" type="number" className="input" placeholder="السعر (د.ك)" value={form.price} onChange={onChange} />
        <input name="contact" className="input" placeholder="وسيلة التواصل (واتساب)" value={form.contact} onChange={onChange} />
        <input name="image" className="input" placeholder="رابط صورة (اختياري)" value={form.image} onChange={onChange} />
        <textarea name="desc" className="textarea" placeholder="وصف" rows="4" value={form.desc} onChange={onChange} />
        <button className="primary-btn" type="submit">نشر</button>
      </form>
    </div>
  );
}
