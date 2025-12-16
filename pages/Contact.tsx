
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here (e.g., API call)
    console.log({ name, email, message });
    setSubmitted(true);
  };

  const inputClass = "block w-full px-4 py-3 bg-sky-50 border border-sky-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-colors sm:text-sm";

  if (submitted) {
    return (
      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900">Terima Kasih!</h2>
                <p className="mt-4 text-slate-600">
                    Pesan Anda telah kami terima. Tim kami akan segera meninjaunya. Kami akan menghubungi Anda jika ide Anda terpilih untuk ditampilkan.
                </p>
                <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-sky-600 text-white font-bold py-2 px-6 rounded-full hover:bg-sky-700 transition-colors"
                >
                    Kirim Pesan Lain
                </button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Hubungi Kami</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Punya ide hebat atau pertanyaan? Ceritakan kepada kami melalui formulir di bawah ini.
          </p>
        </div>

        <div className="mt-12 max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Alamat Email</label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="anda@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">Pesan atau Ide Anda</label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="Ceritakan ide hebat Anda di sini..."
                ></textarea>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
              >
                Kirim Pesan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
