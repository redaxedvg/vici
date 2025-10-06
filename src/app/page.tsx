import { CountdownTimer } from "@/components/countdown-timer";
import { BackgroundBeams } from "@/components/ui/background-beams";

const launchDate = "2026-01-13T15:00:00.000Z";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background text-foreground">
      <BackgroundBeams className="opacity-40" />

      <div className="relative z-10 flex items-center justify-center px-6 text-center sm:px-8">
        <CountdownTimer targetDate={launchDate} />
      </div>
    </main>
  );
}
