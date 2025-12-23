export default function Sigil() {
  return (
    <div className="sigil">
      <svg
        width="200"
        height="200"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* vertical axis */}
        <line
          x1="150"
          y1="30"
          x2="150"
          y2="270"
          stroke="#ffffff"
          strokeWidth={5}
          className="sigil-axis"
        />

        {/* boundary circle */}
        <circle
          cx="150"
          cy="150"
          r="120"
          fill="none"
          stroke="#ffffff"
          strokeWidth={5}
          className="sigil-circle"
        />

        {/* left diagonal (extended) */}
        <line
          x1="150"
          y1="30"
          x2="0"
          y2="180"
          stroke="#ffffff"
          strokeWidth={5}
          className="sigil-diag-left"
        />

        {/* right diagonal (extended) */}
        <line
          x1="150"
          y1="270"
          x2="300"
          y2="120"
          stroke="#ffffff"
          strokeWidth={5}
          className="sigil-diag-right"
        />
      </svg>
    </div>
  );
}
