export default function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-sm font-black text-emerald-700 dark:text-emerald-200">{eyebrow}</p>
        <h2 className="text-2xl font-black text-slate-950 dark:text-white sm:text-3xl">{title}</h2>
      </div>
      <p className="max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-right">{desc}</p>
    </div>
  );
}
