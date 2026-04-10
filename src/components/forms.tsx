import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
};

export function TextField({ label, name, type = "text", placeholder, defaultValue, required }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm text-[var(--foreground)]">
      <span className="font-medium">{label}</span>
      <input
        className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
      />
    </label>
  );
}

export function TextAreaField({ label, name, placeholder, defaultValue }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm text-[var(--foreground)]">
      <span className="font-medium">{label}</span>
      <textarea
        className="min-h-28 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
        name={name}
        placeholder={placeholder}
        defaultValue={typeof defaultValue === "string" ? defaultValue : undefined}
      />
    </label>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:opacity-95" type="submit">
      {children}
    </button>
  );
}
