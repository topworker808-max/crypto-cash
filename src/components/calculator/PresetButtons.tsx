import { Button } from "@/components/ui/button";
import { PRESET_AMOUNTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PresetButtonsProps {
    onSelect: (amount: number) => void;
    currentAmount: number;
}

export function PresetButtons({ onSelect, currentAmount }: PresetButtonsProps) {
    return (
        <div className="grid grid-cols-4 gap-2 mb-4">
            {PRESET_AMOUNTS.map((amount) => (
                <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => onSelect(amount)}
                    className={cn(
                        "text-xs sm:text-sm font-medium transition-all duration-200",
                        currentAmount === amount
                            ? "bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                            : "hover:border-primary/50 hover:text-primary"
                    )}
                >
                    {amount}
                </Button>
            ))}
        </div>
    );
}
