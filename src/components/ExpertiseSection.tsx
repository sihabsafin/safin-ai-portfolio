import { SectionHeader } from "./expertise/SectionHeader";
import { CapabilityGrid } from "./expertise/CapabilityGrid";
import { WorkflowTimeline } from "./expertise/WorkflowTimeline";
import { DomainStrip } from "./expertise/DomainStrip";

export const ExpertiseSection = () => {
  return (
    <section id="expertise" className="section-padding relative overflow-hidden">
      {/* Background — continues Hero / About visual language */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 90% 15%, rgba(79,70,229,0.07), transparent 60%), " +
            "radial-gradient(ellipse 45% 40% at 5% 75%, rgba(56,189,248,0.05), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-25" />

      <div className="container-narrow relative z-10">
        <SectionHeader />
        <CapabilityGrid />
        <WorkflowTimeline />
        <DomainStrip />
      </div>
    </section>
  );
};