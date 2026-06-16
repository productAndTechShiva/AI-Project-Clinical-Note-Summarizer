interface SummaryCardProps {
  title: string;
  content: string;
}

function SummaryCard({
  title,
  content,
}: SummaryCardProps) {
  return (
    <div className="summary-card">
      <h3>{title}</h3>

      <p
        style={{
          whiteSpace: "pre-line",
        }}
      >
        {content || "No information available"}
      </p>
    </div>
  );
}

export default SummaryCard;