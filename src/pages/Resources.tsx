import { PageMeta } from "../components/layout/PageMeta";
import { CtaBanner } from "../components/cta/CtaBanner";
import { resourceArticles } from "../data/resourceArticles";

export default function Resources() {
  return (
    <>
      <PageMeta
        title="Engineering Insights &amp; Strategy Guides"
        description="Guides and technical playbooks from Pranayansh Technologies on enterprise software engineering, cloud migrations, and production AI architectures."
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
            Playbooks &amp; Research
          </span>
          <h1 className="mt-2 font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
            Engineering Insights &amp; Strategy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] dark:text-[#C6C6C6] leading-relaxed font-sans">
            Practical playbooks on scaling technical organizations, choosing optimal engagement models, and executing modern cloud &amp; AI architectures.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resourceArticles.map((article) => (
            <article
              key={article.id}
              className="clean-card flex flex-col justify-between rounded-xl border border-[#E0E0E0] bg-white p-8 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
                    {article.category}
                  </span>
                  <span className="font-mono text-[11px] text-[#8D8D8D]">
                    {article.readTime}
                  </span>
                </div>

                <h2 className="mt-4 font-heading text-xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
                  {article.title}
                </h2>

                <p className="font-mono mt-1 text-[11px] text-[#8D8D8D] uppercase tracking-wider">
                  {new Date(article.publishedDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-[#525252] dark:text-[#C6C6C6] font-sans">
                  {article.body}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E0E0E0] dark:border-[#2D2D2D]">
                <a
                  href="/get-a-quote"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF462D] hover:text-[#BA2212] dark:text-[#FF7561] transition"
                >
                  Discuss This Topic with an Architect →
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <CtaBanner
          heading="Have a question about scaling your engineering team?"
          body="Our solutions architects are happy to talk through your specific technical roadmap and talent requirements."
          ctaLabel="Schedule Consultation"
          to="/contact"
        />
      </div>
    </>
  );
}
