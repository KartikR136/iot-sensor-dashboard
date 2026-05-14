const Navbar = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-950 px-8 py-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            IoT Sensor Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time environmental monitoring
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Device
          </p>
          <p className="font-medium text-slate-200">
            ESP32 Room Sensor
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;