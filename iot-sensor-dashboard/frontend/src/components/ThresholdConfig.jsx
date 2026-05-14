import { useState, useEffect } from "react";

const ThresholdConfig = ({ config, onSave, saving }) => {
  const [form, setForm] = useState({
    maxTemperature: 35,
    minTemperature: 10,
    maxHumidity: 80,
    minHumidity: 20
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (config) {
      setForm({
        maxTemperature: config.maxTemperature,
        minTemperature: config.minTemperature,
        maxHumidity: config.maxHumidity,
        minHumidity: config.minHumidity
      });
    }
  }, [config]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.minTemperature >= form.maxTemperature) {
      setError("Minimum temperature must be lower than maximum.");
      return;
    }

    if (form.minHumidity >= form.maxHumidity) {
      setError("Minimum humidity must be lower than maximum.");
      return;
    }

    setError("");
    onSave(form);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-xl font-semibold">
        Alert Threshold Configuration
      </h3>

      {error && (
        <div className="mt-4 rounded-xl bg-red-900/50 p-3 text-red-200">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-5 grid grid-cols-2 gap-4"
      >
        <input
          type="number"
          name="maxTemperature"
          value={form.maxTemperature}
          onChange={handleChange}
          className="rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none"
        />

        <input
          type="number"
          name="minTemperature"
          value={form.minTemperature}
          onChange={handleChange}
          className="rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none"
        />

        <input
          type="number"
          name="maxHumidity"
          value={form.maxHumidity}
          onChange={handleChange}
          className="rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none"
        />

        <input
          type="number"
          name="minHumidity"
          value={form.minHumidity}
          onChange={handleChange}
          className="rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none"
        />

        <button
          type="submit"
          disabled={saving}
          className="col-span-2 rounded-xl bg-blue-600 p-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Thresholds"}
        </button>
      </form>
    </div>
  );
};

export default ThresholdConfig;