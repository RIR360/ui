'use client';

import { forwardRef, FormEvent, HTMLAttributes, useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
  submitLabel?: string;
}

const ContactForm = forwardRef<HTMLFormElement, ContactFormProps>(
  ({ onSubmit, submitLabel = 'Send Message', className = '', ...props }, ref) => {
    const [form, setForm] = useState<ContactFormData>({
      name: '',
      email: '',
      message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!onSubmit) return;
      setLoading(true);
      try {
        await onSubmit(form);
      } finally {
        setLoading(false);
      }
    };

    const inputClass =
      'w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors';

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={`space-y-5 ${className}`}
        {...props}
      >
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="contact-message"
            required
            rows={5}
            placeholder="How can we help?"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Sending...' : submitLabel}
        </button>
      </form>
    );
  }
);

ContactForm.displayName = 'ContactForm';
export default ContactForm;
