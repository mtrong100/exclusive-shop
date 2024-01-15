import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

export function UserDetailModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Eye size={22} className="cursor-pointer hover:text-primary" />
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Crowbar</DialogTitle>
        </DialogHeader>
        <main>
          <div className="mx-auto flex justify-center">
            <img
              src="https://source.unsplash.com/random"
              alt="user-avatar"
              className="w-[100px] h-[100px] object-cover rounded-full"
            />
          </div>

          <ul className="grid grid-cols-1 gap-2 items-center mt-5">
            <div className="py-2 px-4 rounded-md bg-slate-100 text-sm border">
              crowbar873@gmail
            </div>
            <div className="py-2 px-4 rounded-md bg-slate-100 text-sm border">
              73/B Lebanon
            </div>
            <div className="py-2 px-4 rounded-md bg-slate-100 text-sm border">
              08273512
            </div>
          </ul>
        </main>
      </DialogContent>
    </Dialog>
  );
}
