import { prisma } from "@/lib/prisma/prisma"
import { updateDevisStatus } from "@/actions/devisAdmin"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Europe/Paris",
})

export default async function DevisAdminTable() {

  const devis = await prisma.devis.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b p-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Demandes de devis
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Demande</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {devis.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {item.firstname} {item.lastname}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  <div>{item.email}</div>
                  <div>{item.phone}</div>
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {item.category?.name ?? "Non précisé"}
                </td>

                <td className="max-w-xs px-4 py-3 text-gray-700">
                  {item.description}
                </td>

                <td className="px-4 py-3">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {item.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-600">
                    {dateFormatter.format(item.createdAt)}
                </td>

                <td className="px-4 py-3">
                  <form action={updateDevisStatus} className="flex gap-2">
                    <input type="hidden" name="devisId" value={item.id} />

                    <select
                      name="status"
                      defaultValue={item.status}
                      className="rounded-md border border-gray-300 px-2 py-1 text-sm"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONTACTING">Contacting</option>
                      <option value="DONE">Done</option>
                    </select>

                    <button
                      type="submit"
                      className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Modifier
                    </button>
                  </form>
                </td>
              </tr>
            ))}

            {devis.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  Aucune demande de devis pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}