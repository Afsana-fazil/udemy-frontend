import InstructorHero from "@/components/instructor/hero";
import Reasons from "@/components/instructor/Reasons";
import Instruction from "@/components/instructor/Instruction";
import Slider from "@/components/instructor/Slider";
import SupportPage from "@/components/instructor/SupportPage";
import Instructor from "@/components/instructor/Instructor";

export const metadata = {
  title: 'Teach Online - Share your knowledge with millions of students across the globe and earn money',
}

export default function TeachPage() {
  return (
    <div className="min-h-screen">
      <InstructorHero />
      <Reasons />
      <Instruction />
      <Slider />
      <SupportPage />
      <Instructor />
    </div>
  );
}
