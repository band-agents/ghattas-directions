/**
 * Contact: every way to reach the clinic, then a short enquiry form.
 * Shared by all three directions, drawn through the --kit-* variables.
 * The form is a demo and says so after sending.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { BRAND, CORE_SERVICES } from "@/content";
import { Field, isPhone, type KitUI } from "./Booking";
import "./kit.css";

const CHANNELS = ["WhatsApp", "Phone", "Email"] as const;

export function ContactPanel({ ui }: { ui: KitUI }) {
  const [copied, setCopied] = useState("");
  const [name, setName] = useState("");
  const [via, setVia] = useState<(typeof CHANNELS)[number]>("WhatsApp");
  const [reach, setReach] = useState("");
  const [topic, setTopic] = useState<string>(CORE_SERVICES[0].name);
  const [msg, setMsg] = useState("");
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  const reachOk = via === "Email" ? /^\S+@\S+\.\S+$/.test(reach) : isPhone(reach);
  const ok = name.trim().length > 1 && reachOk && msg.trim().length > 3;

  const copy = async (v: string) => {
    try { await navigator.clipboard.writeText(v); setCopied(v); setTimeout(() => setCopied(""), 1600); } catch { /* the value stays selectable */ }
  };

  const rows = [
    { icon: MessageCircle, label: "WhatsApp", value: BRAND.whatsapp, href: BRAND.whatsappHref },
    { icon: Phone, label: "Phone", value: BRAND.phone },
    { icon: Mail, label: "Email", value: BRAND.email },
    { icon: MapPin, label: "Visit", value: BRAND.area, note: BRAND.hoursNote },
    { icon: Clock, label: "Hours", value: BRAND.hours },
  ];

  return (
    <div className="kit kit-contact">
      <ul className="kit-lines">
        {rows.map(({ icon: Icon, label, value, href, note }) => (
          <li key={label}>
            <span className="kit-line-icon"><Icon size={18} /></span>
            <span className="kit-line-body">
              <span className="kit-eyebrow">{label}</span>
              {href
                ? <a href={href} target="_blank" rel="noreferrer" className="kit-line-v u-tnum">{value}</a>
                : <span className="kit-line-v u-tnum">{value}</span>}
              {note && <span className="kit-muted kit-small">{note}</span>}
            </span>
            {label !== "Visit" && label !== "Hours" && (
              <button type="button" className="kit-copy" onClick={() => copy(value)} aria-label={`Copy ${label}`}>
                {copied === value ? <Check size={15} /> : <Copy size={15} />}
              </button>
            )}
          </li>
        ))}
        <li className="kit-muted kit-small">Contact details are placeholders until the clinic confirms them.</li>
      </ul>

      {sent ? (
        <motion.div className="kit-done" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <span className="kit-done-icon"><Check size={28} /></span>
          <h3 className="kit-h">Thank you, {name.split(" ")[0]}.</h3>
          <p className="kit-muted">The clinic replies by {via.toLowerCase()} within working hours.</p>
          <p className="kit-demo">Demo: nothing has been sent.</p>
          <button className={ui.secondary} onClick={() => { setSent(false); setMsg(""); setTried(false); }}>Send another</button>
        </motion.div>
      ) : (
        <form className="kit-form kit-fs" noValidate onSubmit={(e) => { e.preventDefault(); if (ok) setSent(true); else setTried(true); }}>
          <p className="kit-h">Send a private enquiry.</p>
          <Field id="ct-name" label="Name" value={name} set={setName} bad={tried && name.trim().length < 2} />
          <div className="kit-field">
            <span className="kit-label" id="ct-via-l">Reply by</span>
            <div className="kit-seg" role="radiogroup" aria-labelledby="ct-via-l">
              {CHANNELS.map((c) => (
                <button key={c} type="button" role="radio" aria-checked={via === c} className={via === c ? "is-on" : ""} onClick={() => setVia(c)}>{c}</button>
              ))}
            </div>
          </div>
          <Field id="ct-reach" label={via === "Email" ? "Email" : "Mobile"} value={reach} set={setReach}
            type={via === "Email" ? "email" : "tel"} bad={tried && !reachOk}
            error={via === "Email" ? "Enter an email address" : "Enter a mobile like 010 1234 5678 or +971 50 123 4567"} />
          <div className="kit-field">
            <label htmlFor="ct-topic">About</label>
            <select id="ct-topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
              {CORE_SERVICES.map((s) => <option key={s.id}>{s.name}</option>)}
              <option>Something else</option>
            </select>
          </div>
          <Field id="ct-msg" label="Message" value={msg} set={setMsg} area bad={tried && msg.trim().length < 4} error="Write a few words" />
          <button type="submit" className={ui.primary}>Send privately</button>
        </form>
      )}
    </div>
  );
}
