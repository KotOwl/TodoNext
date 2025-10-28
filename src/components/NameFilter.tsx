import { Input } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NameFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("title") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm.trim()) {
        params.set("title", searchTerm);
      } else {
        params.delete("title");
      }
      router.replace(`/events?${params.toString()}`, { scroll: false });
    }, 500);
    return () => clearTimeout(timer);
  }, [router, searchTerm, searchParams]);

  return (
    <div className="flex justify-center">
      <Input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md border-purple-300 text-purple-600 focus:border-purple-500 focus:ring-purple-200"
        variant="bordered"
        color="secondary"
      />
    </div>
  );
}
