import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import redConsole from "../../assets/images/red-console.png";
import { Separator } from "@/components/ui/separator";

export function OrderDetailModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Eye size={22} className="cursor-pointer hover:text-primary" />
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Order: 87384721</DialogTitle>
        </DialogHeader>
        <main>
          <div className="text-lg">
            From: <span className="font-semibold text-primary">Crowbar</span>
          </div>

          <div className="mt-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Product</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array(2)
                  .fill(0)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium capitalize">
                        <div className="flex items-center gap-4">
                          <img
                            src={redConsole}
                            alt="redConsole"
                            className="w-[50px] h-[50px] object-contain"
                          />
                          <p className="text-sm">Havic HV G-92 Gamepad</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">2</TableCell>
                      <TableCell className="text-center">89.99$</TableCell>
                      <TableCell className="text-right">12/3/2023</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-end text-lg font-medium">
            Total: $90.99
          </div>
        </main>
      </DialogContent>
    </Dialog>
  );
}
