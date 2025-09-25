interface BadgeProps {
  label: string;
  type?: "flash" | "nouveau" | "populaire";
}

export function Badge({ label, type = "flash" }: BadgeProps) {
  const styles: Record<string, string> = {
    flash: "bg-red-100 text-red-700",
    nouveau: "bg-green-100 text-green-700",
    populaire: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-lg font-medium ${styles[type]}`}>
      {label}
    </span>
  );
}
