
import React, { useState } from 'react';

interface NewsletterProps {
  setShowNewsletter: (show: boolean) => void;
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  companyName: string;
  website: string;
}

const Newsletter: React.FC<NewsletterProps> = ({ setShowNewsletter }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    title: '',
    companyName: '',
    website: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('subscribed', 'true');
          setSubmitSuccess(true);
          setTimeout(() => setShowNewsletter(false), 3000);
        } else {
          throw new Error(data.message || 'Subscription failed');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Subscribe to our Newsletter</h2>
        {submitSuccess ? (
          <div className="text-green-600 dark:text-green-400 mb-4">
            Successfully subscribed! Thank you for joining our newsletter.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <input
                  type={key === 'email' ? 'email' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors[key as keyof FormData] ? 'border-red-500' : ''
                  }`}
                  required={key === 'email' || key === 'firstName' || key === 'lastName'}
                />
                {errors[key as keyof FormData] && (
                  <p className="text-red-500 text-sm mt-1">{errors[key as keyof FormData]}</p>
                )}
              </div>
            ))}
            {submitError && (
              <div className="text-red-500 mb-4">{submitError}</div>
            )}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
              <button
                type="button"
                onClick={() => setShowNewsletter(false)}
                className="text-gray-600 dark:text-gray-300 hover:underline"
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
