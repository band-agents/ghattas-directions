/**
 * Take an Appointment: the booking flow, as the plan describes it: choose
 * what for, a date and a time, pay securely, get an instant confirmation.
 *
 * Shared by all three directions. It draws in each direction's colours and
 * faces through the --kit-* variables its root defines, and takes that
 * direction's own button classes through `ui`, so it never looks pasted in.
 *
 * It is a demo: nothing is booked, charged or sent, and it says so at the end.
 * Rules carried over from the Elite and Al-Madinah builds:
 *   - day keys come from local date parts, never toISOString(), which shifts
 *     a Cairo evening booking to the previous day;
 *   - Egyptian mobiles are accepted with +20, 20, a trunk 0, or bare;
 *   - no step waits on an exit animation before the next one renders.
 */

import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CalendarCheck, Lock, ShieldCheck } from "lucide-react";
import { BRAND, GROUPS, SPECIALTIES } from "@/content";
import "./kit.css";

export interface KitUI { primary: string; secondary: string }

const STEPS = ["What for", "When", "Your details", "Confirm"];
const GENERAL = { id: "general", name: "General men's health consultation", summary: "Not sure where to start? Begin here." };

const pad = (n: number) => String(n).padStart(2, "0");
const dayKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** The next `n` days the clinic opens. Saturday to Thursday; Friday closed. */
function openDays(n: number) {
  const out: { key: string; date: Date }[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 5) out.push({ key: dayKey(d), date: new Date(d) });
  }
  return out;
}

/** Forty-minute consultations from 11:00; the last starts at 20:20. */
const SLOTS = Array.from({ length: 15 }, (_, i) => {
  const m = 11 * 60 + i * 40;
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
});

/** A stable, believable pattern of taken slots, so the grid is not empty. */
function taken(day: string, slot: string) {
  let h = 0;
  for (const c of day + slot) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 4 === 0;
}

export function isPhone(v: string) {
  const s = v.replace(/[\s()-]/g, "");
  return /^(\+?20|0)?1[0125]\d{8}$/.test(s) || /^\+\d{8,15}$/.test(s);
}

const fmtDay = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
const fmtLong = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

export function Booking({ ui }: { ui: KitUI }) {
  const days = useMemo(() => openDays(12), []);
  const [step, setStep] = useState(0);
  const [what, setWhat] = useState("");
  const [day, setDay] = useState(days[0].key);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [discreet, setDiscreet] = useState(true);
  const [pay, setPay] = useState<"online" | "clinic">("online");
  const [tried, setTried] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  const chosen = what === GENERAL.id ? GENERAL : SPECIALTIES.find((s) => s.id === what);
  const date = days.find((d) => d.key === day)!.date;
  const detailsOk = name.trim().length > 1 && isPhone(phone);
  const canNext = [!!what, !!time, detailsOk, true][step];

  const next = () => {
    if (step === 2 && !detailsOk) { setTried(true); return; }
    if (step < 3) setStep(step + 1);
    else setRef(`GC-${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
  };

  if (ref) {
    return (
      <div className="kit kit-book">
        <motion.div className="kit-done" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <span className="kit-done-icon"><Check size={28} /></span>
          <p className="kit-eyebrow">Booking confirmed · {ref}</p>
          <h3 className="kit-h">See you {fmtLong(date)} at {time}.</h3>
          <p className="kit-muted">
            {chosen?.name}, with {what === GENERAL.id || SPECIALTIES.find((s) => s.id === what)?.group === "core" ? BRAND.doctor : "a visiting specialist"}.
            A confirmation goes to {phone} on WhatsApp{discreet ? ", naming only Ghattas and the time" : ""}.
          </p>
          <p className="kit-demo">Demo: nothing has been booked, charged or sent.</p>
          <button className={ui.secondary} onClick={() => { setRef(null); setStep(0); setWhat(""); setTime(""); setTried(false); }}>
            Book another visit
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="kit kit-book">
      <ol className="kit-steps" aria-label="Booking steps">
        {STEPS.map((s, i) => (
          <li key={s} className={i === step ? "is-on" : i < step ? "is-done" : ""}>
            <button type="button" disabled={i > step} onClick={() => setStep(i)} aria-current={i === step ? "step" : undefined}>
              <span className="kit-step-n">{i < step ? <Check size={14} /> : i + 1}</span>
              <span className="kit-step-l">{s}</span>
            </button>
          </li>
        ))}
      </ol>

      <motion.div key={step} className="kit-pane" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {step === 0 && (
          <fieldset className="kit-fs">
            <legend className="kit-h">What is the visit for?</legend>
            <Opt name="what" id={GENERAL.id} on={what} set={setWhat} title={GENERAL.name} sub={GENERAL.summary} wide />
            {(["core", "beyond"] as const).map((g) => (
              <div key={g} className="kit-group">
                <p className="kit-eyebrow">{GROUPS[g].title}</p>
                <div className="kit-opts">
                  {SPECIALTIES.filter((s) => s.group === g).map((s) => (
                    <Opt key={s.id} name="what" id={s.id} on={what} set={setWhat} title={s.name} sub={g === "core" ? BRAND.doctorShort : GROUPS[g].by} />
                  ))}
                </div>
              </div>
            ))}
          </fieldset>
        )}

        {step === 1 && (
          <div className="kit-fs">
            <p className="kit-h">Choose a day and a time.</p>
            <div className="kit-days" role="radiogroup" aria-label="Day">
              {days.map((d) => (
                <button key={d.key} type="button" role="radio" aria-checked={d.key === day}
                  className={`kit-day${d.key === day ? " is-on" : ""}`} onClick={() => { setDay(d.key); setTime(""); }}>
                  <span>{d.date.toLocaleDateString("en-GB", { weekday: "short" })}</span>
                  <b className="u-tnum">{d.date.getDate()}</b>
                  <span>{d.date.toLocaleDateString("en-GB", { month: "short" })}</span>
                </button>
              ))}
            </div>
            <div className="kit-slots" role="radiogroup" aria-label="Time">
              {SLOTS.map((t) => {
                const off = taken(day, t);
                return (
                  <button key={t} type="button" role="radio" aria-checked={t === time} disabled={off}
                    className={`kit-slot u-tnum${t === time ? " is-on" : ""}`} onClick={() => setTime(t)}>
                    {t}
                  </button>
                );
              })}
            </div>
            <p className="kit-muted kit-small">Forty minutes, one patient in the clinic at a time. Greyed times are taken.</p>
          </div>
        )}

        {step === 2 && (
          <div className="kit-fs kit-form">
            <p className="kit-h">Your details.</p>
            <Field id="bk-name" label="Full name" value={name} set={setName} bad={tried && name.trim().length < 2} hint="As on your ID" />
            <Field id="bk-phone" label="Mobile" value={phone} set={setPhone} bad={tried && !isPhone(phone)} type="tel"
              hint="Egyptian mobile, or international with +" error="Enter a mobile like 010 1234 5678 or +971 50 123 4567" />
            <Field id="bk-email" label="Email (optional)" value={email} set={setEmail} type="email" />
            <Field id="bk-note" label="Anything we should know (optional)" value={note} set={setNote} area />
            <label className="kit-check" htmlFor="bk-discreet">
              <input id="bk-discreet" type="checkbox" checked={discreet} onChange={(e) => setDiscreet(e.target.checked)} />
              <span>Discreet messages: reminders name only &ldquo;Ghattas&rdquo; and the time, never the service.</span>
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="kit-fs">
            <p className="kit-h">Check and confirm.</p>
            <dl className="kit-summary">
              <div><dt>Visit</dt><dd>{chosen?.name}</dd></div>
              <div><dt>When</dt><dd>{fmtDay(date)} · {time}</dd></div>
              <div><dt>Name</dt><dd>{name}</dd></div>
              <div><dt>Mobile</dt><dd className="u-tnum">{phone}</dd></div>
            </dl>
            <div className="kit-opts kit-pay" role="radiogroup" aria-label="Payment">
              <Opt name="pay" id="online" on={pay} set={(v) => setPay(v as "online" | "clinic")}
                title={<><Lock size={15} /> Pay securely online</>} sub="Card payment on the next screen" />
              <Opt name="pay" id="clinic" on={pay} set={(v) => setPay(v as "online" | "clinic")}
                title="Pay at the clinic" sub="Card or cash on arrival" />
            </div>
            <p className="kit-muted kit-small"><ShieldCheck size={14} /> Instant confirmation on WhatsApp. Change or cancel up to 24 hours before.</p>
          </div>
        )}
      </motion.div>

      <div className="kit-nav">
        {step > 0 ? (
          <button type="button" className={ui.secondary} onClick={() => setStep(step - 1)}><ArrowLeft size={16} /> Back</button>
        ) : <span />}
        <button type="button" className={ui.primary} onClick={next} disabled={step !== 2 && !canNext}>
          {step === 3 ? <><CalendarCheck size={17} /> Confirm booking</> : <>Continue <ArrowRight size={16} /></>}
        </button>
      </div>
    </div>
  );
}

function Opt({ name, id, on, set, title, sub, wide }: {
  name: string; id: string; on: string; set: (v: string) => void; title: ReactNode; sub: string; wide?: boolean;
}) {
  return (
    <label className={`kit-opt${on === id ? " is-on" : ""}${wide ? " is-wide" : ""}`} htmlFor={`${name}-${id}`}>
      <input id={`${name}-${id}`} type="radio" name={name} value={id} checked={on === id} onChange={() => set(id)} />
      <span className="kit-opt-t">{title}</span>
      <span className="kit-opt-s">{sub}</span>
      <span className="kit-opt-dot" aria-hidden><Check size={13} /></span>
    </label>
  );
}

export function Field({ id, label, value, set, bad, hint, error, type = "text", area }: {
  id: string; label: string; value: string; set: (v: string) => void; bad?: boolean;
  hint?: string; error?: string; type?: string; area?: boolean;
}) {
  return (
    <div className={`kit-field${bad ? " is-bad" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {area
        ? <textarea id={id} value={value} onChange={(e) => set(e.target.value)} rows={3} />
        : <input id={id} type={type} value={value} onChange={(e) => set(e.target.value)} autoComplete="off" aria-invalid={bad || undefined} />}
      {(bad && error) ? <span className="kit-err">{error}</span> : hint ? <span className="kit-hint">{hint}</span> : null}
    </div>
  );
}
