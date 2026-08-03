"use client";

import { useState, FormEvent, useRef, useCallback } from "react";
import { Send, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

interface FormData {
  name: string;
  email: string;
  subject: string;
  opportunityType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  opportunityType?: string;
  message?: string;
}

type FormStatus =
  | { type: "idle" }
  | { type: "error"; message: string }
  | { type: "mailto"; message: string }
  | { type: "unconfigured"; message: string };

const opportunityOptions = [
  "Job Opportunity",
  "Internship",
  "AI Project",
  "Full-Stack Project",
  "Research Collaboration",
  "Other",
];

function isPlaceholder(value: string): boolean {
  return value.startsWith("[EDITABLE");
}

function validate(data: FormData): FormErrors {
  const next: FormErrors = {};
  if (!data.name.trim()) {
    next.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    next.name = "Name must be at least 2 characters";
  }

  if (!data.email.trim()) {
    next.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    next.email = "Please enter a valid email address";
  }

  if (!data.subject.trim()) {
    next.subject = "Subject is required";
  } else if (data.subject.trim().length < 3) {
    next.subject = "Subject must be at least 3 characters";
  }

  if (!data.opportunityType) {
    next.opportunityType = "Please select an opportunity type";
  }

  if (!data.message.trim()) {
    next.message = "Message is required";
  } else if (data.message.trim().length < 20) {
    next.message = "Message must be at least 20 characters";
  } else if (data.message.trim().length > 2000) {
    next.message = "Message must be at most 2000 characters";
  }

  return next;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    opportunityType: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const opportunityRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const fieldRefs: Record<string, React.RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>> = {
    name: nameRef,
    email: emailRef,
    subject: subjectRef,
    opportunityType: opportunityRef,
    message: messageRef,
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setStatus({ type: "idle" });
      if (touched[name]) {
        const singleError = validate({ ...formData, [name]: value });
        setErrors((prev) => {
          const next = { ...prev };
          if (singleError[name as keyof FormErrors]) {
            next[name as keyof FormErrors] = singleError[name as keyof FormErrors];
          } else {
            delete next[name as keyof FormErrors];
          }
          return next;
        });
      }
    },
    [formData, touched]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const singleError = validate(formData);
      setErrors((prev) => {
        const next = { ...prev };
        if (singleError[name as keyof FormErrors]) {
          next[name as keyof FormErrors] = singleError[name as keyof FormErrors];
        } else {
          delete next[name as keyof FormErrors];
        }
        return next;
      });
    },
    [formData]
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      subject: true,
      opportunityType: true,
      message: true,
    });

    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Focus first invalid field
      const fieldOrder = ["name", "email", "subject", "opportunityType", "message"];
      for (const field of fieldOrder) {
        if (nextErrors[field as keyof FormErrors]) {
          fieldRefs[field]?.current?.focus();
          break;
        }
      }
      setStatus({ type: "error", message: "Please correct the errors above." });
      return;
    }

    if (isPlaceholder(siteConfig.email)) {
      setStatus({
        type: "unconfigured",
        message:
          "A real contact email must be added in src/data/site.ts before this form can prepare a message.",
      });
      return;
    }

    // Build mailto URL
    const mailBody = [
      `From: ${formData.name} <${formData.email}>`,
      `Opportunity Type: ${formData.opportunityType}`,
      "",
      formData.message,
    ].join("\n");

    const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailtoUrl;

    setStatus({
      type: "mailto",
      message:
        "Your email application has been opened. Please review and send the message.",
    });
  }

  function getFieldError(field: keyof FormErrors): string | undefined {
    return touched[field] ? errors[field] : undefined;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
      noValidate
    >
      {/* Row 1: Name + Email */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="contact-name"
          name="name"
          label="Name"
          required
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={nameRef}
          error={getFieldError("name")}
          placeholder="Your name"
          autoComplete="name"
          type="text"
        />
        <Field
          id="contact-email"
          name="email"
          label="Email"
          required
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={emailRef}
          error={getFieldError("email")}
          placeholder="your@email.com"
          autoComplete="email"
          type="email"
        />
      </div>

      {/* Row 2: Subject + Opportunity Type */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="contact-subject"
          name="subject"
          label="Subject"
          required
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={subjectRef}
          error={getFieldError("subject")}
          placeholder="Message subject"
          autoComplete="off"
          type="text"
        />
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-opportunity"
            className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle"
          >
            Opportunity Type <span className="text-accent">*</span>
          </label>
          <select
            id="contact-opportunity"
            name="opportunityType"
            value={formData.opportunityType}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={opportunityRef}
            aria-invalid={!!getFieldError("opportunityType")}
            aria-describedby={
              getFieldError("opportunityType")
                ? "contact-opportunity-error"
                : undefined
            }
            className={cn(
              "h-[46px] appearance-none border bg-background px-4 py-3 font-sans text-sm text-foreground focus:outline-none",
              getFieldError("opportunityType")
                ? "border-accent"
                : "border-border focus:border-accent"
            )}
          >
            <option value="" disabled>
              Select type
            </option>
            {opportunityOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {getFieldError("opportunityType") && (
            <span
              id="contact-opportunity-error"
              className="font-mono text-[10px] text-accent"
            >
              {getFieldError("opportunityType")}
            </span>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle"
        >
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={messageRef}
          placeholder="Tell me about your project or opportunity..."
          rows={6}
          aria-invalid={!!getFieldError("message")}
          aria-describedby={
            getFieldError("message") ? "contact-message-error" : undefined
          }
          className={cn(
            "resize-none border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground-subtle/50 focus:outline-none",
            getFieldError("message")
              ? "border-accent"
              : "border-border focus:border-accent"
          )}
        />
        {getFieldError("message") && (
          <span id="contact-message-error" className="font-mono text-[10px] text-accent">
            {getFieldError("message")}
          </span>
        )}
      </div>

      {/* Submit */}
      <div className="flex flex-col gap-3">
        <button
          type="submit"
          data-cursor="SEND"
          className="inline-flex h-11 items-center justify-center gap-2 bg-accent px-6 font-mono text-xs uppercase tracking-wider text-background transition-all hover:-translate-y-0.5 hover:bg-accent-hover sm:self-end"
        >
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
          Prepare message
        </button>

        {/* Status */}
        {status.type !== "idle" && (
          <div
            className={cn(
              "flex items-start gap-2 text-sm",
              status.type === "error" && "text-accent",
              status.type === "mailto" && "text-success",
              status.type === "unconfigured" && "text-warning"
            )}
            role="status"
            aria-live="polite"
          >
            {status.type === "error" && (
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            )}
            {(status.type === "mailto" || status.type === "unconfigured") && (
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            )}
            <span>{status.message}</span>
          </div>
        )}
      </div>

      {/* Privacy note */}
      <p className="text-xs leading-relaxed text-foreground-subtle">
        This portfolio does not store form submissions. The form prepares a
        message in your email application.
      </p>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  required,
  value,
  onChange,
  onBlur,
  ref,
  error,
  placeholder,
  autoComplete,
  type,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref: React.RefObject<HTMLInputElement | null>;
  error?: string;
  placeholder: string;
  autoComplete: string;
  type: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle"
      >
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-[46px] border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground-subtle/50 focus:outline-none",
          error ? "border-accent" : "border-border focus:border-accent"
        )}
      />
      {error && (
        <span id={`${id}-error`} className="font-mono text-[10px] text-accent">
          {error}
        </span>
      )}
    </div>
  );
}
