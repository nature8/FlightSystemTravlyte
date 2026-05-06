function StatusCard({ title, value, color }) {
  return (
    <div
      className="card border-0 shadow-lg h-100"
      style={{
        borderRadius: "16px",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="card-body p-4">
        <div
          className={`bg-${color} mb-3`}
          style={{
            width: "44px",
            height: "6px",
            borderRadius: "999px",
          }}
        ></div>

        <p className="text-muted mb-1">{title}</p>
        <h2 className="fw-bold mb-0">{value}</h2>
      </div>
    </div>
  );
}

export default StatusCard;
