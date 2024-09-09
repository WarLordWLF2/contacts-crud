import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // ShadCN Button

export default function Modal({ isOpen, onClose, children }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          {/* <DialogTitle className="text-gray-800">Modal</DialogTitle> */}
          <DialogDescription className="text-gray-600">
            {children}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          {/* <Button variant="primary" className="mt-4 bg-red-500" onClick={onClose}>
            Confirm Update
          </Button>
          <Button variant="secondary" className="mt-4" onClick={onClose}>
            Close
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
