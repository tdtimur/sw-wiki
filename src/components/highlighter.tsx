import { cn } from "@/lib/utils";

interface HighlightProps {
  text: string;
  highlight: string;
  className?: string;
}

// Highlights substring `highlight` contained
// in `text`, to indicate string match.
export function Highlighter({ text, highlight, className = "" }: HighlightProps) {
  if (!highlight) return <>{text}</>;

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className={cn(className, "bg-yellow-300 font-semibold")}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}
