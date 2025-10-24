import React, { useEffect, useState } from "react";

export default function Account() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("+965");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "null");
    if (u) setUser(u);
  }, []);

  const login = () => {
    if (!phone) return alert("أدخل رقم الواتساب.");
    const u = { name: name || "مستخدم", phone: code + phone };
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
    alert("تم تسجيل الدخول محليًا ✅");
  };

  const logout = () => {
    localStorage.removeItem("user");
    // لا نحذف الإعلانات حتى يرجع يشوفها لو دخل بنفس الجهاز
    setUser(null);
    alert("تم تسجيل الخروج ✅");
  };

  return (
    <div className="page">
      <h2 className="page-title">الحساب</h2>

      {!user ? (
        <>
          <input className="input" placeholder="اسمك" value={name} onChange={(e)=>setName(e.target.value)} />
          <div className="phone-box">
            <select className="select-country" value={code} onChange={(e)=>setCode(e.target.value)}>
              {["+965","+966","+971","+974","+968","+973","+20","+962","+964","+212"].map((c,i)=>
                <option key={i} value={c}>{c}</option>
              )}
            </select>
            <input className="phone-input" placeholder="رقم الواتساب" value={phone} onChange={(e)=>setPhone(e.target.value)} />
          </div>
          <button className="primary-btn" onClick={login}>تسجيل الدخول</button>
          <p className="muted" style={{marginTop:8}}>الضيف يقدر يتصفح فقط. للتجربة الآن الحفظ على هذا الجهاز.</p>
        </>
      ) : (
        <>
          <div className="card" style={{marginBottom:12}}>
            <h3 style={{margin:0}}>مرحباً، {user.name}</h3>
            <p style={{margin:"6px 0 0"}}>واتساب: {user.phone}</p>
          </div>
          <button className="danger-btn" onClick={logout}>تسجيل الخروج</button>
        </>
      )}
    </div>
  );
}
