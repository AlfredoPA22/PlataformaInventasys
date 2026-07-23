import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LIST_USER_LANDING_ADMIN } from "@/graphql/queries/UserLanding";
import { getDate } from "@/utils/getDate";
import type { IUserLandingWithCompanies } from "@/utils/interfaces/User";
import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";

const PLAN_LABELS: Record<string, string> = {
  prueba: "Prueba",
  basico: "Básico",
  profesional: "Profesional",
};

const STATUS_LABELS: Record<string, string> = {
  activo: "Activo",
  pendiente: "Pendiente",
  expirado: "Expirado",
  suspendido: "Suspendido",
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "activo":
      return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">Activo</Badge>;
    case "pendiente":
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">Pendiente</Badge>;
    case "expirado":
      return <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">Expirado</Badge>;
    case "suspendido":
      return <Badge className="bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100">Suspendido</Badge>;
    default:
      return <Badge variant="outline" className="capitalize">{STATUS_LABELS[status] ?? status}</Badge>;
  }
};

const UserListAdmin = () => {
  const { data, loading, error } = useQuery<{ listUserLandingAdmin: IUserLandingWithCompanies[] }>(
    LIST_USER_LANDING_ADMIN,
    { fetchPolicy: "network-only" }
  );

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"todos" | "administrador" | "usuario">("todos");

  const users = useMemo(() => data?.listUserLandingAdmin ?? [], [data]);

  const stats = useMemo(() => {
    const admins = users.filter((u) => u.user_type === "administrador").length;
    const withoutCompanies = users.filter((u) => (u.companies?.length ?? 0) === 0).length;
    return { total: users.length, admins, withoutCompanies };
  }, [users]);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        !search ||
        u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "todos" || u.user_type === typeFilter;
      return matchSearch && matchType;
    });
  }, [users, search, typeFilter]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 flex items-center gap-3 text-gray-500">
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        Cargando usuarios...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-4">
          No se pudieron cargar los usuarios: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-5 px-4 space-y-4">
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total usuarios</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <p className="text-xs text-blue-600 uppercase tracking-wide">Administradores</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">{stats.admins}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Sin empresas registradas</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stats.withoutCompanies}</p>
          </CardContent>
        </Card>
      </div>

      {/* Table card */}
      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-800">Usuarios registrados</h2>
            <span className="text-sm text-gray-500">{filtered.length} de {users.length} usuarios</span>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Buscar por nombre o correo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:max-w-xs"
            />
            <div className="flex gap-1">
              {(["todos", "administrador", "usuario"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                    typeFilter === t
                      ? "bg-[#0F3853] text-white border-[#0F3853]"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {t === "todos" ? "Todos" : t === "administrador" ? "Administradores" : "Usuarios"}
                </button>
              ))}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Registrado</TableHead>
                <TableHead>Empresas relacionadas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length > 0 ? (
                filtered.map((u) => (
                  <TableRow key={u._id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        {u.picture ? (
                          <img
                            src={u.picture}
                            alt={u.fullName}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#0F3853] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {u.fullName?.charAt(0) ?? "U"}
                          </div>
                        )}
                        <span className="font-medium text-gray-900">{u.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{u.email}</TableCell>
                    <TableCell>
                      {u.user_type === "administrador" ? (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100">Administrador</Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-600">Usuario</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                      {u.createdAt ? getDate(u.createdAt as unknown as Date) : "—"}
                    </TableCell>
                    <TableCell>
                      {u.companies && u.companies.length > 0 ? (
                        <div className="flex flex-col gap-1.5">
                          {u.companies.map((c) => (
                            <div key={c._id} className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium text-gray-800">{c.name}</span>
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                {PLAN_LABELS[c.plan] ?? c.plan}
                              </Badge>
                              {getStatusBadge(c.status)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">Sin empresas</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                    {users.length === 0
                      ? "No hay usuarios registrados."
                      : "Sin resultados para los filtros aplicados."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserListAdmin;
