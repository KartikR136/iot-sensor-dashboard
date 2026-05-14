const AlertBanner = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-red-700 bg-red-950 p-5">
      <h3 className="text-lg font-semibold text-red-200">
        Active Alerts
      </h3>

      <div className="mt-3 space-y-2">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="rounded-lg bg-red-900/50 p-3 text-red-100"
          >
            {alert.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertBanner;