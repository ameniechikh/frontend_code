import React from "react";

export const Table = ({ children }: { children: React.ReactNode }) => (
  <table className="w-full border-collapse border border-gray-300">{children}</table>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-100">{children}</thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

export const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="border-b border-gray-300">{children}</tr>
);

export const TableHead = ({ children }: { children: React.ReactNode }) => (
  <th className="p-2 text-left font-semibold">{children}</th>
);

export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="p-2">{children}</td>
);
