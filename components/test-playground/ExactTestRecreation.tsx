"use client";

import Image from "next/image";

export function ExactTestRecreation() {
  return (
    <div
      data-transition-page
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#141213] selection:bg-white/20 selection:text-white"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .site-bg { display: none !important; }
            html, body {
              background: #141213 !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow-x: hidden;
            }
          `,
        }}
      />

      {/* Main 1024x640 exact aspect canvas container */}
      <div className="relative mx-auto flex h-auto min-h-screen w-full max-w-[1024px] flex-col overflow-hidden py-10 md:h-[640px] md:min-h-0 md:flex-row md:py-0">
        {/* Left Column: Portrait photo */}
        <div className="relative flex w-full items-center justify-center px-6 md:h-full md:w-[512px] md:shrink-0 md:justify-end md:pr-[12px] md:pl-[119px]">
          <div
            data-transition-item
            className="relative aspect-[381/538] w-full max-w-[381px] overflow-hidden rounded-[8px] bg-[#1a1718] md:h-[538px] md:w-[381px]"
          >
            <Image
              src="/images/elita-paloma-newton.png"
              alt="Paloma Newton"
              fill
              priority
              sizes="381px"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Center 1px vertical divider */}
        <div
          aria-hidden
          className="relative my-8 h-px w-full bg-[#262425] md:my-0 md:h-full md:w-px md:shrink-0"
        />

        {/* Right Column: Header & Quote */}
        <div className="relative flex w-full flex-col justify-between px-6 pt-4 pb-8 md:h-full md:w-[511px] md:shrink-0 md:pt-[48px] md:pb-[57px] md:pr-[40px] md:pl-[13px]">
          {/* Top Header */}
          <div data-transition-item className="md:pl-[8px]">
            <h1
              data-transition-text="headline"
              className="font-sans text-[13px] font-extrabold uppercase tracking-[0.015em] leading-none text-white"
              style={{
                fontFamily:
                  'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              ELITA GENETICS
            </h1>
            <p
              data-transition-text="body"
              className="mt-[5px] text-[9.5px] font-bold uppercase tracking-[0.08em] leading-none text-[#989898]"
              style={{
                fontFamily:
                  '"Courier New", "Courier", var(--font-lp-saturnia), monospace, serif',
              }}
            >
              PALOMA NEWTON
            </p>
          </div>

          {/* Bottom Testimonial Quote */}
          <div data-transition-item className="mt-8 md:mt-0 md:max-w-[400px]">
            <p
              data-transition-text="body"
              className="text-[12.5px] font-normal leading-[18px] tracking-[-0.012em] text-[#f4f4f4]"
              style={{
                fontFamily:
                  'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              <span className="block md:whitespace-nowrap">&quot;Elli, Ben, Markus, Harrison, and the SSV team have been more</span>
              <span className="block md:whitespace-nowrap">than investors &mdash; they&rsquo;ve been an extension of our team. Their</span>
              <span className="block md:whitespace-nowrap">founder experience, hands-on support, and deep network</span>
              <span className="block md:whitespace-nowrap">made a real impact: from simplifying investor processes to</span>
              <span className="block md:whitespace-nowrap">critical intros across customers and capital. They backed us</span>
              <span className="block md:whitespace-nowrap">before we were even fully formed &mdash; and helped shape who</span>
              <span className="block md:whitespace-nowrap">we&rsquo;ve become.&quot;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
