import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TUser } from "@/types/main-types";
import { Eye } from "lucide-react";

export function UserDetailModal({ data }: { data: TUser }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Eye size={22} className="cursor-pointer hover:text-primary" />
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">{data?.name}</DialogTitle>
        </DialogHeader>
        <main>
          <div className="mx-auto flex justify-center">
            <img
              src={data?.avatar}
              alt={data?.name}
              className="w-[100px] h-[100px] object-cover rounded-full"
            />
          </div>

          <ul className="grid grid-cols-1 gap-2 items-center mt-5">
            <div className="py-2 px-4 rounded-md bg-slate-100 text-sm border">
              {data?.email}
            </div>
            <div className="py-2 px-4 rounded-md bg-slate-100 text-sm border">
              {data?.address || "Not update yet"}
            </div>
            <div className="py-2 px-4 rounded-md bg-slate-100 text-sm border">
              {data?.phone || "Not update yet"}
            </div>
          </ul>
        </main>
      </DialogContent>
    </Dialog>
  );
}
