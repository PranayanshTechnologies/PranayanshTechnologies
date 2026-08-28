import { PageMeta } from "../components/layout/PageMeta";

/**
 * Describes how data submitted via Get a Quote, Contact, and Careers forms is
 * collected and used (FR-019). Linked from every page's footer and from every
 * lead-capture form's consent checkbox (FR-020).
 */
export default function PrivacyPolicy() {
  return (
    <>
      <PageMeta
        title="Privacy Policy"
        description="How Pranayansh Technologies collects, uses, and protects information submitted through our Get a Quote, Contact, and Careers forms."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Last updated: July 2026
        </p>

        <div className="mt-8 space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              What we collect
            </h2>
            <p className="mt-2">
              When you submit the <strong>Get a Quote</strong>, <strong>Contact</strong>, or{" "}
              <strong>Careers / Join Our Network</strong> forms, we collect the information you
              provide directly, such as your name, company, email address, phone number,
              technology background, and any message or requirements you share with us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              How we use it
            </h2>
            <p className="mt-2">
              We use this information solely to respond to your inquiry: to follow up on quote
              requests, answer general questions submitted through the Contact form, and evaluate
              candidate interest submitted through the Careers page. We do not sell your
              information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Where it is stored
            </h2>
            <p className="mt-2">
              Form submissions are transmitted to a hosted form-processing service that routes
              inquiries to our team. We retain submissions only as long as needed to respond to
              and process your inquiry.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Your consent
            </h2>
            <p className="mt-2">
              Each lead-capture form requires you to explicitly check a consent box before
              submission, confirming that you agree to this Privacy Policy. You may contact us at
              any time to request that we delete information you have submitted.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
