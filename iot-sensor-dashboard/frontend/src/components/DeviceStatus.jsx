const DeviceStatus = ({ online, lastSeen }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-slate-400">
            Device Status
          </p>

          <p className="mt-3 text-xl font-semibold">
            {online ? "Online" : "Offline"}
          </p>
        </div>

        <div
          className={`h-4 w-4 rounded-full ${
            online ? "bg-green-500" : "bg-red-500"
          }`}
        />
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Last seen: {lastSeen || "No data received yet"}
      </p>
    </div>
  );
};

export default DeviceStatus;