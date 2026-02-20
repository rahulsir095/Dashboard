export default function AIPulse() {
  return (
    <div
      className="
        rounded-xl p-5
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        shadow-sm
      "
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
          AI Pulse Summary
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Real-time insights from your data
        </p>
      </div>

      {/* Insights */}
      <div className="space-y-3 text-sm">
        <div
          className="
            rounded-lg p-3
            bg-violet-50 text-violet-700
            dark:bg-violet-950/40 dark:text-violet-300
          "
        >
          Harshita has the highest workload with 35 classes
        </div>

        <div
          className="
            rounded-lg p-3
            bg-green-50 text-green-700
            dark:bg-green-950/40 dark:text-green-300
          "
        >
          Class 1A has the most students enrolled
        </div>

        <div
          className="
            rounded-lg p-3
            bg-amber-50 text-amber-700
            dark:bg-amber-950/40 dark:text-amber-300
          "
        >
          Class 11A has no active students — consider review
        </div>
      </div>
    </div>
  );
}