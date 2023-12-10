import { Button } from "@/components/ui/button";

interface ActionTableProps {
  name: string
  onClick: () => void
  variant: "default" | "link" | "ghost" | "destructive" | "outline" | "secondary"
}

const ActionTable = ({ name, variant, onClick }: ActionTableProps) => {
  return (
    <div>
    <Button variant={variant} onClick={onClick}>
      {name}
    </Button>
    </div>

  );
};

export default ActionTable;
