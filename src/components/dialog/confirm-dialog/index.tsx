import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Button } from "../../ui/button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
  isPending: boolean;
  title: string;
  description: string;
  actionButtonText: string;
}

export function ConfirmDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  isPending,
  title,
  description,
  actionButtonText,
}: ConfirmDialogProps) {
  const t = useTranslations();
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onConfirm} isLoading={isPending} type="button">
            {actionButtonText}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              {t("common.cancel")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
