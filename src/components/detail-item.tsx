import type { JSX } from "react";
/**
 * Renders a labeled detail item in a two-column layout.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text displayed on the left (e.g. "Name").
 * @param {string} props.value - The value text displayed on the right (e.g. "Luke Skywalker").
 * @returns {JSX.Element} A styled detail row with label and value.
 */
export function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element {
  return (
    <div className="py-2 flex gap-2">
      <div className="flex-auto max-w-[40%] text-lg font-medium text-gray-500 dark:text-gray-400">
        {label}
      </div>
      <div className="flex-auto text-lg col-span-2 text-gray-900 dark:text-gray-100">
        {value || "—"}
      </div>
    </div>
  );
}
