const SensorCard = ({ title, value, unit }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <p className="text-sm uppercase tracking-widest text-slate-400">
        {title}
      </p>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-5xl font-bold">
          {value ?? "--"}
        </span>

        <span className="mb-2 text-lg text-slate-400">
          {unit}
        </span>
      </div>
    </div>
  );
};

export default SensorCard;