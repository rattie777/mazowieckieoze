import React, { useState } from "react";

import { useEffect } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [btnText, setBtnText] = useState("Wyślij zgłoszenie");
  const [disabled, setDisabled] = useState(false);

  function getOrCreateVisitorId() {
    let id = localStorage.getItem("visitor_id");
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2, 12);
      localStorage.setItem("visitor_id", id);
    }
    return id;
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const visitorId = getOrCreateVisitorId();
    fetch(`https://script.google.com/macros/s/AKfycbxwsv6oZCP2HmgUEmJHjpNoYryvgSVqJtbz8iv974VXRGKUpOkVGr8LoqXTPRZZ42iQ8A/exec?visitor=${visitorId}`)
  }, []);

  async function wyslijFormularz(e) {
    e.preventDefault();
    setStatus("");
    setBtnText("Wysyłanie...");
    setDisabled(true);

    const form = e.target;
    if (!form.rodo.checked) {
      setStatus("Musisz wyrazić zgodę na przetwarzanie danych.");
      setBtnText("Wyślij zgłoszenie");
      setDisabled(false);
      return;
    }

    const visitorId = getOrCreateVisitorId();
    const data = {
      typ_instalacji: form.typ_instalacji.value,
      montaz: form.montaz.value,
      finansowanie: form.finansowanie.value,
      imie: form.imie.value,
      adres: form.adres.value,
      telefon: form.telefon.value,
      email: form.email.value,
      wiadomosc: form.wiadomosc.value,
      visitor: visitorId,
    };
    const formData = new FormData();
    // biome-ignore lint/complexity/noForEach: <explanation>
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
  
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxwsv6oZCP2HmgUEmJHjpNoYryvgSVqJtbz8iv974VXRGKUpOkVGr8LoqXTPRZZ42iQ8A/exec",
        {
          method: "POST",
          body: formData,
        }
      );
      if (res.ok) {
        setStatus("Dziękujemy! Zgłoszenie zostało wysłane ✅");
        setBtnText("Zgłoszenie wysłane!");
        setDisabled(true);
        form.reset();
      } else {
        throw new Error("Błąd sieci");
      }
    } catch {
      setStatus("Wystąpił błąd podczas wysyłania. Spróbuj ponownie.");
      setBtnText("Wyślij zgłoszenie");
      setDisabled(false);
    }
  }

  return (
    <>
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-semibold text-white mb-2">Wypełnij formularz!</h2>
      <p className="text-base text-white/80">
        Skontaktujemy się z Tobą i przygotujemy indywidualną ofertę!
      </p>
    </div>
   
    <form
      className="max-w-2xl mx-auto my-10 p-6 rounded-xl bg-[#2EA2DF] bg-opacity-90 shadow"
      onSubmit={wyslijFormularz}
      autoComplete="off"
    >
      <div className="mb-4">
        <label htmlFor="typ_instalacji" className="block text-base mb-1 text-white">
          Typ instalacji
        </label>
        <select
          id="typ_instalacji"
          name="typ_instalacji"
          required
          defaultValue=""
          className="block w-full rounded-lg border border-white bg-[#2EA2DF] bg-opacity-80 text-white text-base p-3 focus:outline-none focus:ring-2 focus:ring-[#FFD166] focus:border-[#FFD166] transition-all appearance-none"
        >
          <option value="" disabled hidden>
            Wybierz opcję
          </option>
          <option>Chcę magazyn do PV</option>
          <option>Chcę PV z magazynem</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="montaz" className="block text-base mb-1 text-white">
          Montaż
        </label>
        <select
          id="montaz"
          name="montaz"
          required
          defaultValue=""
          className="block w-full rounded-lg border border-white bg-[#2EA2DF] bg-opacity-80 text-white text-base p-3 focus:outline-none focus:ring-2 focus:ring-[#FFD166] focus:border-[#FFD166] transition-all appearance-none"
        >
          <option value="" disabled hidden>
            Wybierz opcję
          </option>
          <option>Grunt</option>
          <option>Dach</option>
          <option>Nie dotyczy</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="finansowanie" className="block text-base mb-1 text-white">
          Finansowanie
        </label>
        <select
          id="finansowanie"
          name="finansowanie"
          required
          defaultValue=""
          className="block w-full rounded-lg border border-white bg-[#2EA2DF] bg-opacity-80 text-white text-base p-3 focus:outline-none focus:ring-2 focus:ring-[#FFD166] focus:border-[#FFD166] transition-all appearance-none"
        >
          <option value="" disabled hidden>
            Wybierz opcję
          </option>
          <option>Gotówka</option>
          <option>Raty</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="imie" className="block text-base mb-1 text-white">
          Imię i nazwisko
        </label>
        <input
          id="imie"
          name="imie"
          type="text"
          required
          className="block w-full rounded-lg border border-white bg-[#2EA2DF] bg-opacity-80 text-white text-base p-3 focus:outline-none focus:ring-2 focus:ring-[#FFD166] focus:border-[#FFD166] transition-all"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="adres" className="block text-base mb-1 text-white">
          Adres
        </label>
        <input
          id="adres"
          name="adres"
          type="text"
          required
          className="block w-full rounded-lg border border-white bg-[#2EA2DF] bg-opacity-80 text-white text-base p-3 focus:outline-none focus:ring-2 focus:ring-[#FFD166] focus:border-[#FFD166] transition-all"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="telefon" className="block text-base mb-1 text-white">
          Telefon
        </label>
        <input
          id="telefon"
          name="telefon"
          type="tel"
          required
          className="block w-full rounded-lg border border-white bg-[#2EA2DF] bg-opacity-80 text-white text-base p-3 focus:outline-none focus:ring-2 focus:ring-[#FFD166] focus:border-[#FFD166] transition-all"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-base mb-1 text-white">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="block w-full rounded-lg border border-white bg-[#2EA2DF] bg-opacity-80 text-white text-base p-3 focus:outline-none focus:ring-2 focus:ring-[#FFD166] focus:border-[#FFD166] transition-all"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="wiadomosc" className="block text-base mb-1 text-white">
          Wiadomość
        </label>
        <textarea
          id="wiadomosc"
          name="wiadomosc"
          rows="4"
          className="block w-full rounded-lg border border-white bg-[#2EA2DF] bg-opacity-80 text-white text-base p-3 focus:outline-none focus:ring-2 focus:ring-[#FFD166] focus:border-[#FFD166] transition-all"
        />
      </div>
      <div className="mb-4 flex items-start">
        <input type="checkbox" id="rodo" required className="mt-1 mr-2 accent-[#FFD166] scale-110" />
        <label htmlFor="rodo" className="text-sm text-gray-100">
          Wypełniając formularz wyrażasz zgodę na przetwarzanie swoich danych osobowych przez IntegracjaB2B Sp. z o.o. w celu kontaktu i przygotowania oferty. Przysługuje Ci prawo dostępu do danych, ich sprostowania, usunięcia oraz ograniczenia przetwarzania. Więcej informacji znajdziesz na <a href="https://ib2b.pl/polityka-prywatnosci" target="_blank" className="underline text-yellow-200">https://ib2b.pl/polityka-prywatnosci</a>
        </label>
      </div>
      <button
        id="submit-btn"
        type="submit"
        className="w-full py-3 rounded-full text-lg font-semibold bg-[#FFD166] hover:bg-[#FFE095] text-white transition disabled:opacity-60"
        disabled={disabled}
      >
        {btnText}
      </button>
      <div id="form-status" className={`text-center text-base mt-4 ${status.includes("Dziękujemy") ? "text-green-300" : status ? "text-red-300" : ""}`}>
        {status}
      </div>
    </form>
    </>
  );
}
