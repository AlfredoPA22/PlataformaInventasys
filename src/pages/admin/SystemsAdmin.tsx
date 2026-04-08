import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RECONCILE_STOCK } from "@/graphql/mutations/Stock";
import { AUDIT_STOCK } from "@/graphql/queries/Stock";
import { setIsBlocked } from "@/redux/slices/blockUISlice";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface StockDiscrepancy {
  productId: string;
  code: string;
  name: string;
  stock_type: string;
  companyId: string;
  companyName: string;
  stockActual: number;
  stockCorrecto: number;
  statusActual: string;
  statusCorrecto: string;
  diff: number;
}

interface StockAuditResult {
  totalProducts: number;
  ok: number;
  errors: number;
  discrepancies: StockDiscrepancy[];
}

interface StockChange {
  productId: string;
  name: string;
  companyId: string;
  companyName: string;
  stock_type: string;
  stockBefore: number;
  stockAfter: number;
  statusBefore: string;
  statusAfter: string;
}

interface StockReconcileResult {
  totalProducts: number;
  updated: number;
  unchanged: number;
  errors: number;
  changes: StockChange[];
}

const SYSTEMS = [
  {
    id: "MYMANAG",
    name: "MyManag",
    description: "Sistema de gestión de inventario y ventas",
    color: "blue",
    icon: "📦",
  },
  {
    id: "RESERVAYA",
    name: "ReservaYa",
    description: "Sistema de reservas y citas",
    color: "purple",
    icon: "📅",
  },
];

const SystemsAdmin = () => {
  const dispatch = useDispatch();

  // Audit
  const [auditStock, { loading: auditing, data: auditData }] =
    useLazyQuery<{ auditStock: StockAuditResult }>(AUDIT_STOCK, {
      fetchPolicy: "network-only",
    });

  // Reconcile
  const [reconcileStock, { loading: reconciling, data: reconcileData }] =
    useMutation<{ reconcileStock: StockReconcileResult }>(RECONCILE_STOCK);

  const [confirmReconcile, setConfirmReconcile] = useState(false);

  const auditResult = auditData?.auditStock ?? null;
  const reconcileResult = reconcileData?.reconcileStock ?? null;

  const handleAudit = async () => {
    try {
      dispatch(setIsBlocked(true));
      await auditStock();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(msg);
    } finally {
      dispatch(setIsBlocked(false));
    }
  };

  const handleReconcile = async () => {
    setConfirmReconcile(false);
    try {
      dispatch(setIsBlocked(true));
      await reconcileStock();
      toast.success("Reconciliación completada");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(msg);
    } finally {
      dispatch(setIsBlocked(false));
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-5 px-4 space-y-6">
      {/* Systems cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SYSTEMS.map((sys) => (
          <Card key={sys.id} className="shadow-sm border-0">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{sys.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{sys.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{sys.description}</p>
                  <Badge
                    className={`mt-2 text-xs ${
                      sys.color === "blue"
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : "bg-purple-100 text-purple-700 border-purple-200"
                    } hover:bg-opacity-100`}
                  >
                    {sys.id}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MyManag stock tools */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
            📦 MyManag — Herramienta de stock
          </CardTitle>
          <p className="text-sm text-gray-500">
            Verifica y corrige la coherencia del stock de productos contra las fuentes de verdad
            (inventario individual y seriales).
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={handleAudit}
              disabled={auditing || reconciling}
              className="gap-2"
            >
              {auditing ? (
                <>
                  <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  Auditando...
                </>
              ) : (
                "🔍 Auditar stock (solo lectura)"
              )}
            </Button>
            <Button
              variant="default"
              onClick={() => setConfirmReconcile(true)}
              disabled={auditing || reconciling}
              className="gap-2 bg-amber-600 hover:bg-amber-700"
            >
              {reconciling ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Reconciliando...
                </>
              ) : (
                "🔧 Reconciliar stock (aplica cambios)"
              )}
            </Button>
          </div>

          {/* Audit result */}
          {auditResult && (
            <div className="space-y-3">
              {/* Summary row */}
              <div className="flex flex-wrap gap-3">
                <div className="rounded-lg bg-gray-50 border px-4 py-3 text-center min-w-[100px]">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
                  <p className="text-xl font-bold text-gray-800">{auditResult.totalProducts}</p>
                </div>
                <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-center min-w-[100px]">
                  <p className="text-xs text-green-600 uppercase tracking-wide">Correctos</p>
                  <p className="text-xl font-bold text-green-700">{auditResult.ok}</p>
                </div>
                <div className={`rounded-lg border px-4 py-3 text-center min-w-[100px] ${
                  auditResult.discrepancies.length > 0
                    ? "bg-red-50 border-red-200"
                    : "bg-gray-50"
                }`}>
                  <p className="text-xs text-red-500 uppercase tracking-wide">Descompaginados</p>
                  <p className={`text-xl font-bold ${auditResult.discrepancies.length > 0 ? "text-red-600" : "text-gray-800"}`}>
                    {auditResult.discrepancies.length}
                  </p>
                </div>
                {auditResult.errors > 0 && (
                  <div className="rounded-lg bg-orange-50 border border-orange-200 px-4 py-3 text-center min-w-[100px]">
                    <p className="text-xs text-orange-500 uppercase tracking-wide">Errores</p>
                    <p className="text-xl font-bold text-orange-600">{auditResult.errors}</p>
                  </div>
                )}
              </div>

              {auditResult.discrepancies.length === 0 ? (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-700 text-sm font-medium">
                  ✅ Todo el stock está correcto. No hay descompaginaciones.
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Productos con descompaginación:
                  </p>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-xs">Empresa</TableHead>
                          <TableHead className="text-xs">Código</TableHead>
                          <TableHead className="text-xs">Producto</TableHead>
                          <TableHead className="text-xs">Tipo</TableHead>
                          <TableHead className="text-xs text-right">Stock actual</TableHead>
                          <TableHead className="text-xs text-right">Stock correcto</TableHead>
                          <TableHead className="text-xs text-right">Diferencia</TableHead>
                          <TableHead className="text-xs">Estado actual</TableHead>
                          <TableHead className="text-xs">Estado correcto</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {auditResult.discrepancies.map((d) => {
                          const diffPositive = d.diff > 0;
                          return (
                            <TableRow key={d.productId}>
                              <TableCell className="text-xs text-gray-500">{d.companyName}</TableCell>
                              <TableCell className="text-xs font-mono">{d.code}</TableCell>
                              <TableCell className="text-xs font-medium">{d.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs capitalize">
                                  {d.stock_type}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs text-right">{d.stockActual}</TableCell>
                              <TableCell className="text-xs text-right font-medium">{d.stockCorrecto}</TableCell>
                              <TableCell className="text-xs text-right">
                                <span className={diffPositive ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                  {diffPositive ? `+${d.diff}` : d.diff}
                                </span>
                              </TableCell>
                              <TableCell className="text-xs">
                                <Badge
                                  variant="outline"
                                  className={d.statusActual === "Disponible" ? "text-green-700" : "text-gray-500"}
                                >
                                  {d.statusActual}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs">
                                {d.statusActual !== d.statusCorrecto ? (
                                  <Badge
                                    className={d.statusCorrecto === "Disponible"
                                      ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-100"
                                      : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-100"
                                    }
                                  >
                                    {d.statusCorrecto}
                                  </Badge>
                                ) : (
                                  <span className="text-gray-400">—</span>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  <p className="text-xs text-gray-500">
                    Usa el botón "Reconciliar stock" para corregir automáticamente estas diferencias.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Reconcile result */}
          {reconcileResult && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">
                <div className="rounded-lg bg-gray-50 border px-4 py-3 text-center min-w-[100px]">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
                  <p className="text-xl font-bold text-gray-800">{reconcileResult.totalProducts}</p>
                </div>
                <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-center min-w-[100px]">
                  <p className="text-xs text-blue-600 uppercase tracking-wide">Actualizados</p>
                  <p className="text-xl font-bold text-blue-700">{reconcileResult.updated}</p>
                </div>
                <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-center min-w-[100px]">
                  <p className="text-xs text-green-600 uppercase tracking-wide">Sin cambios</p>
                  <p className="text-xl font-bold text-green-700">{reconcileResult.unchanged}</p>
                </div>
                {reconcileResult.errors > 0 && (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-center min-w-[100px]">
                    <p className="text-xs text-red-500 uppercase tracking-wide">Errores</p>
                    <p className="text-xl font-bold text-red-600">{reconcileResult.errors}</p>
                  </div>
                )}
              </div>

              {reconcileResult.updated === 0 ? (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-700 text-sm font-medium">
                  ✅ No hubo nada que corregir. Todo el stock ya estaba correcto.
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Productos corregidos ({reconcileResult.updated}):
                  </p>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-xs">Empresa</TableHead>
                          <TableHead className="text-xs">Producto</TableHead>
                          <TableHead className="text-xs">Tipo</TableHead>
                          <TableHead className="text-xs text-right">Stock antes</TableHead>
                          <TableHead className="text-xs text-right">Stock después</TableHead>
                          <TableHead className="text-xs">Estado antes</TableHead>
                          <TableHead className="text-xs">Estado después</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reconcileResult.changes.map((ch) => {
                          const diff = ch.stockAfter - ch.stockBefore;
                          return (
                            <TableRow key={ch.productId}>
                              <TableCell className="text-xs text-gray-500">{ch.companyName}</TableCell>
                              <TableCell className="text-xs font-medium">{ch.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs capitalize">
                                  {ch.stock_type}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs text-right text-gray-500">{ch.stockBefore}</TableCell>
                              <TableCell className="text-xs text-right font-semibold">
                                {ch.stockAfter}{" "}
                                <span className={diff >= 0 ? "text-green-600 text-xs" : "text-red-600 text-xs"}>
                                  ({diff >= 0 ? "+" : ""}{diff})
                                </span>
                              </TableCell>
                              <TableCell className="text-xs text-gray-400">{ch.statusBefore}</TableCell>
                              <TableCell className="text-xs">
                                {ch.statusBefore !== ch.statusAfter ? (
                                  <Badge
                                    className={ch.statusAfter === "Disponible"
                                      ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-100"
                                      : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-100"
                                    }
                                  >
                                    {ch.statusAfter}
                                  </Badge>
                                ) : (
                                  <span className="text-gray-400 text-xs">{ch.statusAfter}</span>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirm reconcile dialog */}
      <Dialog open={confirmReconcile} onOpenChange={setConfirmReconcile}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Reconciliar stock</DialogTitle>
            <DialogDescription>
              Esta acción recalcula y corrige el campo <strong>stock</strong> y <strong>status</strong> de
              todos los productos en todas las empresas, usando las fuentes de verdad (inventario y seriales).
              <br /><br />
              Los cambios son irreversibles. ¿Deseas continuar?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setConfirmReconcile(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-amber-600 hover:bg-amber-700"
              onClick={handleReconcile}
            >
              Sí, reconciliar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SystemsAdmin;
