"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FooterArrowIcon } from "@/components/footer/icons/FooterArrowIcon";
import Grain from "@/components/primitives/Grain";
import { useIsPhoneViewport } from "@/hooks/useIsPhoneViewport";
import { InteractiveCardGalleryMobile } from "./InteractiveCardGalleryMobile";
import { GalleryCloseButton, GalleryPager } from "./GalleryChrome";

export type TeamMember = {
  id: string;
  image: string;
  role: string;
  name: string;
  bio: string[];
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "alvin",
    image: "/images/alvin.png",
    role: "COO / FUND MANAGER",
    name: "ALVIN JOYEKURUN",
    bio: [
      "With over two decades of distinguished experience in the global financial arena, Alvin stands as a pillar of excellence in fund management and global fund structuring. His career, which commenced in 2005 in London, was marked by a formative tenure with industry leaders such as Deloitte Consulting and AON Hewitt, where he developed an incisive approach to investment consulting.",
      "In 2009, upon returning to Mauritius, Alvin broadened his expertise across asset management, banking, and insurance with premier institutions including MCB Group Ltd, SWAN Group Ltd, MUA Ltd, and Amicorp Group. Today, as the Senior Executive Officer and Fund Manager for ThinqAsset Fund Management in Mauritius and Dubai, he leverages an independent perspective and a holistic methodology to craft bespoke solutions for intricate financial challenges.",
      "Alvin’s credentials include a first-class BSc (Hons) in Actuarial Science from Cass Business School, London, the prestigious CFA designation (awarded in 2010), and Fellowship status with the Institute of Actuaries, UK underscoring his deep commitment to excellence and his expertise in global fund structuring.",
    ],
  },
  {
    id: "yash",
    image: "/images/yash2.png",
    role: "EXECUTIVE DIRECTOR",
    name: "YASH BAJPAI",
    bio: [
      "Yash Bajpai is Executive Director at ThinqAsset, where he focuses on structuring and managing alternative investment funds across the DIFC and Mauritius. He works closely with high-net-worth individuals, family offices, wealth managers and professional advisers across the Gulf, MENA and Southeast Asia, with a focus on private credit, private markets and cross-border investment structures. His role spans the full lifecycle of a fund, from structuring and execution through to ongoing coordination with legal, compliance, tax and administrative stakeholders.",
      "Prior to joining the investment management industry, Yash spent close to six years as Managing Director of Miyakawa Drives & Controls, a family-owned industrial business, where he was responsible for operations, financial oversight, vendor relationships and the eventual wind-down of the business. This operating experience continues to shape his approach to Allocation, risk and downside protection.",
      "He brings together practical business experience, jurisdictional expertise across multiple jurisdictions, and a relationship-driven network across the India–Gulf investment corridor. Yash holds an MBA from IBS Hyderabad.",
    ],
  },
  {
    id: "lakshana",
    image: "/images/lakshana.png",
    role: "HEAD OF COMPLIANCE",
    name: "LAKSHANA SESMUN",
    bio: [
      "Lakshana Sesmun leads the compliance function at ThinqAsset Fund Management Limited, bringing more than 15 years of experience across banking, fintech, fiduciary services and fund management to the firm's DIFC/DFSA-regulated operations. She specialises in AML/CFT, KYC/CDD, fund licensing and regulatory onboarding, with deep working knowledge of both the DFSA/DIFC and FSC Mauritius frameworks.",
      "Over her career she has acted as Money Laundering Reporting Officer and Compliance Officer for a broad portfolio of licensed funds, investment dealers and market participants — designing and implementing AML/CFT frameworks, leading regulatory audits and inspections, delivering board-level compliance reporting, and advising directors and senior management on governance and risk.",
      "Her earlier career spans senior compliance and governance roles within international fiduciary and fund administration groups, alongside risk, credit and operations positions at leading regional and international banks and fintech lenders. She also serves as an Independent Non-Executive Director on the boards of several regulated funds and companies. Lakshana holds a Bachelor's degree in Business Management & Economics (International Business) from the University of Bangalore, sustains her technical currency through ongoing AML/CFT training, and is fluent in English & French.",
    ],
  },
];

export const INDEPENDENT_DIRECTORS: TeamMember[] = [
  {
    id: "sunil-thawani",
    image: "/images/sil1.png",
    role: "INDEPENDENT DIRECTOR",
    name: "SUNIL THAWANI",
    bio: [
      "Sunil Thawani is an experienced business excellence and governance professional with a career spanning quality management, organisational transformation, sustainability, corporate governance, and institutional capacity building. He is a Fellow of the American Society for Quality (ASQ), an author and speaker, and serves as CEO of Quality Indeed Consulting Ltd. in the UAE.",
      "Over the course of his career, Sunil has advised organisations across government, financial services, healthcare, oil & gas, manufacturing, hospitality, education, port operations, and the social sector. His work has focused on improving organisational performance, customer experience, governance frameworks, and operational capabilities through internationally recognised quality and excellence standards.",
      "He is a recipient of the ASQ Lancaster Medal and has served on the boards of organisations including the American Society for Quality and Dubai Quality Group. He has also participated as a jury member for prominent institutional excellence programmes including the Dubai Quality Award and Sheikh Khalifa Excellence Award.",
      "Prior to establishing his consulting career, Sunil worked with organisations including Steel Authority of India, Dubai Ports Authority, ADNOC Distribution, Union National Bank and Abu Dhabi government entities. Today, his work increasingly focuses on sustainability, the circular economy and initiatives aligned with the United Nations Sustainable Development Goals. He has been invited by governments, international organisations, universities and private-sector institutions to share his experience and has published more than 60 technical papers. Sunil holds an MBA and a degree in Mechanical Engineering.",
    ],
  },
  {
    id: "swamy",
    image: "/images/sil2.png",
    role: "INDEPENDENT DIRECTOR",
    name: "Nanjundaswamy TC (Swamy), FCA.",
    bio: [
      "Nanjundaswamy TC (Swamy), FCA, is a senior tax and business advisory professional with extensive experience in international taxation, transaction advisory, transfer pricing, indirect taxes, M&A and cross-border structuring. Over the last decade, his work has increasingly centred on leadership roles combining technical expertise with commercial strategy, risk management, stakeholder engagement and the development of high-performing multidisciplinary teams.",
      "Throughout his career, he has advised multinational corporations, listed companies and entrepreneurial businesses on complex tax and transaction matters across the Middle East, Asia, Europe, the Americas and Australia. His experience includes value-chain restructuring, corporate tax implementation, transaction due diligence, IP and holding-company structures, acquisition and exit planning, transfer pricing and the tax implications of major corporate transactions.",
      "He has also led major international tax initiatives covering OECD BEPS, Country-by-Country Reporting, Master File and Local File requirements, DEMPE analysis and the implementation of BEPS Pillar Two and GloBE requirements for multinational groups.",
      "His sector experience spans technology, SaaS, financial and professional services, logistics, retail, e-commerce, FMCG, automotive and EVs, real estate, energy, oil & gas, healthcare, pharmaceuticals, infrastructure and industrial businesses. He has worked closely with entrepreneurs, CEOs, CFOs, tax authorities, financial institutions, private equity and venture capital investors, and tax-policy stakeholders, giving him a commercially grounded perspective on how taxation interacts with investment, transactions and long-term business strategy.",
    ],
  },
];

export const BOARD_MEMBERS: TeamMember[] = [
  {
    id: "board-member-1",
    image: "/images/sil3.png",
    role: "BOARD OF DIRECTORS",
    name: "BOARD MEMBER",
    bio: [
      "An accomplished investment professional with over two decades of experience spanning global banking, investment management, private capital and family office strategy.",
      "He brings deep expertise in capital allocation, investment strategy, portfolio management, corporate finance and governance, with experience navigating investments and strategic opportunities across international markets. His perspective combines institutional investment discipline with an entrepreneurial approach to building and scaling financial businesses.",
      "At ThinqAsset, he contributes to Board-level strategy and governance, with a particular focus on investment oversight, institutional partnerships, international expansion and the development of a globally connected platform for fund managers and sophisticated investors.",
    ],
  },
  {
    id: "board-member-2",
    image: "/images/sil4.png",
    role: "BOARD OF DIRECTORS",
    name: "BOARD MEMBER",
    bio: [
      "A seasoned investment and financial services professional with over two decades of experience across global banking, investment management, private capital and family office strategy.",
      "He brings an institutional perspective to capital allocation, portfolio strategy, corporate finance and governance, complemented by extensive exposure to private markets, financial services and cross-border investments.",
      "As a Board Member, he contributes to ThinqAsset’s strategic direction, investment oversight and governance, supporting the development of a globally connected investment platform built around disciplined capital stewardship, institutional standards and long-term value creation.",
    ],
  },
];

// Fluid transition easing curve
const FLUID_EASE = [0.22, 1, 0.36, 1] as const;

// Expanded metrics inside 1024x640 canvas (matches exact reference)
const EXPANDED_X = 119;
const EXPANDED_Y = 51;
const EXPANDED_W = 381;
const EXPANDED_H = 538;

export type InteractiveCardGalleryProps = {
  title?: string;
  members?: TeamMember[];
  /** Public nav pages only: restack for phones instead of scaling the desktop canvas. */
  mobileStack?: boolean;
};

export function InteractiveCardGallery({
  title = "Our Team",
  members = TEAM_MEMBERS,
  mobileStack = false,
}: InteractiveCardGalleryProps = {}) {
  const isPhone = useIsPhoneViewport();

  if (mobileStack && isPhone) {
    return <InteractiveCardGalleryMobile title={title} members={members} />;
  }

  return (
    <InteractiveCardGalleryDesktop title={title} members={members} />
  );
}

function InteractiveCardGalleryDesktop({
  title,
  members,
}: {
  title: string;
  members: TeamMember[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  const selectedIndex = members.findIndex((c) => c.id === selectedId);
  const selectedCard = selectedIndex !== -1 ? members[selectedIndex] : null;

  // Responsive canvas scale for viewports smaller than 1040px
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scaleX = (w - 32) / 1024;
      const scaleY = (h - 32) / 640;
      const s = Math.min(1, scaleX, scaleY);
      setScale(Math.max(0.35, s));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Overview metrics calculated dynamically based on card count
  const count = members.length;
  const isTwoCard = count === 2;
  const CARD_W_OVERVIEW = isTwoCard ? 288 : 280;
  const CARD_H_OVERVIEW = isTwoCard ? 406 : 395;
  const OVERVIEW_GAP = isTwoCard ? 40 : 32;
  const OVERVIEW_TOTAL_W = CARD_W_OVERVIEW * count + OVERVIEW_GAP * (count - 1);
  const OVERVIEW_START_X = Math.round((1024 - OVERVIEW_TOTAL_W) / 2);
  const OVERVIEW_Y = 168;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedId(null);
      } else if (e.key === "ArrowRight" && selectedCard) {
        const nextIdx = (selectedIndex + 1) % members.length;
        setSelectedId(members[nextIdx].id);
      } else if (e.key === "ArrowLeft" && selectedCard) {
        const prevIdx = (selectedIndex - 1 + members.length) % members.length;
        setSelectedId(members[prevIdx].id);
      }
    },
    [selectedCard, selectedIndex, members]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedCard) return;
    const nextIdx = (selectedIndex + 1) % members.length;
    setSelectedId(members[nextIdx].id);
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedCard) return;
    const prevIdx = (selectedIndex - 1 + members.length) % members.length;
    setSelectedId(members[prevIdx].id);
  };

  const bioScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bioScrollRef.current) {
      bioScrollRef.current.scrollTop = 0;
    }
  }, [selectedCard?.id]);

  return (
    <div
      data-transition-page
      className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden bg-transparent selection:bg-[color:var(--ta-gold)]/20 selection:text-white pt-24 pb-16"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .site-bg { display: block !important; }
            html { background-color: var(--ta-navy-deep) !important; }
            body {
              background: transparent !important;
              margin: 0 !important;
              padding: 0 !important;
            }
          `,
        }}
      />

      {/* Signature Atmospheric Film Grain */}
      <Grain />

      {/* Scaled viewport container */}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          width: 1024,
          height: 640,
        }}
        className="relative shrink-0 overflow-hidden z-10"
      >
        {/* ============================================================ */}
        {/* PAGE TITLE (Top Left in Overview mode)                       */}
        {/* ============================================================ */}
        <motion.div
          animate={{ opacity: selectedCard ? 0 : 1, y: selectedCard ? -12 : 0 }}
          transition={{ duration: 0.35, ease: FLUID_EASE }}
          style={{ left: OVERVIEW_START_X, top: 60 }}
          className="pointer-events-none absolute z-20"
        >
          <h1 className="font-[family-name:var(--font-lp-saturnia)] text-[34px] font-normal tracking-[0.015em] text-white leading-none">
            {title}
          </h1>
        </motion.div>

        {/* ============================================================ */}
        {/* EXPANDED CONTROLS (Top-right Close and Switcher)              */}
        {/* ============================================================ */}
        <motion.div
          animate={{
            opacity: selectedCard ? 1 : 0,
            y: selectedCard ? 0 : -10,
            pointerEvents: selectedCard ? "auto" : "none",
          }}
          transition={{ delay: selectedCard ? 0.45 : 0, duration: 0.3 }}
          className="absolute top-[20px] right-[40px] z-30 flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[10px]"
        >
          {/* Previous / Next Switcher */}
          <GalleryPager
            index={selectedIndex !== -1 ? selectedIndex + 1 : 1}
            total={members.length}
            onPrev={goToPrev}
            onNext={goToNext}
          />

          <GalleryCloseButton onClick={() => setSelectedId(null)} />
        </motion.div>

        {/* Stage background click target to close when expanded */}
        <div
          onClick={() => {
            if (selectedId !== null) setSelectedId(null);
          }}
          className="absolute inset-0 z-0"
        />

        {/* ============================================================ */}
        {/* PORTRAIT CARDS (Persistent in stage, fluid morphing)         */}
        {/* ============================================================ */}
        {members.map((card, idx) => {
          const isSelected = selectedId === card.id;
          const isOtherSelected = selectedId !== null && !isSelected;
          const isHovered = hoveredId === card.id && selectedId === null;
          const isOtherHovered = hoveredId !== null && !isHovered && selectedId === null;

          // Overview layout coordinates
          const overviewX = OVERVIEW_START_X + idx * (CARD_W_OVERVIEW + OVERVIEW_GAP);
          const overviewY = OVERVIEW_Y;

          // Target coordinates
          const targetX = isSelected ? EXPANDED_X : overviewX;
          const targetY = isSelected ? EXPANDED_Y : overviewY;
          const targetW = isSelected ? EXPANDED_W : CARD_W_OVERVIEW;
          const targetH = isSelected ? EXPANDED_H : CARD_H_OVERVIEW;

          return (
            <motion.div
              key={card.id}
              data-card-id={card.id}
              onClick={(e) => {
                e.stopPropagation();
                if (selectedId === null) {
                  setSelectedId(card.id);
                  setHoveredId(null);
                } else if (selectedId === card.id) {
                  setSelectedId(null);
                }
              }}
              onMouseEnter={() => {
                if (selectedId === null) setHoveredId(card.id);
              }}
              onMouseLeave={() => {
                if (selectedId === null) setHoveredId(null);
              }}
              initial={false}
              animate={{
                x: targetX,
                y: targetY,
                width: targetW,
                height: targetH,
                opacity: isOtherSelected ? 0 : isOtherHovered ? 0.35 : 1,
                scale: isOtherSelected ? 0.92 : isHovered ? 1.03 : 1,
                zIndex: isSelected ? 20 : isHovered ? 10 : 1,
                pointerEvents: isOtherSelected ? "none" : "auto",
              }}
              transition={{
                x: {
                  duration: selectedId ? 0.55 : 0.52,
                  delay: selectedId ? 0 : 0.1,
                  ease: FLUID_EASE,
                },
                y: {
                  duration: selectedId ? 0.55 : 0.52,
                  delay: selectedId ? 0 : 0.1,
                  ease: FLUID_EASE,
                },
                width: {
                  duration: selectedId ? 0.55 : 0.52,
                  delay: selectedId ? 0 : 0.1,
                  ease: FLUID_EASE,
                },
                height: {
                  duration: selectedId ? 0.55 : 0.52,
                  delay: selectedId ? 0 : 0.1,
                  ease: FLUID_EASE,
                },
                opacity: {
                  duration: isOtherSelected ? 0.22 : 0.3,
                  delay: isOtherSelected ? 0 : selectedId === null ? 0.2 : 0,
                },
                scale: {
                  duration: 0.35,
                  ease: FLUID_EASE,
                },
              }}
              className="group absolute top-0 left-0 cursor-pointer overflow-hidden rounded-[14px] border border-white/10 bg-ta-maroon transition-[border-color,box-shadow] duration-300 hover:border-[color:var(--ta-gold)]/50"
              style={{
                boxShadow: isSelected
                  ? "0 28px 56px -12px rgba(0, 0, 0, 0.85), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)"
                  : isHovered
                  ? "0 28px 56px -12px rgba(0, 0, 0, 0.9), 0 0 24px 0 rgba(182, 160, 130, 0.18), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)"
                  : "0 14px 36px -8px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)",
              }}
            >
              <Image
                src={card.image}
                alt={card.name}
                fill
                priority
                sizes="381px"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />

              {/* Glass reflection overlay */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-white/[0.06] transition-opacity duration-300 group-hover:from-black/85 group-hover:to-white/[0.12]"
              />

              {/* Bottom panel on hover (Overview mode only) */}
              {selectedId === null && (
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 12,
                  }}
                  transition={{ duration: 0.26, ease: FLUID_EASE }}
                  className="pointer-events-none absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between gap-3 rounded-[12px] border border-white/20 p-2.5 pl-3.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.22)] backdrop-blur-xl"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--ta-maroon) 88%, transparent)",
                  }}
                >
                  {/* Left majority portion: Name on top, Role moved to below */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-[family-name:var(--font-lp-saturnia)] text-[14px] font-normal tracking-[0.015em] text-white truncate leading-tight">
                      {card.name}
                    </h3>
                    <span className="mt-0.5 block truncate font-[family-name:var(--font-geist-mono)] text-[8.5px] font-bold uppercase tracking-[0.18em] text-[color:var(--ta-gold)]">
                      {card.role}
                    </span>
                  </div>

                  {/* Right minority portion: Animated external diagonal arrow */}
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border shadow-inner transition-all duration-300"
                    style={{
                      borderColor: isHovered ? "rgba(182, 160, 130, 0.6)" : "rgba(255, 255, 255, 0.2)",
                      backgroundColor: isHovered ? "rgba(182, 160, 130, 0.2)" : "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <div className="relative h-2.5 w-2.5 overflow-hidden">
                      {/* Primary Arrow - slides out to top-right on card hover */}
                      <div
                        className="absolute inset-0 text-white/75 transition-transform duration-300 ease-out"
                        style={{
                          transform: isHovered ? "translate(100%, -100%)" : "translate(0%, 0%)",
                        }}
                      >
                        <FooterArrowIcon />
                      </div>
                      {/* Secondary Arrow - enters from bottom-left on card hover */}
                      <div
                        className="absolute inset-0 text-[color:var(--ta-gold)] transition-transform duration-300 ease-out"
                        style={{
                          transform: isHovered ? "translate(0%, 0%)" : "translate(-100%, 100%)",
                        }}
                      >
                        <FooterArrowIcon />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {/* ============================================================ */}
        {/* CENTER SPINE: 1px divider down the middle (x=512px)          */}
        {/* Draws down once the image finishes translating left          */}
        {/* ============================================================ */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{
            scaleY: selectedCard ? 1 : 0,
            opacity: selectedCard ? 1 : 0,
          }}
          transition={{
            scaleY: {
              delay: selectedCard ? 0.38 : 0,
              duration: selectedCard ? 0.45 : 0.18,
              ease: FLUID_EASE,
            },
            opacity: {
              delay: selectedCard ? 0.38 : 0,
              duration: selectedCard ? 0.35 : 0.18,
            },
          }}
          style={{
            originY: 0,
            background:
              "linear-gradient(180deg, transparent 0%, var(--ta-grey-border) 15%, var(--ta-grey-border) 85%, transparent 100%)",
          }}
          className="absolute top-0 left-[512px] h-[640px] w-px z-10"
        />

        {/* ============================================================ */}
        {/* RIGHT COLUMN TEXT: Exact vertical height 538px (top=51px)    */}
        {/* Perfectly aligns with the top and bottom of the image!       */}
        {/* Symmetrically spaced 12px from spine (left: 524px)           */}
        {/* ============================================================ */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            left: 524,
            top: 51,
            width: 381,
            height: 538,
            pointerEvents: selectedCard ? "auto" : "none",
          }}
          className="z-10 flex flex-col justify-between"
        >
          {/* Top Header: Aligns with exact top of the image (y=51px) */}
          <motion.div
            initial={false}
            animate={{
              opacity: selectedCard ? 1 : 0,
              y: selectedCard ? 0 : -14,
            }}
            transition={{
              delay: selectedCard ? 0.44 : 0,
              duration: selectedCard ? 0.45 : 0.18,
              ease: FLUID_EASE,
            }}
          >
            <AnimatePresence mode="wait">
              {selectedCard && (
                <motion.div
                  key={`header-${selectedCard.id}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="font-[family-name:var(--font-lp-saturnia)] text-[24px] font-normal tracking-[0.015em] leading-tight text-white">
                    {selectedCard.name}
                  </h2>
                  <p className="mt-1 font-[family-name:var(--font-geist-mono)] text-[10px] font-bold uppercase leading-none tracking-[0.2em] text-[color:var(--ta-gold)]">
                    {selectedCard.role}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Executive Biography Content: Aligned to the bottom of the image (y=589px) */}
          <motion.div
            ref={bioScrollRef}
            initial={false}
            animate={{
              opacity: selectedCard ? 1 : 0,
              y: selectedCard ? 0 : 16,
            }}
            transition={{
              delay: selectedCard ? 0.48 : 0,
              duration: selectedCard ? 0.48 : 0.18,
              ease: FLUID_EASE,
            }}
            className="max-h-[465px] overflow-y-auto overscroll-auto pr-2 select-text [scrollbar-width:thin] [scrollbar-color:rgba(182,160,130,0.4)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[color:var(--ta-gold)]/40 hover:[&::-webkit-scrollbar-thumb]:bg-[color:var(--ta-gold)]/70 [&::-webkit-scrollbar-track]:bg-transparent"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
            }}
          >
            <AnimatePresence mode="wait">
              {selectedCard && (
                <motion.div
                  key={`bio-${selectedCard.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2.5 font-[family-name:var(--font-inter)] text-[11.5px] font-normal leading-[1.62] tracking-[-0.01em] text-[color:var(--ta-grey-light)]"
                >
                  {selectedCard.bio.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
