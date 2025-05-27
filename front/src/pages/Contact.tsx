import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY; 


// Define validation schema with Yup
const schema = yup
  .object({
    name: yup.string().required("Imię i nazwisko jest wymagane"),
    email: yup
      .string()
      .email("Niepoprawny format email")
      .required("Email jest wymagany"),
    phone: yup
      .string()
      .required("Numer telefonu jest wymagany")
      .matches(/^\d{9}$/, "Numer telefonu musi składać się z 9 cyfr"),
    message: yup
      .string()
      .required("Wiadomość jest wymagana")
      .min(10, "Wiadomość musi zawierać co najmniej 10 znaków"),
  })
  .required();

// Define form data type
type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function Contact() {
  const [captchaToken, setCaptchaToken] = useState("");
  const [sending, setSending] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!captchaToken) {
      alert("Proszę potwierdzić, że nie jesteś robotem.");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          captchaToken,
        }),
      });

      if (res.ok) {
        alert("Dziękujemy za wiadomość. Odpowiemy najszybciej jak to możliwe.");
        reset();
        setCaptchaToken("");
      } else {
        alert("Błąd podczas wysyłania wiadomości.");
      }
    } catch (err) {
      alert("Nie udało się połączyć z serwerem.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Kontakt</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Dane kontaktowe</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <span>+48 123 456 789</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <span>kontakt@mbmrent.pl</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>ul. Nowoursynowska 161, 02-787 Warszawa</span>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Godziny otwarcia:</h3>
            <p>Poniedziałek - Piątek: 8:00 - 20:00</p>
            <p>Sobota: 9:00 - 16:00</p>
            <p>Niedziela: zamknięte</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Formularz kontaktowy</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1">Imię i nazwisko</label>
              <input
                type="text"
                className={`w-full border rounded-md p-2 ${
                  errors.name ? "border-red-500" : ""
                }`}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                className={`w-full border rounded-md p-2 ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1">Telefon</label>
              <input
                type="tel"
                className={`w-full border rounded-md p-2 ${
                  errors.phone ? "border-red-500" : ""
                }`}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1">Wiadomość</label>
              <textarea
                className={`w-full border rounded-md p-2 ${
                  errors.message ? "border-red-500" : ""
                }`}
                rows={4}
                {...register("message")}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <ReCAPTCHA
              sitekey={siteKey}
              onChange={(token) => setCaptchaToken(token || "")}
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
            >
              {sending ? "Wysyłanie..." : "Wyślij wiadomość"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
