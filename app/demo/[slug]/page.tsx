import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { businesses, getBusiness } from "@/data/businesses";
import { themeToStyle } from "@/lib/theme";
import { DemoHero } from "@/components/demo/DemoHero";
import { AutomationShowcase } from "@/components/demo/AutomationShowcase";
import { PawsomeExperience } from "@/components/pawsome/PawsomeExperience";
import { BrightSmileExperience } from "@/components/brightsmile/BrightSmileExperience";
import { EmberExperience } from "@/components/ember/EmberExperience";
import { FlourBloomExperience } from "@/components/flourbloom/FlourBloomExperience";
import {
  AutomationList,
  DemoBanner,
  DemoContactCta,
  DemoFooter,
  DemoNav,
  FeatureList,
  Proof,
  Services,
} from "@/components/demo/DemoSections";

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const business = getBusiness(params.slug);
  if (!business) return { title: "Demo not found" };
  return {
    title: `${business.name} — ${business.niche} demo`,
    description: business.heroSubtitle,
  };
}

export default function DemoPage({ params }: { params: { slug: string } }) {
  const business = getBusiness(params.slug);
  if (!business) notFound();

  // Pawsome Grooming ships a bespoke, Awwwards-grade experience.
  if (business.slug === "pet-care") {
    return <PawsomeExperience />;
  }

  // Bright Smile Dental ships its own bespoke, light-themed experience.
  if (business.slug === "dentist") {
    return <BrightSmileExperience />;
  }

  // Olive & Ember ships the "Tend the Fire" experience.
  if (business.slug === "restaurant") {
    return <EmberExperience />;
  }

  // Flour & Bloom ships the bespoke "Bakehouse" experience.
  if (business.slug === "bakery") {
    return <FlourBloomExperience />;
  }

  return (
    <div style={themeToStyle(business.theme)} className="bg-white font-sans text-gray-900">
      <DemoBanner business={business} />
      <DemoNav business={business} />
      <main>
        <DemoHero business={business} />
        <Services business={business} />
        <FeatureList business={business} />
        <AutomationList business={business} />
        <AutomationShowcase business={business} />
        <Proof business={business} />
        <DemoContactCta business={business} />
      </main>
      <DemoFooter business={business} />
    </div>
  );
}
