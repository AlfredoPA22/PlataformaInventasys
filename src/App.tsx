import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

function App() {
  const isBlocked = useSelector(
    (state: RootState) => state.blockUISlice.isBlocked
  );

  return (
    <>
      <Dialog open={isBlocked}>
        <DialogContent className="bg-white text-center py-10">
          <p className="text-sm font-medium mb-4">
            Estamos guardando tus datos...
          </p>
          <span className="animate-spin inline-block w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full" />
        </DialogContent>
      </Dialog>
      <Toaster richColors />
      <AppRoutes />
    </>
  );
}

export default App;
