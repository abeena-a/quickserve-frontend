export default function StatusBadge({ status }) {
  const normalized = (status || "").toLowerCase();

  let classes = "";
  switch (normalized) {
    case "waiting for acknowledge":
      classes = "bg-yellow-100 text-yellow-700";
      break;
    case "processing":
      classes = "bg-blue-100 text-blue-700";
      break;
    case "completed":
      classes = "bg-green-100 text-green-700";
      break;
    case "closed":
      classes = "bg-gray-200 text-gray-700";
      break;
    case "rejected":
    case "rejected by vendor":
      classes = "bg-red-100 text-red-700";
      break;
    default:
      classes = "bg-gray-100 text-gray-700";
  }

  return (
    <span className={`px-2 py-1 rounded ${classes}`}>
      {status}
    </span>
  );
}
