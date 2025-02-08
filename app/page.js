import { HeroFooter } from "@/app/components/landingpage/HeroFooter";
import { AnalyticsFeatures } from "@/app/components/landingpage/AnalyticsFeatures";
import { ContactAndProfileFeatures } from "@/app/components/landingpage/ContactAndProfileFeatures";
import { JobTrackingFeatures } from "@/app/components/landingpage/JobTrackingFeatures";
import { HeroSection } from "@/app/components/landingpage/HeroSection";

export default function Home() {
  return (
    <main className="h-full w-full overflow-x-hidden">
      <HeroSection />

      <JobTrackingFeatures />

      <ContactAndProfileFeatures />

      <AnalyticsFeatures />

      <HeroFooter />
    </main>
  );
}
