"use client";

import { Upload, FolderOpen, FileText, Image, FileSpreadsheet, File, Search, Grid3x3, List, MoreHorizontal, Download } from "lucide-react";

const folders = [
  { name: "Company Policies", files: 12, icon: "folder", updated: "Feb 25" },
  { name: "Templates", files: 8, icon: "folder", updated: "Feb 20" },
  { name: "Contracts", files: 24, icon: "folder", updated: "Feb 27" },
  { name: "HR Documents", files: 45, icon: "folder", updated: "Feb 26" },
];

const recentFiles = [
  { id: "1", name: "Employee Handbook v3.2.pdf", type: "pdf", size: "2.4 MB", uploadedBy: "Priya Patel", date: "Feb 27, 2026", department: "HR" },
  { id: "2", name: "NDA Template.docx", type: "doc", size: "145 KB", uploadedBy: "Maria Santos", date: "Feb 25, 2026", department: "Legal" },
  { id: "3", name: "Q1 Budget Report.xlsx", type: "spreadsheet", size: "890 KB", uploadedBy: "Maria Santos", date: "Feb 24, 2026", department: "Finance" },
  { id: "4", name: "Brand Guidelines.pdf", type: "pdf", size: "8.2 MB", uploadedBy: "David Kim", date: "Feb 22, 2026", department: "Design" },
  { id: "5", name: "SOW - Acme Corp Portal.docx", type: "doc", size: "320 KB", uploadedBy: "Ahmed Khan", date: "Feb 20, 2026", department: "Product" },
  { id: "6", name: "Onboarding Checklist.pdf", type: "pdf", size: "180 KB", uploadedBy: "Priya Patel", date: "Feb 18, 2026", department: "HR" },
];

const typeIcon: Record<string, React.ReactNode> = {
  pdf: <FileText className="h-5 w-5 text-red-500" />,
  doc: <FileText className="h-5 w-5 text-blue-500" />,
  spreadsheet: <FileSpreadsheet className="h-5 w-5 text-green-500" />,
  image: <Image className="h-5 w-5 text-purple-500" />,
};

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-[var(--muted-foreground)]">
            Company files, templates, and policies.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
          <Upload className="h-4 w-4" />
          Upload File
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <input
          type="search"
          placeholder="Search documents..."
          className="h-9 w-full rounded-lg border bg-[var(--background)] pl-9 pr-4 text-sm outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
        />
      </div>

      {/* Folders */}
      <div>
        <h2 className="text-lg font-semibold">Folders</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {folders.map((folder) => (
            <button
              key={folder.name}
              className="flex items-center gap-3 rounded-xl border bg-[var(--card)] p-4 text-left transition-colors hover:bg-[var(--muted)]"
            >
              <FolderOpen className="h-10 w-10 text-amber-500" />
              <div>
                <p className="font-medium">{folder.name}</p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {folder.files} files &bull; Updated {folder.updated}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Files */}
      <div>
        <h2 className="text-lg font-semibold">Recent Files</h2>
        <div className="mt-3 rounded-xl border bg-[var(--card)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-[var(--muted-foreground)]">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Size</th>
                  <th className="px-4 py-3 font-medium">Uploaded By</th>
                  <th className="px-4 py-3 font-medium">Department</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentFiles.map((file) => (
                  <tr key={file.id} className="border-b last:border-0 hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {typeIcon[file.type] || <File className="h-5 w-5 text-gray-500" />}
                        <span className="font-medium">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{file.size}</td>
                    <td className="px-4 py-3">{file.uploadedBy}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{file.department}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{file.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="rounded p-1 hover:bg-[var(--muted)]" title="Download">
                          <Download className="h-4 w-4 text-[var(--muted-foreground)]" />
                        </button>
                        <button className="rounded p-1 hover:bg-[var(--muted)]">
                          <MoreHorizontal className="h-4 w-4 text-[var(--muted-foreground)]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
