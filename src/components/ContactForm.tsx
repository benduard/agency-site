import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  service: z.enum(['AI Agent', 'Lead Generation', 'CRM Sync'], {
    errorMap: () => ({ message: 'Please select a service' }),
  }),
  companyName: z.string().min(1, 'Company name is required'),
  problems: z.string().min(50, 'Please provide at least 50 characters'),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { error: supabaseError } = await supabase
        .from('consultation_requests')
        .insert([{
          full_name: data.fullName,
          email: data.email,
          service: data.service,
          company_name: data.companyName,
          problems: data.problems,
          additional_info: data.additionalInfo || null,
        }]);

      if (supabaseError) throw supabaseError;

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to submit form. Please try again later.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 rounded-2xl p-8 shadow-xl animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Get Started with AI Automation</h1>
            <p className="text-neutral-400">
              Fill out the form below and our team will get back to you within 24 hours to discuss
              how we can help transform your business with AI.
            </p>
          </div>

          {isSubmitted && (
            <div className="mb-6 p-4 bg-primary-500/20 rounded-lg flex items-center gap-2 animate-scale-in">
              <CheckCircle className="text-primary-500 w-5 h-5" />
              <span className="text-white">Thank you! We'll be in touch soon.</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-error-500/20 rounded-lg text-error-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-neutral-300">
                Full Name <span className="text-primary-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                {...register('fullName')}
                className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-error-500">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300">
                Email Address <span className="text-primary-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="john@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-neutral-300">
                Service <span className="text-primary-500">*</span>
              </label>
              <select
                id="service"
                {...register('service')}
                className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Select a service</option>
                <option value="AI Agent">AI Agent</option>
                <option value="Lead Generation">Lead Generation</option>
                <option value="CRM Sync">CRM Sync</option>
              </select>
              {errors.service && (
                <p className="mt-1 text-sm text-error-500">{errors.service.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-neutral-300">
                Company Name <span className="text-primary-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                {...register('companyName')}
                className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Company Inc."
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-error-500">{errors.companyName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="problems" className="block text-sm font-medium text-neutral-300">
                What problems are you looking to solve? <span className="text-primary-500">*</span>
              </label>
              <textarea
                id="problems"
                {...register('problems')}
                rows={4}
                className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Please describe the challenges you're facing and what you hope to achieve with our services..."
              />
              {errors.problems && (
                <p className="mt-1 text-sm text-error-500">{errors.problems.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-neutral-300">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                {...register('additionalInfo')}
                rows={3}
                className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Any other details you'd like to share..."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}