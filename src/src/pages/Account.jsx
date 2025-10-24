export default function Account() {
  const countries = [
    { name:'الكويت',code:'+965'},{ name:'السعودية',code:'+966'},
    { name:'الإمارات',code:'+971'},{ name:'قطر',code:'+974'},
    { name:'عُمان',code:'+968'},{ name:'البحرين',code:'+973'},
    { name:'مصر',code:'+20'},{ name:'الأردن',code:'+962'},
    { name:'العراق',code:'+964'},{ name:'المغرب',code:'+212'}
  ];
  return (
    <div className="page">
      <h2 className="page-title">الحساب</h2>
      <p style={{marginBottom:12}}>الزائر يقدر يشوف فقط — التسجيل لاحقًا عبر WhatsApp.</p>
      <div className="phone-box">
        <select className="select-country">
          {countries.map((c,i)=><option key={i} value={c.code}>{c.code}</option>)}
        </select>
        <input className="phone-input" placeholder="رقم الواتساب" />
      </div>
      <a href="#" className="wa-btn">تسجيل الدخول عبر WhatsApp</a>
    </div>
  );
}
