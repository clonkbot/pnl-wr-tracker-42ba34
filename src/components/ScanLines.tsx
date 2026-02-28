export function ScanLines() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 255, 136, 0.1) 2px,
          rgba(0, 255, 136, 0.1) 4px
        )`
      }}
    />
  );
}
